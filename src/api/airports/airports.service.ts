import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportsEntity } from 'src/core/entities/airports.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(AirportsEntity)
    private readonly airportRepository: Repository<AirportsEntity>,
  ) {}
  create(createAirportDto: CreateAirportDto) {
    const airport = this.airportRepository.create(createAirportDto);
    return this.airportRepository.save(airport);
  }

  findAll() {
    return this.airportRepository.find();
  }

  async findOne(id: string) {
    const airport = await this.airportRepository.findOneBy({ id });
    if (!airport) {
      throw new NotFoundException(`Airport with ID "${id}" not found`);
    }
    return airport;
  }

  async update(id: string, updateAirportDto: UpdateAirportDto) {
    const airport = await this.findOne(id);
    Object.assign(airport, updateAirportDto);
    return this.airportRepository.save(airport);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.airportRepository.delete(id);
    return {
      message: `Airport with ID "${id}" has been successfully deleted.`,
    };
  }
}
