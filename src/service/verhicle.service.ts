import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/auth/auth.dto';
import { Repository, Connection, Between } from 'typeorm';
import { VehicleEntity } from '../model/vehicle.entity';
import { VehicleHistoryEntity } from '../model/vehicleHistory.entity';
import { TrackingVehicleDto, VehicleDto } from 'src/dto/vehicle/vehicle.dto';

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
		return result.raw;
	}
	async getVehicleAll(): Promise<VehicleEntity[]> {
		const result = await this.vehicleRepo.find()
		return result;
	}
	async findHistory(vehicle_id: string, start_date: any, end_date: any): Promise<VehicleHistoryEntity[]> {
		const result = await this.vehicleHistoryRepo.find({
			where: {
				vehicle: { id: vehicle_id },
				created_date: Between(start_date, end_date)
			}
		})
		return result;
	}
	async createTrackingVehicle(data: TrackingVehicleDto) {
		const queryRunner = this.connection.createQueryRunner()
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const insert = new VehicleHistoryEntity()
			insert.vehicle = { id: data.vehicle_id }
			insert.lat = data.lat
			insert.long = data.long
			const result = await this.vehicleHistoryRepo.insert(insert)
			await queryRunner.commitTransaction();
			return result.raw;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error
		} finally {
			await queryRunner.release();
		}

	}
}
