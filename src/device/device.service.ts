  // src/device/device.service.ts
  import { Injectable } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Device, DeviceDocument } from './device.schema';

  // AGREGADO:
  import { Reading } from '../readings/schemas/reading.schema';

  type CreateDeviceDto = {
    deviceId: string;
    name?: string;
    rssi?: number;

    // si más adelante también aceptas sensores en este mismo POST:
    humedad?: number;
    pureza?: number;
    estado?: string;
  };

  @Injectable()
  export class DeviceService {
    constructor(
      @InjectModel(Device.name)  private deviceModel: Model<DeviceDocument>,
      @InjectModel(Reading.name) private readingModel: Model<Reading>,
    ) {}

    async upsert(dto: CreateDeviceDto) {
      // 1) Upsert del device
      const device = await this.deviceModel.findOneAndUpdate(
        { deviceId: dto.deviceId },
        {
          $set: {
            ...(dto.name  !== undefined && { name: dto.name }),
            ...(dto.rssi  !== undefined && { rssi: dto.rssi }),
            lastSeen: new Date(),
          },
        },
        { upsert: true, new: true }
      ).exec();

      // 2) Si NO hay readings de este device, crea el placeholder con nulls
      const exists = await this.readingModel.exists({ deviceId: dto.deviceId });
      if (!exists) {
        await this.readingModel.create({
          deviceId: dto.deviceId,
          humedad: null,
          pureza:  null,
          estado:  dto.estado ?? 'SIN_DATOS', // o 'OK'
          // createdAt se pone solo porque tu schema usa timestamps
        });
      }

      // 3) (Opcional) Si en este mismo POST te llegan sensores, crea lectura real:
      const tieneH = typeof dto.humedad === 'number';
      const tieneP = typeof dto.pureza  === 'number';
      if (tieneH || tieneP) {
        await this.readingModel.create({
          deviceId: dto.deviceId,
          humedad: tieneH ? dto.humedad! : null,
          pureza:  tieneP ? dto.pureza!  : null,
          estado:  dto.estado ?? 'OK',
        });
      }

      return { device };
    }

    findAll() {
      return this.deviceModel.find().sort({ updatedAt: -1 }).exec();
    }

    findOne(deviceId: string) {
      return this.deviceModel.findOne({ deviceId }).exec();
    }

    remove(deviceId: string) {
      return this.deviceModel.deleteOne({ deviceId }).exec();
    }
  }
