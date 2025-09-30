import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsEntity } from 'src/core/entities/payments.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { UserEntity } from 'src/core/entities/users.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
    @InjectRepository(TicketsEntity)
    private readonly ticketRepository: Repository<TicketsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { ticketId } = createPaymentDto;
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (!ticket) {
      throw new BadRequestException(`Ticket with ID "${ticketId}" not found.`);
    }

    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find();
  }

  async findOne(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException(`Payment with ID "${id}" not found`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    if (updatePaymentDto.ticketId) {
      const ticket = await this.ticketRepository.findOneBy({
        id: updatePaymentDto.ticketId,
      });
      if (!ticket) {
        throw new BadRequestException(
          `Ticket with ID "${updatePaymentDto.ticketId}" not found.`,
        );
      }
    }
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.paymentRepository.delete(id);
    return { message: `Payment with ID "${id}" has been successfully deleted.` };
  }
}
