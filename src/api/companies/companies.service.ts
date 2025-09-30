import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/core/entities/companies.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companyRepository: Repository<CompaniesEntity>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    Object.assign(company, updateCompanyDto);
    return this.companyRepository.save(company);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.companyRepository.delete(id);
    return {
      message: `Company with ID "${id}" has been successfully deleted.`,
    };
  }
}
