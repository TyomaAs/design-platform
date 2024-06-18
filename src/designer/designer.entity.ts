import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioEntity } from 'src/portfolio/portfolio.entity';

@Entity('designer')
export class DesignerEntity {
  @PrimaryGeneratedColumn() // primary key
  id: number;

  @Column({ type: 'integer' })
  salary: number;

  @Column({ type: 'varchar' })
  major: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  placeEducation: string;

  @Column({ type: 'integer' })
  experience: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  sex: string;

  @OneToOne(() => PortfolioEntity, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio' })
  idPortfolio: DesignerEntity;
}
