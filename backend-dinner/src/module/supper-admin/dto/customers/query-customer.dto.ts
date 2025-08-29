import { IsOptional, IsNumber, IsString, IsEnum, IsBoolean, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CustomerPlan } from '../../schemas/customers.schema';

export class QueryCustomerDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit must not exceed 100' })
  limit?: number = 20;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsEnum(CustomerPlan, { message: 'Plan must be one of: basic, pro, enterprise' })
  plan?: CustomerPlan;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  sort?: string = '-createdAt';
}
