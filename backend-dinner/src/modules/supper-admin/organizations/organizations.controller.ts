import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizationDto,
  OrganizationResponseDto,
  OrganizationsListResponseDto,
} from './dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SupperAdminAuthGuard } from '../../../common/guards/supper-admin-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller('supper-admin/organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseGuards(SupperAdminAuthGuard, RolesGuard)
  @Roles('manager')
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @CurrentUser() userId?: string,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.create(createOrganizationDto, userId);
  }

  @Get()
  @UseGuards(SupperAdminAuthGuard, RolesGuard)
  @Roles('manager')
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<OrganizationsListResponseDto> {
    return this.organizationsService.findAll(paginationDto);
  }
}
