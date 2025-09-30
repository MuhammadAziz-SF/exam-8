import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyProgramEntity } from 'src/core/entities/loyalty-programm.entity';
import { UserEntity } from 'src/core/entities/users.entity';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto';
import { UpdateLoyaltyProgramDto } from './dto/update-loyalty-program.dto';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    @InjectRepository(LoyaltyProgramEntity)
    private readonly loyaltyProgramRepository: Repository<LoyaltyProgramEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    const { userId } = createLoyaltyProgramDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException(`User with ID "${userId}" not found.`);
    }

    const existingAccount = await this.loyaltyProgramRepository.findOneBy({
      userId,
    });
    if (existingAccount) {
      throw new ConflictException(
        `User with ID "${userId}" already has a loyalty account.`,
      );
    }

    const loyaltyProgram = this.loyaltyProgramRepository.create(
      createLoyaltyProgramDto,
    );
    return this.loyaltyProgramRepository.save(loyaltyProgram);
  }

  findAll() {
    return this.loyaltyProgramRepository.find();
  }

  async findOne(id: string) {
    const loyaltyProgram = await this.loyaltyProgramRepository.findOneBy({
      id,
    });
    if (!loyaltyProgram) {
      throw new NotFoundException(
        `Loyalty program entry with ID "${id}" not found`,
      );
    }
    return loyaltyProgram;
  }

  async update(id: string, updateLoyaltyProgramDto: UpdateLoyaltyProgramDto) {
    const loyaltyProgram = await this.findOne(id);
    Object.assign(loyaltyProgram, updateLoyaltyProgramDto);
    return this.loyaltyProgramRepository.save(loyaltyProgram);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.loyaltyProgramRepository.delete(id);
    return {
      message: `Loyalty program entry with ID "${id}" has been successfully deleted.`,
    };
  }
}
