import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateAdminLogDto {
  @IsInt()
  adminId: number;

  @IsEnum(['CREATE', 'UPDATE', 'DELETE'])
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @IsOptional()
  @IsInt()
  eventId?: number; 
}
