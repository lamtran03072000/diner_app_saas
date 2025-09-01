import { IsEmail, IsString } from 'class-validator';

export class SupperAdminLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}


