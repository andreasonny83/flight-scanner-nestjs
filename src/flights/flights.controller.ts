import { Controller, Get, Header, Query } from '@nestjs/common';

import { FlightsService } from './flights.service';
import { SearchInput } from './types';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  /**
   *
   * @param input
   * eg. ?originIata=STN&destinationIata=ROM&2023-05-01&returnDate=2023-05-01
   * @returns
   */
  @Get('/search-flights')
  @Header('Content-Type', 'application/json')
  searchFlights(@Query() input: SearchInput): any {
    if (!input.departureDate) {
      return {
        error: 'Missing required query parameter',
        message: "The 'departureDate' query parameter is required but was not provided.",
      };
    }
    if (!input.originIata) {
      return {
        error: 'Missing required query parameter',
        message: "The 'originIata' query parameter is required but was not provided.",
      };
    }
    if (!input.destinationIata) {
      return {
        error: 'Missing required query parameter',
        message: "The 'destinationIata' query parameter is required but was not provided.",
      };
    }
    return this.flightsService.search(input);
  }
}
