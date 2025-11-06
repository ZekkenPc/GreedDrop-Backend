import {
  Body, Controller, Get, Param, Post, ForbiddenException,
} from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly svc: TelemetryService) {}

  // SOLO LECTURA (no escribe)
  @Get('latest/:deviceId')
  latest(@Param('deviceId') deviceId: string) {
    return this.svc.latest(deviceId);
  }

  // ESCRITURA PROTEGIDA
  @Post('push')
  async push(@Body() body: any) {
    const deviceId = String(body?.deviceId || '');
    if (!deviceId) {
      throw new ForbiddenException('deviceId requerido');
    }
    if (!this.svc.isSessionActive(deviceId)) {
      throw new ForbiddenException('No hay sesión BLE activa. Conéctate por Bluetooth primero.');
    }
    return this.svc.save(body);
  }

  // SESIÓN BLE (abrir/cerrar)
  @Post('open-session')
  open(@Body('deviceId') deviceId: string) {
    if (!deviceId) throw new ForbiddenException('deviceId requerido');
    this.svc.openSession(deviceId);
    return { ok: true };
  }

  @Post('close-session')
  close(@Body('deviceId') deviceId: string) {
    if (!deviceId) throw new ForbiddenException('deviceId requerido');
    this.svc.closeSession(deviceId);
    return { ok: true };
  }
}
