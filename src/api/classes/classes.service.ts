import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassesEntity } from 'src/core/entities/classes.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassesEntity)
    private readonly classRepository: Repository<ClassesEntity>,
  ) {}
  create(createClassDto: CreateClassDto) {
    const travelClass = this.classRepository.create(createClassDto);
    return this.classRepository.save(travelClass);
  }

  findAll() {
    return this.classRepository.find();
  }

  async findOne(id: string) {
    const travelClass = await this.classRepository.findOneBy({ id });
    if (!travelClass) {
      throw new NotFoundException(`Class with ID "${id}" not found`);
    }
    return travelClass;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const travelClass = await this.findOne(id);
    Object.assign(travelClass, updateClassDto);
    return this.classRepository.save(travelClass);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.classRepository.delete(id);
    return { message: `Class with ID "${id}" has been successfully deleted.` };
  }
}
