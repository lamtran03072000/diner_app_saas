import { 
  Controller, 
  Post, 
  Body,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { SupperAdminUsersService } from '../services/supper-admin-users.service';
import { CreateSupperAdminUserDto } from '../dto/create-supper-admin-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { SupperAdminRole } from '../schemas/supper-admin-users.schema';

@Controller('supper-admin-users')
export class SupperAdminUsersController {
  constructor(private readonly supperAdminUsersService: SupperAdminUsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SupperAdminRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSupperAdminUserDto: CreateSupperAdminUserDto) {
    const createdUser = await this.supperAdminUsersService.create(createSupperAdminUserDto);
    
    // Return sanitized response with only safe fields
    return {
      id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      role: createdUser.role,
      isActive: createdUser.isActive,
      createdAt: (createdUser as any).createdAt,
      updatedAt: (createdUser as any).updatedAt,
    };
  }
}
