import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../controller/vehicle.controller';
import { VehicleService } from '../service/verhicle.service';
import { createConnection, Connection } from 'typeorm';
import * as dotenv from 'dotenv'
import { AppConfigService } from '../shared/configuration';
import { entities } from '../constant/entities';
import { VehicleEntity } from '../model/vehicle.entity';
dotenv.config({ path: 'config/env/.test.env' })
describe('VehicleService Class', () => {
	let connection: Connection;
	let config: AppConfigService;
	let vehicleService: VehicleService;
	let simpleData: { data: any }
	beforeAll(async () => {
		config = new AppConfigService()
		connection = await createConnection({ synchronize: true, entities: entities, ...config.getTypeOrmConfig() })
		const insertData = { vehicle_name: 'unit_test_vehicle_name' + new Date().getTime() }
		const regis = await connection.getRepository(VehicleEntity).insert(insertData)
		vehicleService = new VehicleService(connection)
		simpleData = {
			data: [{ ...insertData }]
		}
	});

	afterAll(async () => {
		await connection.close()
	});
	describe('[getAccessVehicle] method', () => {
		let res = null
		beforeAll(async () => {
			const data = {
				"vehicle_name": simpleData.data[0].vehicle_name,
				"vehicle_id": simpleData.data[0].id
			}
			res = await vehicleService.getAccessVehicle(data)
		})
		it('should be object type', () => {
			expect(typeof res).toBe('object');
		})
		it('should have object key [token]', async () => {
			expect(res).toHaveProperty("id");
			expect(res).toHaveProperty("vehicle_name");
		});

	});
	describe('[createVehicle] method', () => {
		let res = null
		beforeAll(async () => {
			const data = { vehicle_name: `unit Test at ${new Date().getTime()}` }
			res = await vehicleService.createVehicle(data)
		})
		it('should be array type', () => {
			expect(Array.isArray(res)).toBe(true);
		})
		it('should have object key [id,created_date,updated_date]', () => {
			expect(res[0]).toHaveProperty("id");
			expect(res[0]).toHaveProperty("created_date");
			expect(res[0]).toHaveProperty("updated_date");
		});
	});
	describe('[getVehicleAll] method', () => {
		let res = null
		beforeAll(async () => {
			const data = { "page": 1, "itemPerPage": 10 }
			res = await vehicleService.getVehicleAll(data)
		})
		it('should be array type and have 2 index', () => {
			expect(Array.isArray(res)).toBe(true);
			expect(res.length).toBe(2);
		})
		it('index[0] should not over 10 items', () => {
			expect(res[0].length).toBeLessThanOrEqual(10);
		});
		it('index[1] should be number more than or equal 0', () => {
			expect(res[1]).toBeGreaterThanOrEqual(0);
		});
		it('index[0] should have object key [id,vehicle_name]', () => {
			expect(res[0][0]).toHaveProperty("id");
			expect(res[0][0]).toHaveProperty("vehicle_name");
		});
	});
	describe('[findHistory] method', () => {
		let res = null
		beforeAll(async () => {
			const data = {
				"vehicle_name": simpleData.data[0].vehicle_name,
				"paging": {
					"page": 1,
					"itemPerPage": 10
				},
				"criteria": {
					"start_date": "2021-01-01T00:00:00.000Z",
					"end_date": "2021-12-28T13:28:23.831Z"
				}
			}
			res = await vehicleService.findHistory(data.vehicle_name, data.criteria.start_date, data.criteria.end_date, data.paging)
		})
		it('should be array type and 2 array data', () => {
			expect(Array.isArray(res)).toBe(true);
			expect(res.length).toEqual(2)
		})
		it('array index[0] should not over 10 items', () => {
			expect(res[0].length).toBeLessThanOrEqual(10);
		});
		it('array index[1] should be number more than or equal 0', () => {
			expect(res[1]).toBeGreaterThanOrEqual(0);
		});

	});
	describe('[createTrackingVehicle] method', () => {
		let res = null
		beforeAll(async () => {
			const data = { vehicle_id: simpleData.data[0].id, lat: (Math.random() * 10).toString(), long: (Math.random() * 10).toString() }
			res = await vehicleService.createTrackingVehicle(data)
		})

		it('should have object key [id,created_date]', () => {
			expect(res[0]).toHaveProperty("id");
			expect(res[0]).toHaveProperty("created_date");
		});
	});

});
