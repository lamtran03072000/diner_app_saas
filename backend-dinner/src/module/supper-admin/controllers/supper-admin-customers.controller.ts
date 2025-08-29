import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { SupperAdminCustomersService } from '../services/supper-admin-customers.service';
import { CreateCustomerDto } from '../dto/customers/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customers/update-customer.dto';
import { QueryCustomerDto } from '../dto/customers/query-customer.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { SupperAdminRole } from '../schemas/supper-admin-users.schema';

@Controller('supper-admin/customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SupperAdminRole.SUPER_ADMIN, SupperAdminRole.OPERATOR)
export class SupperAdminCustomersController {
  constructor(private readonly customersService: SupperAdminCustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    // Create new customer with owner
    const result = await this.customersService.create(createCustomerDto);
    
    return {
      customer: result.customer,
      owner: {
        id: result.owner._id,
        email: result.owner.email,
        fullName: result.owner.fullName,
        orgRole: result.owner.orgRole,
      },
    };
  }

  @Get()
  async findAll(@Query() query: QueryCustomerDto) {
    // Get paginated list of customers
    const result = await this.customersService.findMany(query);
    
    return {
      items: result.items,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Get customer by ID
    const customer = await this.customersService.findById(id);
    
    return customer;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    // Update customer
    const customer = await this.customersService.update(id, updateCustomerDto);
    
    return customer;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Query('hard') hard?: string
  ) {
    // Delete customer (soft delete by default, hard delete if hard=true)
    const hardDelete = hard === 'true';
    const customer = await this.customersService.remove(id, hardDelete);
    
    return customer;
  }
}
