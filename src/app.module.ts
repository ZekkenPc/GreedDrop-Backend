import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/greendrop'),
    UserModule,
    TelemetryModule,
  ],
})
export class AppModule {}
