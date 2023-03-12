import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { FlightsService } from './flights.service';
import { FlightContentLegs, FlightContentPlace, FlightContentPlaces, PlaceTypes } from './types';

describe('FlightsService', () => {
  let service: FlightsService;
  const testCiampinoName = 'Rome Ciampino';
  const testCiampinoIata = 'CIA';
  const testFiumicinoIata = 'FCO';
  const testRomeIata = 'ROM';

  const mockPlaces: FlightContentPlaces = {
    '27539793': {
      entityId: '27539793',
      parentId: '29475393',
      name: 'Rome',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: testRomeIata,
    },
    '27540819': {
      entityId: '27540819',
      parentId: '29475381',
      name: 'Dortmund',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: 'DTM',
    },
    '27544008': {
      entityId: '27544008',
      parentId: '29475375',
      name: 'London',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: 'LON',
    },
    '27544068': {
      entityId: '27544068',
      parentId: '29475393',
      name: 'Milan',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: 'MIL',
    },
    '27545091': {
      entityId: '27545091',
      parentId: '29475385',
      name: 'Nice',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: 'NCE',
    },
    '27546033': {
      entityId: '27546033',
      parentId: '29475389',
      name: 'Prague',
      type: PlaceTypes.PLACE_TYPE_CITY,
      iata: 'PRG',
    },
    '29475375': {
      entityId: '29475375',
      parentId: '',
      name: 'United Kingdom',
      type: PlaceTypes.PLACE_TYPE_COUNTRY,
      iata: '',
    },
    '29475393': {
      entityId: '29475393',
      parentId: '',
      name: 'Italy',
      type: PlaceTypes.PLACE_TYPE_COUNTRY,
      iata: '',
    },
    '95565052': {
      entityId: '95565052',
      parentId: '27544008',
      name: 'London Stansted',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'STN',
    },
    '95565062': {
      entityId: '95565062',
      parentId: '27539793',
      name: testCiampinoName,
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: testCiampinoIata,
    },
    '95565065': {
      entityId: '95565065',
      parentId: '27539793',
      name: 'Rome Fiumicino',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: testFiumicinoIata,
    },
    '95565067': {
      entityId: '95565067',
      parentId: '27544068',
      name: 'Milan Linate',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'LIN',
    },
    '95565071': {
      entityId: '95565071',
      parentId: '27544068',
      name: 'Milan Bergamo',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'BGY',
    },
    '95565098': {
      entityId: '95565098',
      parentId: '27546294',
      name: 'Santander',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'SDR',
    },
    '95673860': {
      entityId: '95673860',
      parentId: '27545091',
      name: 'Nice',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'NCE',
    },
  };

  const mockLegs: FlightContentLegs = {
    '16574-2305310555--31915,-30727-1-11493-2305311310': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 5,
        minute: 55,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 13,
        minute: 10,
        second: 0,
      },
      durationInMinutes: 375,
      stopCount: 1,
    },
    '16574-2305310555--31915,-30727-1-11493-2305311410': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 5,
        minute: 55,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 14,
        minute: 10,
        second: 0,
      },
      durationInMinutes: 435,
      stopCount: 1,
    },
    '16574-2305310605--31915-0-10525-2305310930': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 6,
        minute: 5,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 9,
        minute: 30,
        second: 0,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305310635--31915,-31669-1-11493-2305311910': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 6,
        minute: 35,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 19,
        minute: 10,
        second: 0,
      },
      durationInMinutes: 695,
      stopCount: 1,
    },
    '16574-2305310815--31915,-31669-1-11493-2305311440': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 8,
        minute: 15,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 14,
        minute: 40,
        second: 0,
      },
      durationInMinutes: 325,
      stopCount: 1,
    },
    '16574-2305310850--31915-0-10525-2305311215': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 8,
        minute: 50,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 12,
        minute: 15,
        second: 0,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305310955--31915-1-11493-2305311620': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 9,
        minute: 55,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 16,
        minute: 20,
        second: 0,
      },
      durationInMinutes: 325,
      stopCount: 1,
    },
    '16574-2305311540--31915-0-10525-2305311905': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 15,
        minute: 40,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 19,
        minute: 5,
        second: 0,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305311815--31915,-31669-1-11493-2305312355': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 18,
        minute: 15,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 23,
        minute: 55,
        second: 0,
      },
      durationInMinutes: 280,
      stopCount: 1,
    },
    '16574-2305311830--31915-0-10525-2305312155': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 18,
        minute: 30,
        second: 0,
      },
      arrivalDateTime: {
        year: 2023,
        month: 5,
        day: 31,
        hour: 21,
        minute: 55,
        second: 0,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightsService],
      imports: [HttpModule],
    }).compile();

    service = module.get<FlightsService>(FlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findSelectedAirports', () => {
    it('should return the selected airport when provided', () => {
      const inputAirportIata = testCiampinoIata;
      const expectedAirportName = testCiampinoName;

      const res = service.findSelectedAirports(inputAirportIata, mockPlaces);

      expect(res.length).toBe(1);
      expect(res[0].iata).toEqual(inputAirportIata);
      expect(res[0].name).toEqual(expectedAirportName);
    });

    it('should return an empty array when an airport is not found', () => {
      const inputAirportIata = 'XXX';

      const res = service.findSelectedAirports(inputAirportIata, mockPlaces);

      expect(res.length).toBe(0);
    });

    it('should return a list of matching airports when a city is provided', () => {
      const inputAirportIata = testRomeIata;

      const res = service.findSelectedAirports(inputAirportIata, mockPlaces);

      expect(res.length).toBe(2);
      expect(res[0].iata).toEqual(testCiampinoIata);
      expect(res[1].iata).toEqual(testFiumicinoIata);
    });
  });

  describe('filterLegsByAirport', () => {
    it('should alway return something', () => {
      const testOriginIds = [];
      const testDestinationIds = [];

      const res = service.filterLegsByAirport(mockLegs, testOriginIds, testDestinationIds);

      expect(res).toBeDefined();
      expect(res.length).toBe(0);
    });

    it('should filter out the matching legs', () => {
      const testOriginIds = ['95565052'];
      const testDestinationIds = ['95565062', '95565065'];

      const res = service.filterLegsByAirport(mockLegs, testOriginIds, testDestinationIds, 0);

      expect(res.length).toBe(4);
      expect(res.length).toBeLessThan(Object.values(mockLegs).length);
    });

    it('should return the matching airport with 0 or 1 stop', () => {
      const testOriginIds = ['95565052'];
      const testDestinationIds = ['95565062', '95565065'];

      const zeroStopsRes = service.filterLegsByAirport(
        mockLegs,
        testOriginIds,
        testDestinationIds,
        0,
      );

      const res = service.filterLegsByAirport(mockLegs, testOriginIds, testDestinationIds, 1);

      expect(res.length).toBe(6);
      expect(res.length).toBeLessThan(Object.values(mockLegs).length);
      expect(zeroStopsRes.length).toBeLessThan(res.length);
    });
  });
});
