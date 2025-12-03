import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const upsertInventorySchema = z.object({
  materialId: z.number().int().positive(),
  warehouseId: z.number().int().positive(),
  currentStock: z.number().nonnegative(),
});

export class UpsertInventoryDto extends createZodDto(upsertInventorySchema) {}

export const UpsertInventorySchema = upsertInventorySchema;
