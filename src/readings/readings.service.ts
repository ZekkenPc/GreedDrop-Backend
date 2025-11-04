import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './schemas/reading.schema';
import { CreateReadingDto } from './dto/create-reading.dto';

import { Device } from '../device/device.schema'; 

@Injectable()
export class ReadingsService {
  constructor(
    @InjectModel(Reading.name) private readonly model: Model<Reading>,
    // ⬇️ AGREGADO: inyecta también Device para obtener el nombre
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
  ) {}

  // Crea lectura y la registra en historial
  async create(dto: CreateReadingDto) {
    // 1) Crear la lectura (asegúrate de tener timestamps en el schema de Reading)
    const reading = await this.model.create({
      deviceId: dto.deviceId,
      humedad: dto.humedad ?? null,
      pureza: dto.pureza ?? null,
      estado: dto.estado ?? 'OK',
      // si tu schema usa timestamps, createdAt lo pone Mongo/Nest automáticamente
      // createdAt: new Date(), // solo si NO usas timestamps
    });

    // 2) Buscar nombre del dispositivo (opcional pero recomendado)
    const dev = await this.deviceModel.findOne({ deviceId: reading.deviceId }).lean();
    const deviceName = dev?.name ?? 'ESP32';

    return reading;
  }

  // última lectura por deviceId (ordenando por fecha desc)
  findLatestByDevice(deviceId: string) {
    return this.model.findOne({ deviceId }).sort({ createdAt: -1 }).lean();
  }
}
