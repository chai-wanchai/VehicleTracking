import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';


@Entity('trade')
export class TradeEntity {
	@PrimaryGeneratedColumn()
	id: number
	@Column()
	instrument_id: number;
	@Column()
	volume: number;
	@Column()
	price: number;
	@Column({ type: 'nvarchar', length: 'MAX' })
	raw: string
	@CreateDateColumn()
	created_at: Date;
	@UpdateDateColumn()
	updated_at: Date;
}