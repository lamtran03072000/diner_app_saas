import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersSupperAdminService } from './users-supper-admin.service';
import { SupperAdminAuthGuard } from '../../../common/guards/supper-admin-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { omit } from 'lodash';

@Controller('supper-admin/users')
export class UsersSupperAdminController {
  constructor(private readonly usersService: UsersSupperAdminService) {}

  @Get()
  @UseGuards(SupperAdminAuthGuard, RolesGuard)
  @Roles('manager')
  async list() {
    const users = await this.usersService.findAll();
    return users.map((u) => ({
      id: u._id.toString(),
      email: u.email,
      role: u.role,
    }));
  }

  @Get('info')
  @UseGuards(SupperAdminAuthGuard)
  async infoUser(@CurrentUser() user: any) {
    let { sub } = user || {};
    try {
      const user = await this.usersService.findById(sub).lean();
      return omit(user, 'password');
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
