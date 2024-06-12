import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignerEntity } from './designer.entity';
import { DesignerService } from './designer.service';
import { DesignerController } from './designer.controller';
import { AuthJwtModule } from './../jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([DesignerEntity]), AuthJwtModule],
  providers: [DesignerService],
  controllers: [DesignerController],
  exports: [DesignerService],
})
export class DesignerModule {}
