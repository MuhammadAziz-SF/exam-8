import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/core/entities/countries.entity';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly countryRepository: Repository<CountriesEntity>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  findAll() {
    return this.countryRepository.find();
  }

  async findOne(id: string) {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      throw new NotFoundException(`Country with ID "${id}" not found`);
    }
    return country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const country = await this.findOne(id);
    Object.assign(country, updateCountryDto);
    return this.countryRepository.save(country);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.countryRepository.delete(id);
    return {
      message: `Country with ID "${id}" has been successfully deleted.`,
    };
  }
}
