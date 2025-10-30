import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './schemas/reading.schema';
import { CreateReadingDto } from './dto/create-reading.dto';

@Injectable()
export class ReadingsService {
  constructor(@InjectModel(Reading.name) private model: Model<Reading>) {}

  create(dto: CreateReadingDto) {
    return this.model.create(dto);
  }

  // última lectura por deviceId (ordenando por fecha desc)
  findLatestByDevice(deviceId: string) {
    return this.model.findOne({ deviceId }).sort({ createdAt: -1 }).lean();
  }
}
