// device.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

type CreateDeviceDto = { deviceId: string; name?: string; rssi?: number };

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private model: Model<DeviceDocument>) {}

  async upsert(dto: CreateDeviceDto) {
    return this.model
      .findOneAndUpdate(
        { deviceId: dto.deviceId },
        { $set: { name: dto.name, rssi: dto.rssi, lastSeen: new Date() } },
        { upsert: true, new: true }
      )
      .exec();
  }

  findAll() {
    return this.model.find().sort({ updatedAt: -1 }).exec();
  }

  findOne(deviceId: string) {
    return this.model.findOne({ deviceId }).exec();
  }

  remove(deviceId: string) {
    return this.model.deleteOne({ deviceId }).exec();
  }
}
