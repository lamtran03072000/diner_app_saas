import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SupperAdminAuthService } from './supper-admin-auth.service';
import { SupperAdminLoginDto } from './dto/login.dto';
import { SupperAdminAuthGuard } from '../../../common/guards/supper-admin-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@Controller('supper-admin/auth')
export class SupperAdminAuthController {
  constructor(private readonly authService: SupperAdminAuthService) {}

  @Post('login')
  login(@Body() dto: SupperAdminLoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Get('me')
  @UseGuards(SupperAdminAuthGuard)
  me(@CurrentUser() user: any) {
    return user;
  }
}


