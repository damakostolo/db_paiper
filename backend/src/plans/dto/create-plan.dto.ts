import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsPositive, IsString, Max, Min, ValidateNested } from 'class-validator';

class PlanItemDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  quantity!: number;
}

export class CreatePlanDto {
  @IsInt()
  @Min(2000)
  year!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  quarter?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanItemDto)
  items!: PlanItemDto[];
}
