import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { enums } from 'src/common';
import { TicketsEntity } from './tickets.entity';
import { UserEntity } from './users.entity';

@Entity({ name: 'planes' })
export class PaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  ticketId: string;

  @Column({ type: 'varchar' })
  amount: string;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({
    type: 'enum',
    enum: enums.payment_status,
    default: enums.payment_status.PENDING,
  })
  paymentStatus: enums.payment_status;

  @Column({ type: 'varchar' })
  paymentMethod: string;

  @Column({ type: 'varchar' })
  processedBy: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => TicketsEntity, (t) => t.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketsEntity;

  @OneToOne(() => UserEntity, (u) => u.payedBy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'processedBy' })
  payedBy: UserEntity;
}
