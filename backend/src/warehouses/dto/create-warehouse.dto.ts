import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createWarehouseSchema = z.object({
  Name: z.string().min(1).max(255),
  Location: z.string().trim().max(255).optional(),
});

export class CreateWarehouseDto extends createZodDto(createWarehouseSchema) {}

export const CreateWarehouseSchema = createWarehouseSchema;
