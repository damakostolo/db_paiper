import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface MaterialNeedRow {
  Material: string;
  TotalNeed: number;
}

export interface ConsumptionNormRow {
  Product: string;
  Material: string;
  QuantityPerUnit: number;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  getMaterialNeed(planId: number) {
    return this.$queryRaw<MaterialNeedRow[]>`
      SELECT
        m."Name" AS "Material",
        SUM(ppi."Quantity" * cn."QuantityPerUnit") AS "TotalNeed"
      FROM public."ProductionPlanItem" ppi
      JOIN public."ConsumptionNorm" cn
        ON ppi."ProductID" = cn."ProductID"
      JOIN public."Materials" m
        ON cn."MaterialID" = m."MaterialID"
      WHERE ppi."PlanID" = ${planId}
      GROUP BY m."Name";
    `;
  }

  getConsumptionNorms() {
    return this.$queryRaw<ConsumptionNormRow[]>`
      SELECT
        p."Name" AS "Product",
        m."Name" AS "Material",
        cn."QuantityPerUnit"
      FROM public."ConsumptionNorm" cn
      JOIN public."Products" p
        ON cn."ProductID" = p."ProductID"
      JOIN public."Materials" m
        ON cn."MaterialID" = m."MaterialID";
    `;
  }
}
