import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SupperAdminAuthService } from './supper-admin-auth.service';
import { SupperAdminLoginDto } from './dto/login.dto';

@Controller('supper-admin/auth')
export class SupperAdminAuthController {
  constructor(private readonly authService: SupperAdminAuthService) {}

  @Post('login')
  login(@Body() dto: SupperAdminLoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
