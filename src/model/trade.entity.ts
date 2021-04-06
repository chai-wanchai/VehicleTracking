import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';


@Entity('product_instruments')
export class ProductInstrumentsEntity {
  @PrimaryGeneratedColumn()
  instrument_id: number;
	@Column()
  symbol: string;
  @CreateDateColumn()
  created_at: Date;
	@UpdateDateColumn()
	updated_at: Date;
}