import { Body, Controller, Get, HttpException, HttpStatus, Request, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SearchVehicleDto, TrackingVehicleDto, VehicleAccessDto, VehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { VehicleEntity } from 'src/model/vehicle.entity';
import { VehicleHistoryEntity } from 'src/model/vehicleHistory.entity';
import { AuthService } from 'src/service/auth.service';
import { VehicleService } from 'src/service/verhicle.service';
import { JwtStrategy } from 'src/shared/auth.strategy';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/decorator/user.decorator';
import { JWTAuthGuard } from 'src/shared/auth.guard';
@Controller('/vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService, private readonly configService: ConfigService) { }

	@Get('/list')
	async getVehiclesList(): Promise<VehicleEntity[]> {
		const result = await this.vehicleService.getVehicleAll()
		return result
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
	async getSearchVehicles(@Body() searchCriteria: SearchVehicleDto): Promise<VehicleHistoryEntity[]> {
		const { criteria, vehicle_id, paging } = searchCriteria
		const result = await this.vehicleService.findHistory(vehicle_id, criteria.start_date, criteria.end_date)
		return result
	}
	@Post('/tracking')
	@ApiBearerAuth()
	@UseGuards(JWTAuthGuard)
	async createVehiclesTricking(@Body() data: TrackingVehicleDto,@TokenPayload() payload:any) {
		data.vehicle_id = payload.vehicle_id
		const result = await this.vehicleService.createTrackingVehicle(data)
		return result
	}
}
