import { IsString, IsOptional, IsEmail, IsInt, IsDate, IsPhoneNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

export class CreateAdminDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be ADMIN or SUPER_ADMIN' })
  role?: Role; 

  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  age?: number;

  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  gender?: string;

  @IsOptional()
  @IsDate({ message: 'Date of Birth must be a valid date' })
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Phone Number is not valid' })
  phoneNumber?: string;
}
