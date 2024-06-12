import { UserEntity } from './../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('rating')
export class RatingEntity {
  @Column({ type: 'integer' })
  rate: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'makeRating' })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.rating)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
