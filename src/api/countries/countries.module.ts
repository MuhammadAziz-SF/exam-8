import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/core/entities/countries.entity';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])],
  providers: [CountriesService],
})
export class CountriesModule {}
