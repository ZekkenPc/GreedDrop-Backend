// src/readings/schemas/reading.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'readings',            // opcional, pero recomendado
  versionKey: false,                 // opcional
})
export class Reading extends Document {
  @Prop({ type: String, required: true, index: true })
  deviceId: string;

  // ✅ NO uses "number | null" en el tipo TS; declara el tipo en @Prop y deja el TS como opcional
  @Prop({ type: Number, required: false, default: null, min: 0, max: 100 })
  humedad?: number;                  // puede quedar null en la base

  @Prop({ type: Number, required: false, default: null, min: 0, max: 100 })
  pureza?: number;                   // puede quedar null en la base

  @Prop({ type: String, default: 'OK' })
  estado: string;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
