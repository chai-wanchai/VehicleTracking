import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "src/shared/configuration";
import { AppConfigService } from "src/shared/configuration";
const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
      envFilePath: !ENV ? '.env' : `config/env/.${ENV}.env`
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}