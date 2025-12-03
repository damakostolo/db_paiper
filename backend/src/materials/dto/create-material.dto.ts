import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createMaterialSchema = z.object({
  Name: z.string().min(1).max(255),
  Category: z.string().trim().max(100).optional(),
  Unit: z.string().min(1).max(50),
});

export class CreateMaterialDto extends createZodDto(createMaterialSchema) {}

export const CreateMaterialSchema = createMaterialSchema;
