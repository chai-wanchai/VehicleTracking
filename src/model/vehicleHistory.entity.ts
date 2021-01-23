import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn, ManyToOne } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';

@Entity('vehicle_history')
export class VehicleHistoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_date: Date;

	@Column()
	lat: string
	@Column()
	long: string

	@ManyToOne(() => VehicleEntity, ve => ve.history)
	vehicle: VehicleEntity


}