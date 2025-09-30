import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanesEntity } from 'src/core/entities/planes.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(PlanesEntity)
    private readonly planeRepository: Repository<PlanesEntity>,
    @InjectRepository(SeatsEntity)
    private readonly seatRepository: Repository<SeatsEntity>,
  ) {}
  async create(createPlaneDto: CreatePlaneDto) {
    const newPlane = this.planeRepository.create(createPlaneDto);
    const savedPlane = await this.planeRepository.save(newPlane);

    const seatsToCreate: Partial<SeatsEntity>[] = [];
    const seatChars = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numRows = Math.ceil(savedPlane.capacity / seatChars.length);

    for (let row = 1; row <= numRows; row++) {
      for (const seatChar of seatChars) {
        if (seatsToCreate.length < savedPlane.capacity) {
          seatsToCreate.push({
            planeId: savedPlane.id,
            seatNumber: `${row}${seatChar}`,
          });
        }
      }
    }

    await this.seatRepository.save(seatsToCreate);
    return savedPlane;
  }

  findAll() {
    return this.planeRepository.find();
  }

  async findOne(id: string) {
    const plane = await this.planeRepository.findOneBy({ id });
    if (!plane) {
      throw new NotFoundException(`Plane with ID "${id}" not found`);
    }
    return plane;
  }

  async update(id: string, updatePlaneDto: UpdatePlaneDto) {
    const plane = await this.findOne(id);
    Object.assign(plane, updatePlaneDto);
    return this.planeRepository.save(plane);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.planeRepository.delete(id);
    return { message: `Plane with ID "${id}" has been successfully deleted.` };
  }
}
