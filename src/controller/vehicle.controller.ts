import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SearchVehicleDto, TrackingVehicleDto, VehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { VehicleEntity } from 'src/model/vehicle.entity';
import { VehicleHistoryEntity } from 'src/model/vehicleHistory.entity';
import { VehicleService } from 'src/service/verhicle.service';

@Controller('/vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) { }

	@Get('/list')
	async getVehiclesList(): Promise<VehicleEntity[]> {
		const result = await this.vehicleService.getVehicleAll()
		return result
	}
	@Post('/register')
	async registerVehicles(@Body() data: VehicleDto) {
		const result = await this.vehicleService.createVehicle(data)
		return result
	}
	@Post('/history')
	async getSearchVehicles(@Body() searchCriteria: SearchVehicleDto): Promise<VehicleHistoryEntity[]> {
		const { criteria, vehicle_id, paging } = searchCriteria
		const result = await this.vehicleService.findHistory(vehicle_id, criteria.start_date, criteria.end_date)
		return result
	}
	@Post('/tracking')
	async createVehiclesTricking(@Body() data: TrackingVehicleDto) {
		const result = await this.vehicleService.createTrackingVehicle(data)
		return result
	}
}
