import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.products.findMany({
      orderBy: { ProductID: 'asc' },
    });
  }

  async findOne(productId: number) {
    const product = await this.prisma.products.findUnique({ where: { ProductID: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(dto: CreateProductDto) {
    return this.prisma.products.create({ data: dto });
  }

  async remove(productId: number) {
    await this.findOne(productId);
    return this.prisma.products.delete({ where: { ProductID: productId } });
  }
}
