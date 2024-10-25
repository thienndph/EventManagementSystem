import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString, IsEnum } from 'class-validator';

enum EventStatus {
  CONFRIM = 'CONFRIM',
  NOCONFRIM = 'NOCONFRIM',
  DELETE = 'DELETE',
}

export class CreateEventDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string; 

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string; 

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string; 

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  seats: number; 

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsInt()
  // userId: number; 

  // @ApiProperty({ description: 'Trạng thái của người dùng', enum: EventStatus, default: EventStatus.NOCONFRIM })
  // @IsEnum(EventStatus, { message: 'Trạng thái không hợp lệ.' })
  // @IsOptional()
  // status?: EventStatus = EventStatus.CONFRIM;
}
