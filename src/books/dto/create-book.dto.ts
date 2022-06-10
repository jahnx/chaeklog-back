import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  imgURL: string;

  @IsNotEmpty()
  startDate: string;

  endDate?: string;
}
