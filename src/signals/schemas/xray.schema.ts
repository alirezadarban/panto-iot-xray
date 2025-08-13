import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type XrayDocument = Xray & Document;

@Schema({ timestamps: true })
export class Xray {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: Date; // timestamp اصلی

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ type: Object })
  rawData?: Record<string, any>;
}

export const XraySchema = SchemaFactory.createForClass(Xray);
