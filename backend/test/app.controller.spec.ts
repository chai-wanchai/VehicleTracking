import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../controller/vehicle.controller';
import { VehicleService } from '../service/verhicle.service';
import { Repository, Connection, Between } from 'typeorm';
import { DatabaseModule } from '../module/database.module';
import { AppConfigModule } from '../module/config.module';

describe('VehicleController', () => {
  let app: TestingModule;
  let connection: Connection;
  beforeAll(async () => {
    //  connection = new Connection()
    // app = await Test.createTestingModule({
    //   imports:[DatabaseModule,AppConfigModule],
    //   controllers: [VehicleController],
    //   providers: [VehicleService],
    // }).compile();
  });

  describe('registerVehicles', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<VehicleController>(VehicleController);
      const data = { vehicle_name: `unit Test at ${new Date().toLocaleString()}` }
      expect(appController.registerVehicles(data)).toBe(typeof String);
    });
  });
});
