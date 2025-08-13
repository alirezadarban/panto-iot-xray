import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(private readonly config: ConfigService) {}

  async sendSampleXrayData() {
    const url = this.config.get<string>('rabbitmqUrl') || 'amqp://localhost:5672';
    const queue = this.config.get<string>('xrayQueue') || 'xray.queue';
    const conn = await amqp.connect(url);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });

    const sampleData = {
      "device_001": {
        time: Date.now(),
        data: [
          [0, [51.339764, 12.339223, 1.2]],
          [1000, [51.339770, 12.339210, 1.5]],
          [2000, [51.339780, 12.339200, 2.1]]
        ]
      }
    };

    const buf = Buffer.from(JSON.stringify(sampleData));
    channel.sendToQueue(queue, buf, { persistent: true });
    this.logger.log(`Sent ${buf.length} bytes to queue ${queue}`);

    await channel.close();
    await conn.close();
  }
}
