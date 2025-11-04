import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('ingest')
export class IngestController {
  constructor(private readonly svc: IngestService) {}

  @Post()
  async handleIngest(@Body() body: any) {
    return this.svc.processIncoming(body);
  }
}
