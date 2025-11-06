import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsEmail,
  IsEnum,
} from 'class-validator';
enum UserRole {
  Admin = 'admin',
  Employee = 'empleado',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'The password must be bigger than 8 letter' })
  password?: string;
  @IsBoolean()
  @IsOptional()
  status?: boolean;
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
