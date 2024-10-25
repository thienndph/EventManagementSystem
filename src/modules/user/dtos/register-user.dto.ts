import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum, IsEmail, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED'
}

export class RegisterUserDto {
  @ApiProperty({ description: 'Email của người dùng', example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email: string;

  @ApiProperty({ description: 'Tên của người dùng' })
  @IsString({ message: 'Tên phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên không được để trống.' })
  name: string;

  
  idGoogle: null;

  @ApiProperty({ description: 'Mật khẩu của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  password?: string;

  @ApiProperty({ description: 'Tuổi của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @IsInt({ message: 'Tuổi phải là số nguyên.' })
  age?: number;

  @ApiProperty({ description: 'Giới tính của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @IsString({ message: 'Giới tính phải là chuỗi.' })
  gender?: string;

  @ApiProperty({ description: 'Ngày sinh của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Ngày sinh không hợp lệ.' })
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Địa chỉ của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi.' })
  address?: string;

  @ApiProperty({ description: 'Số điện thoại của người dùng (tuỳ chọn)', required: false })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  phoneNumber?: string;

//   @ApiProperty({ description: 'Trạng thái của người dùng', enum: UserStatus, default: UserStatus.ACTIVE })
//   @IsEnum(UserStatus, { message: 'Trạng thái không hợp lệ.' })
//   @IsOptional()
 // status?: UserStatus = UserStatus.ACTIVE;
}
