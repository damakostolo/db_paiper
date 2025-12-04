import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';

@Module({
  imports: [PrismaModule],
  providers: [MaterialsService],
  controllers: [MaterialsController],
})
export class MaterialsModule {}
