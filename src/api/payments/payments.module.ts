import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsEntity } from 'src/core/entities/payments.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { UserEntity } from 'src/core/entities/users.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsEntity, TicketsEntity, UserEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
