import { IsEmail, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: 'admin' | 'superAdmin'; 

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsInt()
  status?: number;

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
}
