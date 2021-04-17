import { KafkaClient } from 'kafka-node';
import { Producer, ProduceRequest } from 'kafka-node';
import { Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

export class Kafka {
  constructor(kafkaHost) {
    this.kafkaHost = kafkaHost;
  }

  publish(topic: string, message: string): void {
    const client = new KafkaClient({ kafkaHost: kafkaHost });
    const producer = new Producer(client);

    producer.on(
      'ready',
      (): void => {
        client.refreshMetadata(
          [topic],
          (err: Error): void => {
            if (err) {
              throw err;
            }

            console.log(`Sending message to ${topic}: ${message}`);
            producer.send(
              [{ topic, messages: [message] }],
              (err: Error, result: ProduceRequest): void => {
                console.log(err || result);
                process.exit();
              }
            );
          }
        );
      }
    );

    producer.on(
      'error',
      (err: Error): void => {
        console.log('error', err);
      }
    );
  }

  subscribe(topic: string, onMessage: (message) => void): void {
    const client = new KafkaClient({ kafkaHost: kafkaHost });
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
    const options: ConsumerOptions = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

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

        consumer.on('message', onMessage);function(message: Message): void {
          onMessage
          // do something useful with message
        });

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
