import { Module } from '@nestjs/common';
import { VehicleController } from 'src/controller/vehicle.controller';
import { VehicleService } from '../service/verhicle.service';
@Module({
	imports: [],
	controllers:[VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}