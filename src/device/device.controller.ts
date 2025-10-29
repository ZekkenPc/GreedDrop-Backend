import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from './device.service';

class CreateDeviceDto {
  deviceId!: string;
  name?: string;
  rssi?: number;
}

@Controller('device')
export class DeviceController {
  constructor(private readonly service: DeviceService) {}

  @Post()
  register(@Body() body: CreateDeviceDto) {
    return this.service.upsert(body);
  }

  @Get()
  list() {
    return this.service.findAll();
  }

  @Get(':deviceId')
  get(@Param('deviceId') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':deviceId')
  delete(@Param('deviceId') id: string) {
    return this.service.remove(id);
  }
}
