import { IsString, IsOptional, IsEmail, IsInt, IsDate, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) // Chuyển đổi chuỗi thành Date
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phoneNumber?: string;
}
