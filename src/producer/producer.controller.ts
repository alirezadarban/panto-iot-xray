import { Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('send-xray')
  async sendXray() {
    await this.producerService.sendSampleXrayData();
    return { message: 'Sample X-ray data sent' };
  }
}
