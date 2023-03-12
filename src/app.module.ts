import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { SonnyService } from './sonny/sonny.service';

@Module({
  imports: [ConfigModule.forRoot(), FlightsModule, TerminusModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, SonnyService],
})
export class AppModule {}
