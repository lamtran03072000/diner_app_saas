import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrganizationAuthService } from './organization-auth.service';
import { OrganizationLoginDto } from './dto/login.dto';
import { OrganizationAuthGuard } from '../../../common/guards/organization-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@Controller('org/auth')
export class OrganizationAuthController {
  constructor(private readonly authService: OrganizationAuthService) {}

  @Post('login')
  login(@Body() dto: OrganizationLoginDto) {
    return this.authService.login(dto.email, dto.password, dto.orgId);
  }

  @Get('me')
  @UseGuards(OrganizationAuthGuard)
  me(@CurrentUser() user: any) {
    return user;
  }
}


