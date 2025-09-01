import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrganizationAuthGuard } from '../../../common/guards/organization-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { MenusService } from './menus.service';

@Controller('org/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @UseGuards(OrganizationAuthGuard, RolesGuard)
  @Roles('manager', 'staff')
  list(@OrgId() orgId: string) {
    return this.menusService.findByOrg(orgId);
  }
}


