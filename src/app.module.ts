import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/greendrop'),
    UserModule,
    DeviceModule,
  ],
})
export class AppModule {}
