import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(SeatsEntity)
    private readonly seatRepository: Repository<SeatsEntity>,
    @InjectRepository(FlightsEntity)
    private readonly flightRepository: Repository<FlightsEntity>,
    @InjectRepository(TicketsEntity)
    private readonly ticketRepository: Repository<TicketsEntity>,
  ) {}
  create(createSeatDto: CreateSeatDto) {
    const seat = this.seatRepository.create(createSeatDto);
    return this.seatRepository.save(seat);
  }

  findAll() {
    return this.seatRepository.find();
  }

  async findOne(id: string) {
    const seat = await this.seatRepository.findOneBy({ id });
    if (!seat) {
      throw new NotFoundException(`Seat with ID "${id}" not found`);
    }
    return seat;
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    const seat = await this.findOne(id);
    Object.assign(seat, updateSeatDto);
    return this.seatRepository.save(seat);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.seatRepository.delete(id);
    return { message: `Seat with ID "${id}" has been successfully deleted.` };
  }

  async getSeatsForFlight(flightId: string) {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
      relations: ['plane', 'plane.seats'],
    });

    if (!flight) {
      throw new NotFoundException(`Flight with ID "${flightId}" not found.`);
    }

    const tickets = await this.ticketRepository.find({
      where: { flightId: flightId },
      select: ['seatId'],
    });

    const bookedSeatIds = new Set(tickets.map((t) => t.seatId));

    return flight.plane.seats.map((seat) => ({
      ...seat,
      is_available: !bookedSeatIds.has(seat.id),
    }));
  }
}
