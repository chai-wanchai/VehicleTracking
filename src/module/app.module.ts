import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { Connection } from 'typeorm';
import { VehicleModule } from './vehicle.module';
const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `config/env/.${ENV}.env`,
    }),
    AuthModule,
    DatabaseModule,
    VehicleModule
  ],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private connection: Connection) {}
 }
