import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email: string;

  @IsString({ message: 'Tên phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên không được để trống.' })
  name: string;

  @IsOptional()
  @IsInt({ message: 'Tuổi phải là một số nguyên.' })
  age?: number;

  @IsOptional()
  @IsString({ message: 'Giới tính phải là chuỗi.' })
  gender?: string;

  @IsOptional()
  @IsDate({ message: 'Ngày sinh không hợp lệ.' })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi.' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi.' })
  phoneNumber?: string;

  @IsString({ message: 'ID Google phải là chuỗi.' })
  idGoogle: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  password?: string; 
}
