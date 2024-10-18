import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number; 

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: number;
}
