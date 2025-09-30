import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketsEntity)
    private readonly ticketRepository: Repository<TicketsEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const { flightId, seatId } = createTicketDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const flight = await queryRunner.manager.findOneBy(FlightsEntity, {
        id: flightId,
      });
      if (!flight) {
        throw new NotFoundException(`Flight with ID "${flightId}" not found.`);
      }

      const seat = await queryRunner.manager.findOneBy(SeatsEntity, {
        id: seatId,
      });
      if (!seat) {
        throw new NotFoundException(`Seat with ID "${seatId}" not found.`);
      }

      const existingTicket = await queryRunner.manager.findOne(TicketsEntity, {
        where: { flightId, seatId },
      });

      if (existingTicket) {
        throw new ConflictException(
          `Seat ${seat.seatNumber} is already booked for this flight.`,
        );
      }

      const newTicket = queryRunner.manager.create(TicketsEntity, {
        ...createTicketDto,
        bookingReference: Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase(),
      });

      const savedTicket = await queryRunner.manager.save(newTicket);
      await queryRunner.commitTransaction();
      return savedTicket;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.ticketRepository.find();
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.ticketRepository.delete(id);
    return { message: `Ticket with ID "${id}" has been successfully deleted.` };
  }
}
