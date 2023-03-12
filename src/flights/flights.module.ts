import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

@Module({
  imports: [HttpModule],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
