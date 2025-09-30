import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { enums } from 'src/common';
import { TicketsEntity } from './tickets.entity';
import { UserEntity } from './users.entity';

@Entity({ name: 'payments' })
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

  @Column({ type: 'uuid', nullable: true })
  processedBy: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => TicketsEntity, (t) => t.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketsEntity;

  @ManyToOne(() => UserEntity, (u) => u.paymentsprocessed, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'processedBy' })
  payedBy: UserEntity;
}
