import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Telemetry, TelemetryDocument } from './telemetry.schema/telemetry.schema';

const activeSessions = new Set<string>();

@Injectable()
export class TelemetryService {
  constructor(
    @InjectModel(Telemetry.name) private readonly model: Model<TelemetryDocument>,
  ) {}

  async save(dto: any) {
    const hum = Number.isFinite(Number(dto?.humedad)) ? Number(dto.humedad) : null;
    const pur = Number.isFinite(Number(dto?.pureza)) ? Number(dto.pureza) : null;
    return this.model.create({
      deviceId: String(dto?.deviceId || ''),
      name: dto?.name ?? 'ESP32-Riego',
      humedad: hum,
      pureza: pur,
      estado: dto?.estado ?? 'OK',
    });
  }

  async latest(deviceId: string) {
    return this.model.findOne({ deviceId }).sort({ createdAt: -1 }).lean().exec();
  }

  openSession(deviceId: string) { activeSessions.add(deviceId); }
  closeSession(deviceId: string) { activeSessions.delete(deviceId); }
  isSessionActive(deviceId: string) { return activeSessions.has(deviceId); }
}
