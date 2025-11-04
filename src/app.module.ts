import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { ReadingsModule } from './readings/readings.module';
import { IngestModule } from './ingest/ingest.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/greendrop'),
    UserModule,
    DeviceModule,
    ReadingsModule,
    IngestModule,
  ],
})
export class AppModule {}
