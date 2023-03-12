import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import mockData from './__fixtures__/create-itinerary.json';
import {
  FlightContent,
  FlightContentLegs,
  FlightContentPlace,
  FlightContentPlaces,
  PlaceTypes,
} from './types';

@Injectable()
export class FlightsService {
  #key: string;
  #baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.#key = process.env.SEARCH_FLIGHTS_API_KEY;
    this.#baseUrl = process.env.SEARCH_FLIGHTS_URL;
  }

  private async create() {
    const createUrl = `${this.#baseUrl}/flights/live/search/create`;
    const req = {
      query: {
        market: 'UK',
        locale: 'en-GB',
        currency: 'GBP',
        query_legs: [
          {
            origin_place_id: {
              iata: 'STN',
            },
            destination_place_id: {
              iata: 'CIA',
            },
            date: {
              year: 2023,
              month: 4,
              day: 22,
            },
          },
        ],
        adults: 1,
        // cabinClass: 'CABIN_CLASS_ECONOMY',
        // nearbyAirports: false,
      },
    };

    const res = await this.httpService.axiosRef.post(createUrl, JSON.stringify(req), {
      headers: {
        'x-api-key': this.#key,
        'Content-type': 'application/json',
      },
    });
    console.log(res.data);
    const sessionToken = res.data.sessionToken;
    const content = res.data.content;
  }

  findSelectedAirports(targetAirport: string, places: FlightContentPlaces): FlightContentPlace[] {
    const selectedAirport = Object.values(places).find((place) => place.iata === targetAirport);

    if (!selectedAirport) {
      return [];
    }

    if (selectedAirport.type === PlaceTypes.PLACE_TYPE_AIRPORT) {
      return [selectedAirport];
    }

    const searchSuitableAirports = Object.values(places).filter(
      (place) => place.parentId === selectedAirport.entityId,
    );

    const suitableAirports = searchSuitableAirports.length
      ? searchSuitableAirports
      : [selectedAirport];

    return suitableAirports;
  }

  filterLegsByAirport(
    legs: FlightContentLegs,
    originIds: string[],
    destinationIds: string[],
    maxStopCount = 0,
  ) {
    const filteredLegs = Object.values(legs).filter(
      (leg) =>
        originIds.includes(leg.originPlaceId) &&
        destinationIds.includes(leg.destinationPlaceId) &&
        maxStopCount === leg.stopCount,
    );

    return filteredLegs;
  }

  async findFlights(originIata: string, destinationIata: string) {
    const res = mockData;

    const sessionToken = res.sessionToken;
    const content = res.content as FlightContent;
    const legs = content.results.legs;
    const places = content.results.places;

    const originAirports = this.findSelectedAirports(originIata, places);
    const destinationAirports = this.findSelectedAirports(destinationIata, places);
    // const filteredLegs = this.filterLegsByAirport(legs, selectedAirports);
  }

  async search() {
    const originIata = 'STN';
    const destinationIata = 'ROM';
    await this.findFlights(originIata, destinationIata);
    return 'ok';
  }
}
