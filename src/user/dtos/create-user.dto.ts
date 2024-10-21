import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Tên phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên không được để trống.' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'Tuổi phải là một số nguyên.' })
  age?: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Giới tính phải là chuỗi.' })
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date) 
  @IsDate({ message: 'Ngày sinh không hợp lệ.' })
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi.' })
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  phoneNumber?: string;

  @ApiProperty()
  @IsString({ message: 'ID Google phải là chuỗi.' })
  idGoogle: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  password?: string;
}
