import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesEntity } from 'src/core/entities/cities.entity';
import { CountriesEntity } from 'src/core/entities/countries.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CitiesEntity)
    private readonly cityRepository: Repository<CitiesEntity>,
    @InjectRepository(CountriesEntity)
    private readonly countryRepository: Repository<CountriesEntity>,
  ) {}

  private async validateCountry(countryId: string) {
    const country = await this.countryRepository.findOneBy({ id: countryId });
    if (!country) {
      throw new BadRequestException(
        `Country with ID "${countryId}" not found.`,
      );
    }
  }

  async create(createCityDto: CreateCityDto) {
    await this.validateCountry(createCityDto.countryId);
    const city = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(city);
  }

  findAll() {
    return this.cityRepository.find();
  }

  async findOne(id: string) {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`City with ID "${id}" not found`);
    }
    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    if (updateCityDto.countryId) {
      await this.validateCountry(updateCityDto.countryId);
    }
    const city = await this.findOne(id);
    Object.assign(city, updateCityDto);
    return this.cityRepository.save(city);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.cityRepository.delete(id);
    return { message: `City with ID "${id}" has been successfully deleted.` };
  }
}
