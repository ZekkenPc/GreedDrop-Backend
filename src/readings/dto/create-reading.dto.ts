import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateReadingDto {
  @IsString()
  deviceId: string;

  @IsNumber() @Min(0) @Max(100)
  humedad: number;

  @IsNumber() @Min(0) @Max(100)
  pureza: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
