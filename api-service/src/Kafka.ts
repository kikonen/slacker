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

  async subscribe(topic: string, groupId: string, autoCommit: boolean, onMessage:  (message: Message) => any) {
    const client = new KafkaClient({ kafkaHost: this.kafkaHost });
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
    const options: ConsumerOptions = {
      groupId,
      autoCommit,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
    };

    const consumer = new Consumer(client, topics, options);

    await this.refreshClient(topic, client);

    const offset = new Offset(client);
    const topicOffset = await this.fetchOffsets(topic, 0, offset);

    console.log("OFFSET", topicOffset);

    consumer.on('error', function(err: Error): void {
      console.log('error', err);
    });

    consumer.on('message', onMessage);

    // If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
    consumer.on(
      'offsetOutOfRange',
      (topic: OffsetFetchRequest): void => {
        offset.fetch([topic], function(err, offsets): void {
          if (err) {
            return console.error(err);
          }
          const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
          consumer.setOffset(topic.topic, topic.partition, min);
        });
      }
    );
  }

  async refreshClient(topic: string, client: KafkaClient) {
    new Promise((resolve, reject) => {
      client.refreshMetadata(
        [topic],
        (error: Error): void => {
          if (error) {
            reject(error);
            return;
          }

          resolve(client);
        });
    });
  }

  async fetchOffsets(topic: string, partition: number, offset: Offset) {
    return new Promise((resolve, reject) => {
      offset.fetchLatestOffsets([topic], function (error, offsets) {
        if (error) {
          reject(error);
          return;
        }

        resolve(offsets[topic][partition]);
      });
    });
  }
}
