import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  startDate: string;

  endDate?: string;
}
