import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateReadingDto {
  @IsString()
  deviceId!: string;

  @IsOptional() @IsString()
  name?: string;

  @IsOptional() @IsInt()
  rssi?: number;

  // --- AGREGADO: sensores opcionales ---
  @IsOptional() @Min(0) @Max(100)
  humedad?: number;

  @IsOptional() @Min(0) @Max(100)
  pureza?: number;

  @IsOptional() @IsString()
  estado?: string; // por defecto "OK"
}
