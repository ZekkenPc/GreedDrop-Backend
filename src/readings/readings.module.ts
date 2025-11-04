import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';
import { Reading, ReadingSchema } from './schemas/reading.schema';
import { Device, DeviceSchema } from '../device/device.schema'; // <- AGREGADO



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema },
      { name: Device.name,  schema: DeviceSchema },
    ]),
  ],
  controllers: [ReadingsController],
  providers: [ReadingsService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
