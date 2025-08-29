import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Schemas
import { SupperAdminUser, SupperAdminUserSchema } from './schemas/supper-admin-users.schema';
import { Customer, CustomerSchema } from './schemas/customers.schema';
import { CustomerUser, CustomerUserSchema } from './schemas/customer-users.schema';

// Services
import { SupperAdminUsersService } from './services/supper-admin-users.service';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { SupperAdminCustomersService } from './services/supper-admin-customers.service';
import { SupperAdminCustomerUsersService } from './services/supper-admin-customer-users.service';

// Controllers
import { SupperAdminUsersController } from './controllers/supper-admin-users.controller';
import { AuthController } from './controllers/auth.controller';
import { SupperAdminCustomersController } from './controllers/supper-admin-customers.controller';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupperAdminUser.name, schema: SupperAdminUserSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: CustomerUser.name, schema: CustomerUserSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SupperAdminUsersController, AuthController, SupperAdminCustomersController],
  providers: [
    SupperAdminUsersService,
    AuthService,
    JwtService,
    SupperAdminCustomersService,
    SupperAdminCustomerUsersService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    SupperAdminUsersService,
    AuthService,
    JwtService,
    SupperAdminCustomersService,
    SupperAdminCustomerUsersService,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class SupperAdminModule {}
