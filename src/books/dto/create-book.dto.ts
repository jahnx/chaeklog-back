import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authors: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  startDate: string;

  endDate?: string;
}
