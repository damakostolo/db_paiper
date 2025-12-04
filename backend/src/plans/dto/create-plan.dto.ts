import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const planItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const createPlanSchema = z.object({
  year: z.number().int().min(2000),
  quarter: z.number().int().min(1).max(4).nullable().optional(),
  description: z.string().trim().max(255).optional(),
  items: z.array(planItemSchema),
});

export class CreatePlanDto extends createZodDto(createPlanSchema) {}

export const CreatePlanSchema = createPlanSchema;
