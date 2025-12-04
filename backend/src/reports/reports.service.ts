import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface MaterialNeedRow {
  Material: string;
  TotalNeed: number;
}

interface ConsumptionNormRow {
  Product: string;
  Material: string;
  QuantityPerUnit: number;
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  getMaterialNeed(planId: number) {
    return this.prisma.$queryRaw<MaterialNeedRow[]>`
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
    return this.prisma.$queryRaw<ConsumptionNormRow[]>`
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
