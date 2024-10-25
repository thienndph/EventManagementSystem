import { IsString, IsOptional, IsEmail, IsInt, IsDate, IsPhoneNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { adminStatus } from 'src/enums/adminStatus';


export class UpdateAdminDto {
//   @ApiProperty()
//   @IsEmail({}, { message: 'Email is not valid' })
//   @IsNotEmpty({ message: 'Email is required' })
//   email: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role, { message: 'Role must be ADMIN or SUPER_ADMIN' })
  role?: Role; 

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  age?: number;

  @ApiProperty({ description: 'Trạng thái của người dùng', enum: adminStatus, default: adminStatus.ACTIVE })
  @IsEnum(adminStatus, { message: 'Trạng thái không hợp lệ.ACTIVE hoặc DELETE' })
  @IsOptional()
  status?: adminStatus = adminStatus.ACTIVE;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate({ message: 'Date of Birth must be a valid date' })
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @ApiProperty()
  @IsOptional()
  // @IsPhoneNumber(null, { message: 'Phone Number is not valid' })
  phoneNumber?: string;
}