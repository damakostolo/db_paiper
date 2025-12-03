import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';

@Module({
  imports: [PrismaModule],
  providers: [WarehousesService],
  controllers: [WarehousesController],
})
export class WarehousesModule {}
