import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/user.entity'; // not use 'src' in import
import { DesignerEntity } from './../designer/designer.entity';
import { PortfolioEntity } from './../portfolio/portfolio.entity';
import { OrderEntity } from './../order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        synchronize: true,
        entities: [UserEntity, DesignerEntity, PortfolioEntity, OrderEntity],
      }),
    }),
  ],
})
export class DbModule {}
// comment
