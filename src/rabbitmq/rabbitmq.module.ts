import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { SignalsModule } from '../signals/signals.module';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  imports: [SignalsModule],
})
export class RabbitmqModule {}
