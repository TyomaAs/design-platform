import { DesignerEntity } from 'src/designer/designer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  imgURL: string;

  @ManyToOne(() => DesignerEntity, (designer) => designer.id)
  @JoinColumn({ name: 'idDesigner' })
  designer: DesignerEntity;

  @Column({ type: 'integer' })
  idDesigner: number;
}
