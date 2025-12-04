import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createProductSchema = z.object({
  Name: z.string().min(1).max(255),
  Unit: z.string().min(1).max(50),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}

export const CreateProductSchema = createProductSchema;
