import { IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 255)
  Name!: string;

  @IsString()
  @Length(1, 50)
  Unit!: string;
}
