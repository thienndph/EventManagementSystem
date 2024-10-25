import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class SearchEventDto {
  @ApiPropertyOptional({ description: 'Ngày của sự kiện', example: '2024-10-23' })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày không hợp lệ. Định dạng phải là YYYY-MM-DD.' })
  date?: string;

  @ApiPropertyOptional({ description: 'Tên sự kiện', example: 'Sinh nhật' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Mô tả sự kiện', example: 'Sinh nhật của tôi' })
  @IsOptional()
  @IsString()
  description?: string;

  
}
