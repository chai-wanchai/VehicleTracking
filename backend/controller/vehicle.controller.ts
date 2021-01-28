import { Body, Controller, Get, HttpException, HttpStatus, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SearchVehicleDto, TrackingVehicleDto, VehicleAccessDto, VehicleDto } from '../dto/vehicle/vehicle.dto';
import { VehicleService } from '../service/verhicle.service';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../decorator/user.decorator';
import { JWTAuthGuard } from '../shared/auth.guard';
import { PagingDto } from '../dto/commont.dto';
@Controller('/api/vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService, private readonly configService: ConfigService) { }

	@Post('/list')
	async getVehiclesList(@Body() body: PagingDto): Promise<any> {
		const result = await this.vehicleService.getVehicleAll(body)
		return {
			data: result[0],
			total: result[1]
		};
	}
	@Post('/access')
	async getAccessVehicle(@Body() data: VehicleAccessDto) {
		const result = await this.vehicleService.getAccessVehicle(data)
		if (result) {
			const secret = this.configService.get('JWT_SECRET');
			const encode = jwt.sign({ vehicle_id: result.id }, secret)
			return { token: encode }
		} else {
			throw new HttpException('Invalid Vehicle Access', HttpStatus.UNAUTHORIZED);
		}
	}
	@Post('/register')
	async registerVehicles(@Body() data: VehicleDto) {
		const result = await this.vehicleService.createVehicle(data)
		return result
	}
	@Post('/history')
	@HttpCode(200)
	async getSearchVehicles(@Body() searchCriteria: SearchVehicleDto): Promise<any> {
		const { criteria, vehicle_name, paging } = searchCriteria
		const result = await this.vehicleService.findHistory(vehicle_name, criteria.start_date, criteria.end_date, paging)
		return {
			data: result[0],
			total: result[1]
		};
	}
	@Post('/tracking')
	@ApiBearerAuth()
	@UseGuards(JWTAuthGuard)
	async createVehiclesTricking(@Body() data: TrackingVehicleDto, @TokenPayload() payload: any) {
		data.vehicle_id = payload.vehicle_id
		const result = await this.vehicleService.createTrackingVehicle(data)
		return result
	}
}
