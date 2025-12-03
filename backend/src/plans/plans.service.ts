import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productionPlan.findMany({
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { PlanID: 'desc' },
    });
  }

  async findOne(planId: number) {
    const plan = await this.prisma.productionPlan.findUnique({
      where: { PlanID: planId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    return plan;
  }

  async create(dto: CreatePlanDto) {
    return this.prisma.productionPlan.create({
      data: {
        Year: dto.year,
        Quarter: dto.quarter ?? null,
        Description: dto.description ?? null,
        items: {
          create: dto.items.map((item) => ({
            ProductID: item.productId,
            Quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }
}
