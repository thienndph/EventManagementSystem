import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string; 

  @IsOptional()
  @IsDateString()
  date?: Date; 

  @IsOptional()
  @IsInt()
  seats?: number; 

  @IsOptional()
  @IsInt()
  userId?: number;
}
