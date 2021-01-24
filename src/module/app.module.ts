import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { Connection } from 'typeorm';
import { VehicleModule } from './vehicle.module';
import { AppConfigModule } from './config.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    VehicleModule
  ],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private connection: Connection) {}
 }
