import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  emailBling?: string;

  @IsOptional()
  @IsEnum(['pro', 'basic'])
  plan?: 'pro' | 'basic';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
