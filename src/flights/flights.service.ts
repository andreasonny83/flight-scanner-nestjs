import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import departureMock from './__fixtures__/create-itinerary.json';
import returnMock from './__fixtures__/return-itinerary.json';
import {
  FilterTimesOptions,
  FindFlightLegs,
  FlightContent,
  FlightContentLeg,
  FlightContentLegs,
  FlightContentLegWithPrices,
  FlightContentPlace,
  FlightContentPlaces,
  FlightItineraries,
  FlightItinerary,
  FlightItineraryWithPrice,
  PlaceTypes,
  SearchInput,
} from './types';

interface CreateResponse {
  sessionToken: string;
  status: 'RESULT_STATUS_INCOMPLETE' | 'RESULT_STATUS_COMPLETE';
  action: string;
  content: FlightContent;
}

@Injectable()
export class FlightsService {
  #key: string;
  #baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.#key = process.env.SEARCH_FLIGHTS_API_KEY;
    this.#baseUrl = process.env.SEARCH_FLIGHTS_URL;
  }

  private async poll(sessionToken: string) {
    const pollUrl = `${this.#baseUrl}/flights/live/search/poll/${sessionToken}`;

    try {
      const guid = uuidv4();
      console.log('waiting 3 sec...');
      await new Promise((resolve) => setTimeout(() => resolve(''), 3000));

      const res = await this.httpService.axiosRef.post<CreateResponse>(pollUrl, null, {
        headers: {
          'x-api-key': this.#key,
          'User-Agent': `${guid}`,
        },
      });

      if (res.status === 200) {
        if (res.data.status === 'RESULT_STATUS_INCOMPLETE') {
          console.log('Result status incomplete. starting over...');
          return this.poll(res.data.sessionToken);
        }

        return res.data.content;
      }

      throw Error('Bad results');
    } catch (err) {
      if (err.response.status === 429) {
        console.log('Too many requests. Trying again...');
        return this.poll(sessionToken);
      }

      console.log(err?.response?.statusText || err);

      return null;
    }
  }

  private async create(
    originId: string,
    destId: string,
    year: number,
    month: number,
    day: number,
    currency: string,
    market: string,
    locale: string,
  ): Promise<FlightContent> {
    const createUrl = `${this.#baseUrl}/flights/live/search/create`;
    const guid = uuidv4();
    const adults = 1;
    const cabinClass:
      | 'CABIN_CLASS_UNSPECIFIED'
      | 'CABIN_CLASS_ECONOMY'
      | 'CABIN_CLASS_PREMIUM_ECONOMY'
      | 'CABIN_CLASS_BUSINESS'
      | 'CABIN_CLASS_FIRST' = 'CABIN_CLASS_ECONOMY';

    const req = {
      query: {
        market,
        locale,
        currency,
        query_legs: [
          {
            origin_place_id: {
              iata: originId,
            },
            destination_place_id: {
              iata: destId,
            },
            date: { year, month, day },
          },
        ],
        adults,
        cabinClass,
        nearbyAirports: false,
      },
    };

    try {
      const res = await this.httpService.axiosRef.post<CreateResponse>(
        createUrl,
        JSON.stringify(req),
        {
          headers: {
            Accept: '*/*',
            'x-api-key': this.#key,
            'Content-type': 'application/json',
            'User-Agent': `${guid}`,
          },
        },
      );

      if (res.status === 200) {
        return this.poll(res.data.sessionToken);
      }
      throw Error('Bad results');
    } catch (err) {
      console.log(err);

      return null;
    }
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
  ): FlightContentLeg[] {
    const filteredLegs: FlightContentLeg[] = Object.keys(legs)
      .filter(
        (leg) =>
          originIds.includes(legs[leg].originPlaceId) &&
          destinationIds.includes(legs[leg].destinationPlaceId) &&
          legs[leg].stopCount <= maxStopCount,
      )
      .map((leg) => ({ ...legs[leg], itineraryId: `${leg}` }));

    return filteredLegs;
  }

  filterTimes(legs: FlightContentLeg[], options: FilterTimesOptions) {
    const {
      earliestDepartureTime: earlDep,
      latestDepartureTime: latDep,
      earliestArrTime: earlArr,
      latestArrTime: latArr,
    } = options;
    const [earlDepHour, earlDepMin] = earlDep?.split('-') || [];
    const [latDepHour, latDepMin] = latDep?.split('-') || [];
    const [earlArrHour, earlArrMin] = earlArr?.split('-') || [];
    const [latArrHour, latArrMin] = latArr?.split('-') || [];
    const earlDepTime = Number(`${earlDepHour}${earlDepMin}`);
    const latDepTime = Number(`${latDepHour}${latDepMin}`);
    const earlArrTime = Number(`${earlArrHour}${earlArrMin}`);
    const latArrTime = Number(`${latArrHour}${latArrMin}`);

    return legs.filter((leg) => {
      const depTimeMin = `${leg.arrivalDateTime.minute}`;
      const depTimeMinFormat = depTimeMin.length < 2 ? `0${depTimeMin}` : depTimeMin;
      const depTime = Number(`${leg.departureDateTime.hour}${depTimeMinFormat}`);
      const arrTimeMin = `${leg.arrivalDateTime.minute}`;
      const arrTimeMinFormat = arrTimeMin.length < 2 ? `0${arrTimeMin}` : arrTimeMin;
      const arrTime = Number(`${leg.arrivalDateTime.hour}${arrTimeMinFormat}`);

      const earlDepCheck = earlDep ? depTime >= earlDepTime : true;
      const latDepCheck = latDep ? depTime <= latDepTime : true;
      const earlArrCheck = earlArr ? arrTime >= earlArrTime : true;
      const latArrCheck = latArr ? arrTime <= latArrTime : true;

      return earlDepCheck && latDepCheck && earlArrCheck && latArrCheck;
    });
  }

  findFlightLegs({
    flightContent,
    destinationIata,
    originIata,
    earliestDepartureTime: earlDep,
    latestDepartureTime: latDep,
    earliestArrivalTime: earlArr,
    latestArrivalTime: latArr,
    maxStops,
  }: FindFlightLegs): FlightContentLeg[] {
    const legs = flightContent.results.legs;
    const places = flightContent.results.places;

    const originAirports = this.findSelectedAirports(originIata, places);
    const destinationAirports = this.findSelectedAirports(destinationIata, places);
    const originIds = originAirports.map((airport) => airport.entityId);
    const destinationIds = destinationAirports.map((airport) => airport.entityId);

    const filterLegsByAirports: FlightContentLeg[] = this.filterLegsByAirport(
      legs,
      originIds,
      destinationIds,
      maxStops,
    );

    const filterByTimes = this.filterTimes(filterLegsByAirports, {
      earliestDepartureTime: earlDep,
      latestDepartureTime: latDep,
      earliestArrTime: earlArr,
      latestArrTime: latArr,
    });

    return filterByTimes;
  }

  extractDate(inputDate: string): number[] {
    return inputDate.split('-').map((digit) => Number(digit));
  }

  addMatchingPrices(
    itineraries: FlightItineraries,
    flightContent: FlightContentLeg[],
  ): FlightContentLegWithPrices[] {
    const departureFlights = flightContent.flatMap((content) => {
      const { pricingOptions } = itineraries[content.itineraryId];
      const prices = pricingOptions.flatMap((pricingOption) =>
        pricingOption.items.map((pricingOptionItem) => {
          const { amount, unit } = pricingOptionItem.price;
          const unitFactors = {
            PRICE_UNIT_CENTI: 100,
            PRICE_UNIT_MILLI: 1000,
            PRICE_UNIT_MICRO: 1000000,
          };

          const totAmount = unit in unitFactors ? `${Number(amount) / unitFactors[unit]}` : amount;

          return {
            deepLink: pricingOptionItem.deepLink,
            price: totAmount,
          };
        }),
      );

      return prices.flatMap((price) => ({
        ...content,
        ...price,
      }));
    });

    return departureFlights;
  }

  createItineraries(
    depContent: FlightContentLegWithPrices[],
    retContent: FlightContentLegWithPrices[],
  ): FlightItineraryWithPrice[] {
    return depContent.flatMap((departureContent) =>
      retContent.map((returnContent) => ({
        departure: departureContent,
        return: returnContent,
        totPrice: `${+departureContent.price + +returnContent.price}`,
      })),
    );
  }

  filterItinerariesByPrices(
    itineraries: FlightItineraryWithPrice[],
    maxPrice?: string,
  ): FlightItineraryWithPrice[] {
    return (
      (maxPrice && itineraries.filter((itinerary) => +itinerary.totPrice <= +maxPrice)) ||
      itineraries
    );
  }

  async fetchData({
    originIata,
    destinationIata,
    depYear,
    retYear,
    depMonth,
    retMonth,
    depDay,
    retDay,
    currency,
    market,
    locale,
  }): Promise<[FlightContent, FlightContent]> {
    if (process.env.MOCK === 'true') {
      console.log('Returning Mock data');

      const depMock = JSON.parse(JSON.stringify(departureMock.content)) as FlightContent;
      const retMock = JSON.parse(JSON.stringify(returnMock.content)) as FlightContent;

      return Promise.all([depMock, retMock]);
    }

    return Promise.all([
      this.create(originIata, destinationIata, depYear, depMonth, depDay, currency, market, locale),
      this.create(destinationIata, originIata, retYear, retMonth, retDay, currency, market, locale),
    ]);
  }

  async search(input: SearchInput) {
    const { originIata, destinationIata, maxStops, departureDate, returnDate } = input;
    const [depYear, depMonth, depDay] = this.extractDate(departureDate);
    const [retYear, retMonth, retDay] = returnDate
      ? this.extractDate(returnDate)
      : this.extractDate(departureDate);
    const currency = 'GBP';
    const market = 'UK';
    const locale = 'en-GB';

    const [departureFlightContent, returnFlightContent] = await this.fetchData({
      originIata,
      destinationIata,
      depYear,
      retYear,
      depMonth,
      retMonth,
      depDay,
      retDay,
      currency,
      market,
      locale,
    });

    console.log('All flying data correctly fetched.');

    const departureMatches = this.findFlightLegs({
      originIata,
      destinationIata,
      flightContent: departureFlightContent,
      maxStops: maxStops && Number(maxStops),
      earliestArrivalTime: input.earliestDepartureArrivalTime,
      latestArrivalTime: input.latestDepartureArrivalTime,
    });

    const returnMatches = this.findFlightLegs({
      originIata: destinationIata,
      destinationIata: originIata,
      flightContent: returnFlightContent,
      maxStops: maxStops && Number(maxStops),
      earliestDepartureTime: input.earliestReturnLeaveTime,
      latestDepartureTime: input.latestReturnLeaveTime,
    });

    const depFlightsWithPrices = this.addMatchingPrices(
      departureFlightContent.results.itineraries,
      departureMatches,
    );
    const retFlightsWithPrices = this.addMatchingPrices(
      returnFlightContent.results.itineraries,
      returnMatches,
    );

    const itineraries = this.createItineraries(depFlightsWithPrices, retFlightsWithPrices);
    const filteredItinerariesByPrices = this.filterItinerariesByPrices(
      itineraries,
      input.maxTotPrice,
    );

    return JSON.stringify(filteredItinerariesByPrices, null, 2);
    // return JSON.stringify(
    //   { departureMatches: depFlightsWithPrices, returnMatches: retFlightsWithPrices },
    //   null,
    //   2,
    // );
  }
}
