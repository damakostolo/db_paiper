import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('material-need/:planId')
  getMaterialNeed(@Param('planId', ParseIntPipe) planId: number) {
    return this.reportsService.getMaterialNeed(planId);
  }

  @Get('consumption-norms')
  getConsumptionNorms() {
    return this.reportsService.getConsumptionNorms();
  }
}
