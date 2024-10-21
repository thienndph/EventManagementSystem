import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateEventUserDto {
  @IsNotEmpty()
  @IsInt()
  idEvent: number;

  @IsNotEmpty()
  @IsInt()
  idUser: number;
}
