import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity])],
  providers: [],
  controllers: [],
  exports: [],
})
export class RatingModule {}
