import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value ?? '1', 10))
  @IsInt()
  @Min(1)
  page = 1;

  @Transform(({ value }) => parseInt(value ?? '20', 10))
  @IsInt()
  @Min(1)
  limit = 20;
}


