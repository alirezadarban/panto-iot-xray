import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalsService } from './signals.service';
import { Xray, XraySchema } from './schemas/xray.schema';
import { SignalsController } from './signals.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }]),
  ],
  controllers: [SignalsController],
  providers: [SignalsService],
  exports: [SignalsService],
})
export class SignalsModule {}