import { Injectable } from '@nestjs/common';
import {
  ConsumptionNormRow,
  MaterialNeedRow,
  PrismaService,
} from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  getMaterialNeed(planId: number) {
    return this.prisma.getMaterialNeed(planId);
  }

  getConsumptionNorms() {
    return this.prisma.getConsumptionNorms();
  }
}
