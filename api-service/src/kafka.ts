import { KafkaClient } from 'kafka-node';
import { Producer, ProduceRequest } from 'kafka-node';
import { Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

export class Kafka {
  kafkaHost: string;

  constructor(kafkaHost: string) {
    this.kafkaHost = kafkaHost;

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

  subscribe(topic: string, groupId: string, onMessage:  (message: Message) => any): void {
    const client = new KafkaClient({ kafkaHost: this.kafkaHost });
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
    const options: ConsumerOptions = { groupId: groupId, autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    const consumer = new Consumer(client, topics, options);

    consumer.on('error', function(err: Error): void {
      console.log('error', err);
    });

    client.refreshMetadata(
      [topic],
      (err: Error): void => {
        const offset = new Offset(client);

        if (err) {
          throw err;
        }

        consumer.on('message', onMessage);

        /*
         * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
         */
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
    );
  }
}
