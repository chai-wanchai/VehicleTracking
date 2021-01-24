import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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
	@JoinColumn({ name: "vehicle_id" })
	vehicle: VehicleEntity


}