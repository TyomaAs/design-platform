import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  customer: UserEntity;

  @Column({ type: 'integer' })
  idCus: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  receiver: UserEntity;

  @Column({ type: 'integer' })
  idRec: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean' })
  isDone: boolean;

  @Column({ type: 'timestamp', default: new Date() })
  time: Date;

  @Column({ type: 'varchar' })
  timeTo: string;

  @Column({ type: 'text' })
  review: string;

  @Column({ type: 'integer' })
  sum: number;

  @Column({ type: 'varchar' })
  cardNumber: string;

  @Column({ type: 'integer' })
  cardMM: number;

  @Column({ type: 'integer' })
  cardYY: number;

  @Column({ type: 'integer' })
  cardCVV: number;
}
