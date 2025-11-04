import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from '../device/device.schema';
import { Reading } from '../readings/schemas/reading.schema';


@Injectable()
export class IngestService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Reading.name) private readingModel: Model<Reading>,
  ) {}

  /**
   * Procesa la data que envía el ESP32 vía HTTP POST.
   * Crea/actualiza el device y registra una lectura en readings.
   */
  async processIncoming(data: any) {
    const {
      deviceId,
      name,
      rssi,
      humedad = null,
      pureza = null,
      estado = 'OK',
    } = data;

    if (!deviceId) throw new Error('deviceId es obligatorio');

    // 1️⃣ Upsert del dispositivo
    const device = await this.deviceModel.findOneAndUpdate(
      { deviceId },
      {
        $set: {
          name: name ?? 'ESP32-Riego',
          rssi: rssi ?? -99,
          lastSeen: new Date(),
        },
      },
      { upsert: true, new: true },
    );

    // 2️⃣ Registrar la lectura
    const reading = await this.readingModel.create({
      deviceId,
      humedad,
      pureza,
      estado: estado ?? 'OK',
    });

    return { ok: true, device, reading };
  }
}
