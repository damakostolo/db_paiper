import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertInventoryDto } from './dto/upsert-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.inventory.findMany({
      include: {
        material: true,
        warehouse: true,
      },
      orderBy: [
        { WarehouseID: 'asc' },
        { MaterialID: 'asc' },
      ],
    });
  }

  upsert(dto: UpsertInventoryDto) {
    return this.prisma.inventory.upsert({
      where: {
        MaterialID_WarehouseID: {
          MaterialID: dto.materialId,
          WarehouseID: dto.warehouseId,
        },
      },
      update: {
        CurrentStock: dto.currentStock,
      },
      create: {
        MaterialID: dto.materialId,
        WarehouseID: dto.warehouseId,
        CurrentStock: dto.currentStock,
      },
      include: {
        material: true,
        warehouse: true,
      },
    });
  }
}
