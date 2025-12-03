import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.materials.findMany({
      orderBy: { MaterialID: 'asc' },
    });
  }

  create(dto: CreateMaterialDto) {
    return this.prisma.materials.create({ data: dto });
  }
}
