import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { VehicleHistoryEntity } from './vehicleHistory.entity';

@Entity('vehicle')
export class VehicleEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@CreateDateColumn()
	created_date?: Date;

	@UpdateDateColumn()
	updated_date?: Date;

	@Column({ unique: true })
	vehicle_name?: string;

	@OneToMany(() => VehicleHistoryEntity, his => his.vehicle)
	history?: VehicleHistoryEntity[]
}