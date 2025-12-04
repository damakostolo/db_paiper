import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.warehouses.findMany({
      orderBy: { WarehouseID: 'asc' },
    });
  }

  create(dto: CreateWarehouseDto) {
    return this.prisma.warehouses.create({ data: dto });
  }
}
