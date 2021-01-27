import { Injectable } from '@nestjs/common';
import { Repository, Connection, Between } from 'typeorm';
import { VehicleEntity } from '../model/vehicle.entity';
import { VehicleHistoryEntity } from '../model/vehicleHistory.entity';
import { TrackingVehicleDto, VehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { pagingProcess } from 'src/shared/tableFrontend';
import { PagingDto } from 'src/dto/commont.dto';

@Injectable()
export class VehicleService {
	vehicleRepo: Repository<VehicleEntity>;
	vehicleHistoryRepo: Repository<VehicleHistoryEntity>;
	constructor(private connection: Connection) {
		this.vehicleRepo = this.connection.getRepository(VehicleEntity);
		this.vehicleHistoryRepo = this.connection.getRepository(VehicleHistoryEntity);
	}
	async getAccessVehicle(data) {
		const result = await this.vehicleRepo.findOne({ id: data.vehicle_id, vehicle_name: data.vehicle_name })
		return result;
	}
	async createVehicle(data: VehicleDto) {
		const result = await this.vehicleRepo.insert(data)
		return result.generatedMaps;
	}
	async getVehicleAll(page: PagingDto): Promise<[VehicleEntity[], number]> {
		const pagingDB = pagingProcess(page)
		const result = await this.vehicleRepo.createQueryBuilder().limit(pagingDB.limit).offset(pagingDB.offset).getManyAndCount()
		return result
	}
	async findHistory(vehicle_name: string, start_date: any, end_date: any, page: PagingDto): Promise<[VehicleHistoryEntity[], number]> {
		const pagingDB = pagingProcess(page)
		const result = await this.vehicleHistoryRepo.createQueryBuilder('history')
			.where("vehicle.vehicle_name = COALESCE(:vehicle_name,vehicle.vehicle_name)")
			.andWhere('history.created_date >= :start_date')
			.andWhere('history.created_date <= :end_date')
			.setParameters({ start_date, end_date, vehicle_name })
			.leftJoinAndSelect('history.vehicle', 'vehicle')
			.limit(pagingDB.limit)
			.offset(pagingDB.offset)
			.getManyAndCount()
		return result;
	}
	async createTrackingVehicle(data: TrackingVehicleDto) {
		const insert = new VehicleHistoryEntity()
		insert.vehicle = { id: data.vehicle_id }
		insert.lat = data.lat
		insert.long = data.long
		const result = await this.vehicleHistoryRepo.insert(insert)
		return result.generatedMaps;
	}
}
