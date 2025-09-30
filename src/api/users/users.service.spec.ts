import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/core/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

jest.mock('src/infrastructure/bcrypt');

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral = any,
>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new user with a hashed password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        passportNumber: 'A123',
        nationality: 'Testland',
        dateOfBirth: '2000-01-01',
      };
      const hashedPassword = 'hashedPassword';
      const userEntity = {
        ...createUserDto,
        id: 'some-uuid',
        role: 'passenger',
      };
      const savedUser = { ...userEntity, password: hashedPassword };
      const { password, ...result } = savedUser;

      (BcryptEncryption.encrypt as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.create!.mockReturnValue(userEntity);
      userRepository.save!.mockResolvedValue(savedUser);

      const createdUser = await service.create(createUserDto);

      expect(BcryptEncryption.encrypt).toHaveBeenCalledWith('password123');
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(userRepository.save).toHaveBeenCalledWith(userEntity);
      expect(createdUser).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users without passwords', async () => {
      const users = [
        { id: '1', email: 'test1@example.com', password: 'p1' },
        { id: '2', email: 'test2@example.com', password: 'p2' },
      ];
      userRepository.find!.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual([
        { id: '1', email: 'test1@example.com' },
        { id: '2', email: 'test2@example.com' },
      ]);
    });
  });

  describe('findOne', () => {
    it('should find and return a user by ID without password', async () => {
      const user = { id: '1', email: 'test@example.com', password: 'p1' };
      userRepository.findOneBy!.mockResolvedValue(user);

      const result = await service.findOne('1');
      const { password, ...expected } = user;

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException if user is not found', async () => {
      userRepository.findOneBy!.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user and return it without password', async () => {
      const updateUserDto: UpdateUserDto = { firstName: 'Updated' };
      const existingUser = { id: '1', firstName: 'Test', password: 'p1' };
      const updatedUser = { ...existingUser, ...updateUserDto };

      userRepository.findOneBy!.mockResolvedValue(existingUser);
      userRepository.save!.mockResolvedValue(updatedUser);

      const result = await service.update('1', updateUserDto);
      const { password, ...expected } = updatedUser;

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ firstName: 'Updated' }),
      );
      expect(result).toEqual(expected);
    });

    it('should hash password if it is provided in update DTO', async () => {
      const updateUserDto: UpdateUserDto = { password: 'newPassword' };
      const existingUser = { id: '1', password: 'p1' };
      const hashedPassword = 'hashedNewPassword';

      (BcryptEncryption.encrypt as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.findOneBy!.mockResolvedValue(existingUser);
      userRepository.save!.mockResolvedValue({
        ...existingUser,
        password: hashedPassword,
      });

      await service.update('1', updateUserDto);

      expect(BcryptEncryption.encrypt).toHaveBeenCalledWith('newPassword');
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ password: hashedPassword }),
      );
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      userRepository.findOneBy!.mockResolvedValue(null);
      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user and return a success message', async () => {
      const user = { id: '1' };
      userRepository.findOneBy!.mockResolvedValue(user);
      userRepository.delete!.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(userRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: `User with ID "1" has been successfully deleted.`,
      });
    });

    it('should throw NotFoundException if user to remove is not found', async () => {
      userRepository.findOneBy!.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
