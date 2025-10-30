import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Reading extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true, min: 0, max: 100 })
  humedad: number;

  @Prop({ required: true, min: 0, max: 100 })
  pureza: number;

  @Prop({ default: 'OK' })
  estado: string;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
