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
  dataLength: number; // تعداد نقاط داخل data

  @Prop({ required: true })
  dataVolume: number; // حجم داده (بایت)

  @Prop({ type: Object })
  rawData?: Record<string, any>; // ذخیره کامل یا خلاصه داده خام (اختیاری)
}

export const XraySchema = SchemaFactory.createForClass(Xray);
