import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/core/entities/companies.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity])],
  providers: [CompaniesService],
})
export class CompaniesModule {}
