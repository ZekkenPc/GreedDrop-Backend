import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum UserRole {
  Admin = 'admin',
  Employee = 'employee',
}

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
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
