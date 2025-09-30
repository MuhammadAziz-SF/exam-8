import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from 'src/core/entities/cities.entity';
import { CountriesEntity } from 'src/core/entities/countries.entity';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity, CountriesEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
