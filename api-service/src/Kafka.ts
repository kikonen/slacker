import { KafkaClient } from 'kafka-node';
import { Producer, ProduceRequest } from 'kafka-node';
import { Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

import autobind from './autobind'

export class Kafka {
  kafkaHost: string;

  constructor(kafkaHost: string) {
    this.kafkaHost = kafkaHost;

    autobind(this);
  }

  createTopic(topic: string): void {
    console.log(`create: ${topic}`);

    const client = new KafkaClient({ kafkaHost: this.kafkaHost });

    let topicsToCreate = [
      {
        topic: topic,
        partitions: 1,
        replicationFactor: 1,
        configEntries: [
          {
            name: 'cleanup.policy',
            value: 'compact'
          },
          {
            name: 'retention.ms',
            value: '-1'
          },
          {
            name: 'retention.bytes',
            value: '-1'
          },
        ],
      }
    ];

    return client.createTopics(topicsToCreate, (error, result) => {
      console.log(error || result);
    });
  }

  publish(topic: string, key: string, message: any): void {
    const client = new KafkaClient({ kafkaHost: this.kafkaHost });
    const producer = new Producer(client);

    let json = JSON.stringify(message);

    console.log("kafka: " + this.kafkaHost);

    producer.on(
      'ready',
      (): void => {
        client.refreshMetadata(
          [topic],
          (err: Error): void => {
            if (err) {
              throw err;
            }

            console.log(`Sending message to ${topic}: ${json}`);

            producer.send(
              [{ topic, key, messages: [json] }],
              (err: Error, result: ProduceRequest): void => {
                console.log(err || result);
              }
            );
          }
        );
      }
    );

    producer.on(
      'error',
      (err: Error): void => {
        console.log('KAFKA_ERROR', err);
      }
    );
  }

  async subscribe(topic: string, groupId: string, onMessage:  (message: Message) => any) {
    const client = new KafkaClient({ kafkaHost: this.kafkaHost });
    const partition = 0;

    await this.refreshClient(client, topic);

    const query = new Offset(client);
    const lowWaterOffset = await this.fetchLowWaterOffset(query, topic, partition);
    const highWaterOffset = await this.fetchHighWaterOffset(query, topic, partition);

    // TODO KI history fetch support; temporarily just fetch 100 latest
    let offset = highWaterOffset - 100;
    if (offset < lowWaterOffset) {
      offset = lowWaterOffset;
    }

    console.log("OFFSET_RANGE", [lowWaterOffset, highWaterOffset]);
    console.log("OFFSET", offset);

    const topics: OffsetFetchRequest[] = [{
      topic: topic,
      partition: partition,
      offset: offset,
    }];
    const options: ConsumerOptions = {
      groupId,
      autoCommit: false,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      fromOffset: true,
    };
    const consumer = new Consumer(client, topics, options);

    consumer.on('error', function(err: Error): void {
      console.log('error', err);
    });

    consumer.on('message', (msg) => {
      try {
        if (!onMessage(msg)) {
          console.log("CLOSING consumer");
          consumer.close(false, (error) => {
            if (error) console.log("CLOSE FAILED", error);
          });
        }
      } catch (error) {
        console.log("ON_MESSAGE failed", error);
        consumer.close(false, (error) => {
          if (error) console.log("CLOSE FAILED", error);
        });
      }
    });
  }

  async refreshClient(client: KafkaClient, topic: string): Promise<KafkaClient> {
    return new Promise((resolve, reject) => {
      client.refreshMetadata(
        [topic],
        (error: Error): void => {
          if (error) {
            return reject(error);
          }

          resolve(client);
        });
    });
  }

  async fetchHighWaterOffset(query: Offset, topic: string, partition: number): Promise<number> {
    return new Promise((resolve, reject) => {
      query.fetchLatestOffsets([topic], function (error, offsets) {
        if (error) {
          return reject(error);
        }

        resolve(offsets[topic][partition]);
      });
    });
  }

  async fetchLowWaterOffset(query: Offset, topic: string, partition: number): Promise<number> {
    return new Promise((resolve, reject) => {
      query.fetchEarliestOffsets([topic], function (error, offsets) {
        if (error) {
          return reject(error);
        }

        resolve(offsets[topic][partition]);
      });
    });
  }

}
