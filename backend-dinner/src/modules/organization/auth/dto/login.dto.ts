import { IsEmail, IsMongoId, IsString } from 'class-validator';

export class OrganizationLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsMongoId()
  orgId: string;
}


