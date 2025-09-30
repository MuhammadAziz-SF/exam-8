import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service.js';
import { LoyaltyProgramController } from './loyalty-program.controller.js';

@Module({
  controllers: [LoyaltyProgramController],
  providers: [LoyaltyProgramService],
})
export class LoyaltyProgramModule {}
