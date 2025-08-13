import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SignalsModule } from './signals/signals.module';
import { ProducerModule } from './producer/producer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/iot'),
    RabbitmqModule,
    SignalsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProducerModule
  ],
})
export class AppModule {}
