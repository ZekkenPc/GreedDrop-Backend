import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTelemetryDto {
  @IsString()
  deviceId!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(100)
  humedad?: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(100)
  pureza?: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
