import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJwtModule } from './../jwt.module';
import { PortfolioEntity } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { DesignerModule } from './../designer/designer.module';
import { UploaderModule } from './../uploader/uploader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity]),
    DesignerModule,
    AuthJwtModule,
    UploaderModule,
  ],
  providers: [PortfolioService],
  controllers: [],
  exports: [PortfolioService],
})
export class PortfolioModule {}
