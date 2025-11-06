import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TelemetryDocument = Telemetry & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'telemetry',
  versionKey: false,
})
export class Telemetry extends Document {
  @Prop({ type: String, required: true, index: true })
  deviceId: string;

  @Prop({ type: String, default: 'ESP32-Riego' })
  name: string;

  @Prop({ type: Number, min: 0, max: 100, default: null })
  humedad: number | null;

  @Prop({ type: Number, min: 0, max: 100, default: null })
  pureza: number | null;

  @Prop({ type: String, default: 'OK' })
  estado: string;
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);

// Índices útiles
TelemetrySchema.index({ deviceId: 1, createdAt: -1 });
