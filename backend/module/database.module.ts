import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { entities } from '../constant/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database')
        const log = configService.get('isProduction')
        const option: TypeOrmModuleOptions = {
          name: 'default',
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database_name,
          synchronize: true,
          logging: false,
          entities: entities,
          retryAttempts: 20,
          retryDelay: 1000,
          multithreading: true,
          pool: {
            max: 20,
            min: 2
          }
        }
        return option
      }
    }),
  ]
})
export class DatabaseModule { }