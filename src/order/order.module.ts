import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { AuthJwtModule } from './../jwt.module';
import { OrderController } from './order.controller';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), AuthJwtModule, UserModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
