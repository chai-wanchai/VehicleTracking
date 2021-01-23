import { Module } from '@nestjs/common';
import { VehicleController } from 'src/controller/vehicle.controller';
import { AuthService } from 'src/service/auth.service';
import { UsersService } from 'src/service/user.service';
import { VehicleService } from '../service/verhicle.service';
@Module({
	imports: [],
	controllers: [VehicleController],
	providers: [VehicleService,AuthService,UsersService],
	exports: [VehicleService],
})
export class VehicleModule { }