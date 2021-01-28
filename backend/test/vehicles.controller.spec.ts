import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../controller/vehicle.controller';
import { VehicleService } from '../service/verhicle.service';
import { createConnection, Connection } from 'typeorm';
import * as dotenv from 'dotenv'
import { AppConfigService } from '../shared/configuration';
import { entities } from '../constant/entities';
import { HttpException, HttpStatus } from '@nestjs/common';
dotenv.config({ path: 'config/env/.test.env' })
describe('VehicleController Class', () => {
  let connection: Connection;
  let config: AppConfigService;
  let vehicleService: VehicleService;
  let vehicleController: VehicleController;
  beforeAll(async () => {
    config = new AppConfigService()
    connection = await createConnection({ synchronize: true, entities: entities, ...config.getTypeOrmConfig() })
    vehicleService = new VehicleService(connection)
    vehicleController = new VehicleController(vehicleService)
  });

  afterAll(async () => {
    await connection.close()
  });
  describe('[registerVehicles] method', () => {
    let res = null
    beforeAll(async () => {
      const data = { vehicle_name: `unit Test at ${new Date().toLocaleString()}` }
      res = await vehicleController.registerVehicles(data)
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
  describe('[getVehiclesList] method', () => {
    let res = null
    beforeAll(async () => {
      const data = {
        "page": 1,
        "itemPerPage": 10
      }
      res = await vehicleController.getVehiclesList(data)
    })
    it('should be array type', () => {
      expect(Array.isArray(res.data)).toBe(true);
    })
    it('should not over 10 items', () => {
      expect(res.data.length <= 10).toBe(true);
    });
    it('properties [total] should be number more than or equal 0', () => {
      expect(res.total).toBeGreaterThanOrEqual(0);
    });
    it('should have object key [data,total]', () => {
      expect(res).toHaveProperty("data");
      expect(res).toHaveProperty("total");
    });
    it('if has data more than 0 , expect have properties [id,created_date,updated_date,vehicle_name]', () => {
      if (res.data.length > 0) {
        const resData = res.data[0]
        expect(resData).toHaveProperty("id");
        expect(resData).toHaveProperty("created_date");
        expect(resData).toHaveProperty("updated_date");
        expect(resData).toHaveProperty("vehicle_name");
      }
    });
  });
  describe('[getAccessVehicle] method', () => {
    let listData = null
    beforeAll(async () => {
      listData = await vehicleController.getVehiclesList({ "page": 1, "itemPerPage": 10 })
    })
    it('should have object key [token]', async () => {
      const data = {
        "vehicle_name": listData.data[0].vehicle_name,
        "vehicle_id": listData.data[0].id
      }
      const res = await vehicleController.getAccessVehicle(data)
      expect(res).toHaveProperty("token");
      expect(typeof res.token).toBe('string');
    });

    it('should error when invalid input : message => "Invalid Vehicle Access"', async () => {
      const data = {
        "vehicle_name": 'invalid',
        "vehicle_id": '12234'
      }
      try {
        const res = await vehicleController.getAccessVehicle(data)
        expect(res).toHaveProperty("token");
        expect(typeof res).toBe('string')
      } catch (error) {
        expect(error.message).toBe('Invalid Vehicle Access')
      }
    });
  });
});
