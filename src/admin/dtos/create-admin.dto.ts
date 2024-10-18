<<<<<<< HEAD
import { IsString, IsOptional, IsEmail, IsInt, IsDate, IsPhoneNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';
=======
import { IsEmail, IsString, IsOptional, IsInt } from 'class-validator';
>>>>>>> 123ae7ec7c9bf2d484fa529e2d50072e8093d99d

export class CreateAdminDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

<<<<<<< HEAD
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;
=======
  @IsString()
  password: string;
>>>>>>> 123ae7ec7c9bf2d484fa529e2d50072e8093d99d

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
<<<<<<< HEAD
  @IsEnum(Role, { message: 'Role must be ADMIN or SUPER_ADMIN' })
  role?: Role; 
=======
  @IsString()
  role?: 'admin' | 'superAdmin'; 
>>>>>>> 123ae7ec7c9bf2d484fa529e2d50072e8093d99d

  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  age?: number;

  @IsOptional()
<<<<<<< HEAD
  @IsString({ message: 'Gender must be a string' })
  gender?: string;

  @IsOptional()
  @IsDate({ message: 'Date of Birth must be a valid date' })
  @Type(() => Date)
=======
  @IsInt()
  status?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
>>>>>>> 123ae7ec7c9bf2d484fa529e2d50072e8093d99d
  dateOfBirth?: Date;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
<<<<<<< HEAD
  @IsPhoneNumber(null, { message: 'Phone Number is not valid' })
=======
  @IsString()
>>>>>>> 123ae7ec7c9bf2d484fa529e2d50072e8093d99d
  phoneNumber?: string;
}
