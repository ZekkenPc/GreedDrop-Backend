import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'The password must be bigger than 8 letter' })
  password: string;
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
