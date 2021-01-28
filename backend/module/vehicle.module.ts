import { Module } from '@nestjs/common';
import { VehicleController } from 'backend/controller/vehicle.controller';
import { AuthService } from 'backend/service/auth.service';
import { VehicleService } from '../service/verhicle.service';
@Module({
	imports: [],
	controllers: [VehicleController],
	providers: [VehicleService, AuthService],
	exports: [VehicleService],
})
export class VehicleModule { }