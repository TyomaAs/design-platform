import { Injectable } from '@nestjs/common';
import { RatingEntity } from './rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    private ratingEntity: RatingEntity,
    private ratingRepositiry: Repository<RatingEntity>,
  ) {}

  //! async getRatingForSender(id: number, idTo: number): Promise<number> {
  //   await this.ratingRepositiry.findBy({ user: `${id}` });
  //   return 5;
  // }
}
