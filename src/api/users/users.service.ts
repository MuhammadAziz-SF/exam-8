import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/entities/users.entity';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const hashedPassword = await BcryptEncryption.encrypt(
      createUserDto.password,
    );
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    const { password, ...result } = savedUser;
    return result;
  }

  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(id: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const { password, ...result } = user;
    return result;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await BcryptEncryption.encrypt(
        updateUserDto.password,
      );
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    await this.userRepository.delete(id);
    return { message: `User with ID "${id}" has been successfully deleted.` };
  }
}
