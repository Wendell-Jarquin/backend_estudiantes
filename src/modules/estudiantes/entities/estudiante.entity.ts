import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sexo } from '../../sexos/entities/sexo.entity';
import { Etnia } from '../../etnias/entities/etnia.entity';

@Entity({ schema: 'estudiantes', name: 'estudiante' })
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'int4', nullable: false })
  etnia_id: number;

  @Column({ type: 'int4', nullable: false })
  sexo_id: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  nombres: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  paterno: string;

  @Column({ type: 'varchar', nullable: true, length: 30 })
  materno: string;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  direccion: string;

  @ManyToOne(() => Etnia)
  @JoinColumn({ name: 'etnia_id', referencedColumnName: 'id' })
  etnia: Etnia;

  @ManyToOne(() => Sexo)
  @JoinColumn({ name: 'sexo_id', referencedColumnName: 'id' })
  sexo: Sexo;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
