import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly svc: ReadingsService) {}

  @Post()
  create(@Body() dto: CreateReadingDto) {
    return this.svc.create(dto);
  }

  @Get('latest')
  latest(@Query('deviceId') deviceId: string) {
    return this.svc.findLatestByDevice(deviceId);
  }
}
