import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import mongoConfig from './config/mongo.config';
import { DatabaseModule } from './database/database.module';
import { AppJwtModule } from './shared/jwt/jwt.module';
import { HashingModule } from './shared/hashing/hashing.module';
import { SupperAdminAuthModule } from './modules/supper-admin/auth/supper-admin-auth.module';
import { UsersSupperAdminModule } from './modules/supper-admin/users-supper-admin/users-supper-admin.module';
import { OrganizationsModule } from './modules/supper-admin/organizations/organizations.module';
import { OrganizationAuthModule } from './modules/organization/auth/organization-auth.module';
import { CustomersModule } from './modules/organization/customers/customers.module';
import { MenusModule } from './modules/organization/menus/menus.module';
import { FoodsModule } from './modules/organization/foods/foods.module';
import { StoresModule } from './modules/organization/stores/stores.module';
import { TablesModule } from './modules/organization/tables/tables.module';
import { OrdersModule } from './modules/organization/orders/orders.module';
import { SchedulesModule } from './modules/organization/schedules/schedules.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, mongoConfig] }),
    DatabaseModule,
    AppJwtModule,
    HashingModule,
    // Supper admin
    UsersSupperAdminModule,
    SupperAdminAuthModule,
    OrganizationsModule,
    // Organization
    CustomersModule,
    OrganizationAuthModule,
    MenusModule,
    FoodsModule,
    StoresModule,
    TablesModule,
    OrdersModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
