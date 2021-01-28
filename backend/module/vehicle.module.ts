import { Module } from '@nestjs/common';
import { VehicleController } from '../controller/vehicle.controller';
import { AuthService } from '../service/auth.service';
import { VehicleService } from '../service/verhicle.service';
@Module({
	imports: [],
	controllers: [VehicleController],
	providers: [VehicleService, AuthService],
	exports: [VehicleService],
})
export class VehicleModule { }