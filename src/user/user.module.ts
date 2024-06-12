import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthJwtModule } from './../jwt.module';
import { UserController } from './user.controller';
import { DesignerModule } from './../designer/designer.module';
import { UploaderModule } from './../uploader/uploader.module';
import { PortfolioModule } from './../portfolio/portfolio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DesignerModule,
    PortfolioModule,
    AuthJwtModule,
    UploaderModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
