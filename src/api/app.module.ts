/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';

import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { CompaniesModule } from './companies/companies.module';
import { ClassesModule } from './classes/classes.module';
import { NewsModule } from './news/news.module';
import { CitiesModule } from './cities/cities.module';
import { PlanesModule } from './planes/planes.module';
import { AirportsModule } from './airports/airports.module';
import { SeatsModule } from './seats/seats.module';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { LoyaltyProgramModule } from './loyalty-program/loyalty-program.module';

import { config } from './../common/config';
import { HealthModule } from './../health/health.module';

const logger = new Logger('AppModule');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [() => config],
      cache: true,
      expandVariables: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get<string>('PG_HOST'),
          port: configService.get<number>('PG_PORT'),
          username: configService.get<string>('PG_USER'),
          password: configService.get<string>('PG_PASS'),
          database: configService.get<string>('PG_DB'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          autoLoadEntities: true,
          logging: configService.get<string>('NODE_ENV') === 'development',
          ssl:
            configService.get<string>('NODE_ENV') === 'production'
              ? { rejectUnauthorized: false }
              : false,
          poolSize: 10,
          connectTimeoutMS: 10000,
          maxQueryExecutionTime: 5000,
        };

        logger.log(
          `Database connection initialized: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
        );

        return dbConfig;
      },
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    TerminusModule,
    HealthModule,
    UsersModule,
    LoyaltyProgramModule,
    PaymentsModule,
    CountriesModule,
    CitiesModule,
    AirportsModule,
    CompaniesModule,
    ClassesModule,
    PlanesModule,
    SeatsModule,
    FlightsModule,
    TicketsModule,
    NewsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const env = this.configService.get<string>('NODE_ENV') || 'development';
    logger.log(`Application starting in ${env.toUpperCase()} mode`);
  }
}
