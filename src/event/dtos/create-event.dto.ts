import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsNotEmpty()
  @IsString()
  location: string; 

  @IsNotEmpty()
  @IsDateString()
  date: Date; 
  @IsNotEmpty()
  @IsInt()
  seats: number; 

  @IsNotEmpty()
  @IsInt()
  userId: number; 

  @IsNotEmpty()
  @IsInt()
  status: number;
}
