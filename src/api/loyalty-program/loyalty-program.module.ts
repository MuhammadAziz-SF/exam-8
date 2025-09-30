import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgramEntity } from 'src/core/entities/loyalty-programm.entity';
import { UserEntity } from 'src/core/entities/users.entity';
import { LoyaltyProgramService } from './loyalty-program.service';
import { LoyaltyProgramController } from './loyalty-program.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyProgramEntity, UserEntity])],
  controllers: [LoyaltyProgramController],
  providers: [LoyaltyProgramService],
})
export class LoyaltyProgramModule {}
