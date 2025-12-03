import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpsertInventoryDto } from './dto/upsert-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Put()
  upsert(@Body() dto: UpsertInventoryDto) {
    return this.inventoryService.upsert(dto);
  }
}
