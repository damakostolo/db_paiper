import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { PlansModule } from './plans/plans.module';
import { MaterialsModule } from './materials/materials.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductsModule,
    PlansModule,
    MaterialsModule,
    WarehousesModule,
    InventoryModule,
    ReportsModule,
  ],
})
export class AppModule {}
