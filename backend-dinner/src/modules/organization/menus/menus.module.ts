import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './menus.schema';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])],
  providers: [MenusService],
  controllers: [MenusController],
  exports: [MongooseModule, MenusService],
})
export class MenusModule {}


