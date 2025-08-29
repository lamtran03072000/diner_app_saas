import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupperAdminModule } from './module/supper-admin/supper-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGO || 'mongodb://localhost:27017/myappdb', {
      dbName: 'myappdb',
    }),
    SupperAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
