import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import * as amqp from 'amqplib';
import { SignalsService } from '../signals/signals.service';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  private readonly queueName = 'xray.queue';

  constructor(private readonly signalsService: SignalsService) {}

  async onModuleInit() {
    try {
      this.logger.log('Connecting to RabbitMQ...');
      this.connection = await amqp.connect(
        process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
      );
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.queueName, { durable: true });

      this.logger.log(
        `Connected. Waiting for messages in ${this.queueName}...`,
      );
      this.consumeMessages();
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ', error);
      process.exit(1);
    }
  }

  private consumeMessages() {
    this.channel.consume(
      this.queueName,
      async (msg) => {
        if (!msg) return;

        try {
          const content = msg.content.toString();
          const payload = JSON.parse(content);

          // فرض بر این که payload همان ساختار نمونه داده را دارد
          for (const deviceId of Object.keys(payload)) {
            const deviceData = payload[deviceId];
            const time = new Date(deviceData.time);
            const dataLength = deviceData.data.length;
            const dataVolume = Buffer.byteLength(JSON.stringify(deviceData.data));

            await this.signalsService.create({
              deviceId,
              time,
              dataLength,
              dataVolume,
              rawData: payload[deviceId]
            });
          }

          this.channel.ack(msg);
        } catch (err) {
          this.logger.error('Error processing message', err);
          this.channel.nack(msg, false, false);
        }
      },
      { noAck: false },
    );
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
    this.logger.log('RabbitMQ connection closed.');
  }
}
