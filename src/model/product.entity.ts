import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';


@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;
	@Column()
  product_code: string;
	@Column()
  product_name: string;
	@Column()
	product_type:string
  @CreateDateColumn()
  created_at: Date;
	@UpdateDateColumn()
	updated_at: Date;
}