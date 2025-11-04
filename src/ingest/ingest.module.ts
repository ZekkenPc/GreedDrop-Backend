import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { Device, DeviceSchema } from '../device/device.schema';
import { Reading, ReadingSchema } from '../readings/schemas/reading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: Reading.name, schema: ReadingSchema },
    ]),
  ],
  controllers: [IngestController],
  providers: [IngestService],
})
export class IngestModule {}
