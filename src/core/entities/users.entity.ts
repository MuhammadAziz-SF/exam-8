import { enums } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoyaltyProgramEntity } from './loyalty-programm.entity';
import { NewsEntity } from './news.entity';
import { FlightsEntity } from './flights.entity';
import { TicketsEntity } from './tickets.entity';
import { ReviewsEntity } from './reviews.entity';
import { PaymentsEntity } from './payments.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: enums.user_roles,
    default: enums.user_roles.PASSENGER,
  })
  role: enums.user_roles;

  @Column({ type: 'varchar' })
  passportNumber: string;

  @Column({ type: 'varchar' })
  nationality: string;

  @Column({ type: 'varchar' })
  dateOfBirth: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => LoyaltyProgramEntity, (l) => l.user)
  loyaltyProgram: LoyaltyProgramEntity;

  @OneToMany(() => NewsEntity, (news) => news.user)
  news: NewsEntity[];

  @OneToOne(() => FlightsEntity, (f) => f.byCreated)
  byCreated: FlightsEntity;

  @OneToOne(() => FlightsEntity, (f) => f.byUpdated)
  byUpdated: FlightsEntity;

  @OneToOne(() => TicketsEntity, (t) => t.user, { cascade: true })
  ticket: TicketsEntity;

  @OneToMany(() => ReviewsEntity, (r) => r.user, { cascade: true })
  reviews: ReviewsEntity[];

  @OneToOne(() => PaymentsEntity, (p) => p.payedBy, { cascade: true })
  payedBy: PaymentsEntity;
}
