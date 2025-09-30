import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { AirportsEntity } from 'src/core/entities/airports.entity';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { PlanesEntity } from 'src/core/entities/planes.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightSearchDto } from './dto/flight-search.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(FlightsEntity)
    private readonly flightRepository: Repository<FlightsEntity>,
    @InjectRepository(PlanesEntity)
    private readonly planeRepository: Repository<PlanesEntity>,
    @InjectRepository(AirportsEntity)
    private readonly airportRepository: Repository<AirportsEntity>,
  ) {}
  async create(createFlightDto: CreateFlightDto) {
    const {
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      planeId,
    } = createFlightDto;

    if (departureAirport === arrivalAirport) {
      throw new BadRequestException(
        'Departure and arrival airports cannot be the same.',
      );
    }

    if (new Date(departureTime) >= new Date(arrivalTime)) {
      throw new BadRequestException(
        'Departure time must be before arrival time.',
      );
    }

    const plane = await this.planeRepository.findOneBy({ id: planeId });
    if (!plane) {
      throw new NotFoundException(`Plane with ID "${planeId}" not found.`);
    }

    const depAirport = await this.airportRepository.findOneBy({
      id: departureAirport,
    });
    if (!depAirport) {
      throw new NotFoundException(
        `Departure airport with ID "${departureAirport}" not found.`,
      );
    }

    const arrAirport = await this.airportRepository.findOneBy({
      id: arrivalAirport,
    });
    if (!arrAirport) {
      throw new NotFoundException(
        `Arrival airport with ID "${arrivalAirport}" not found.`,
      );
    }

    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }

  findAll() {
    return this.flightRepository.find();
  }

  async findOne(id: string) {
    const flight = await this.flightRepository.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException(`Flight with ID "${id}" not found`);
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    const flight = await this.findOne(id);
    Object.assign(flight, updateFlightDto);
    return this.flightRepository.save(flight);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.flightRepository.delete(id);
    return { message: `Flight with ID "${id}" has been successfully deleted.` };
  }

  async search(searchDto: FlightSearchDto) {
    const { departureAirport, arrivalAirport, date } = searchDto;
    const where: FindOptionsWhere<FlightsEntity> = {};

    if (departureAirport) where.departureAirport = departureAirport;
    if (arrivalAirport) where.arrivalAirport = arrivalAirport;
    if (date) {
      where.departureTime = Between(
        new Date(`${date}T00:00:00Z`),
        new Date(`${date}T23:59:59Z`),
      );
    }

    return this.flightRepository.find({ where });
  }
}
