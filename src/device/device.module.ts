import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.schema';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Reading, ReadingSchema } from '../readings/schemas/reading.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema },
      { name: Reading.name, schema: ReadingSchema },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
