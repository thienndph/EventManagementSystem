import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  idGoogle: string;

  @IsOptional()
  @IsString()
  password?: string; 
}
