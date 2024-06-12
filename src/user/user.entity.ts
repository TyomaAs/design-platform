/* eslint-disable @typescript-eslint/no-unused-vars */
import { DesignerEntity } from 'src/designer/designer.entity';
import { PortfolioEntity } from 'src/portfolio/portfolio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn() // primary key
  id: number;

  @Column({ type: 'varchar' }) // simple column
  email: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;

  @Column({ type: 'varchar' })
  avatarURL: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'integer', nullable: true })
  rating: number;

  @OneToOne(() => DesignerEntity, (designer) => designer.id)
  @JoinColumn({ name: 'designer' })
  idDesigner: DesignerEntity;
}
