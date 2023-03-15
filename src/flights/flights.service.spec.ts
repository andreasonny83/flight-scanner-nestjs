import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import mockData from './__fixtures__/create-itinerary.json';
import { FlightsService } from './flights.service';
import {
  FlightContent,
  FlightContentLeg,
  FlightContentLegs,
  FlightContentPlaces,
  PlaceTypes,
  FindFlights,
} from './types';

describe('FlightsService', () => {
  let service: FlightsService;
  const testCiampinoName = 'Rome Ciampino';
  const testCiampinoId = '95565062';
  const testCiampinoIata = 'CIA';
  const testFiumicinoIata = 'FCO';
  const testRomeIata = 'ROM';
  const testStanstedId = '95565062';

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
      entityId: testStanstedId,
      parentId: '27544008',
      name: 'London Stansted',
      type: PlaceTypes.PLACE_TYPE_AIRPORT,
      iata: 'STN',
    },
    '95565062': {
      entityId: testCiampinoId,
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
        day: 31,
        hour: 5,
        minute: 55,
      },
      arrivalDateTime: {
        day: 31,
        hour: 13,
        minute: 10,
      },
      durationInMinutes: 375,
      stopCount: 1,
    },
    '16574-2305310555--31915,-30727-1-11493-2305311410': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        day: 31,
        hour: 5,
        minute: 55,
      },
      arrivalDateTime: {
        day: 31,
        hour: 14,
        minute: 10,
      },
      durationInMinutes: 435,
      stopCount: 1,
    },
    '16574-2305310605--31915-0-10525-2305310930': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        day: 31,
        hour: 6,
        minute: 5,
      },
      arrivalDateTime: {
        day: 31,
        hour: 9,
        minute: 30,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305310635--31915,-31669-1-11493-2305311910': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        day: 31,
        hour: 6,
        minute: 35,
      },
      arrivalDateTime: {
        day: 31,
        hour: 19,
        minute: 10,
      },
      durationInMinutes: 695,
      stopCount: 1,
    },
    '16574-2305310815--31915,-31669-1-11493-2305311440': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        day: 31,
        hour: 8,
        minute: 15,
      },
      arrivalDateTime: {
        day: 31,
        hour: 14,
        minute: 40,
      },
      durationInMinutes: 325,
      stopCount: 1,
    },
    '16574-2305310850--31915-0-10525-2305311215': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        day: 31,
        hour: 8,
        minute: 50,
      },
      arrivalDateTime: {
        day: 31,
        hour: 12,
        minute: 15,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305310955--31915-1-11493-2305311620': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        day: 31,
        hour: 9,
        minute: 55,
      },
      arrivalDateTime: {
        day: 31,
        hour: 16,
        minute: 20,
      },
      durationInMinutes: 325,
      stopCount: 1,
    },
    '16574-2305311540--31915-0-10525-2305311905': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        day: 31,
        hour: 15,
        minute: 40,
      },
      arrivalDateTime: {
        day: 31,
        hour: 19,
        minute: 5,
      },
      durationInMinutes: 145,
      stopCount: 0,
    },
    '16574-2305311815--31915,-31669-1-11493-2305312355': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565065',
      departureDateTime: {
        day: 31,
        hour: 18,
        minute: 15,
      },
      arrivalDateTime: {
        day: 31,
        hour: 23,
        minute: 55,
      },
      durationInMinutes: 280,
      stopCount: 1,
    },
    '16574-2305311830--31915-0-10525-2305312155': {
      originPlaceId: '95565052',
      destinationPlaceId: '95565062',
      departureDateTime: {
        day: 31,
        hour: 18,
        minute: 30,
      },
      arrivalDateTime: {
        day: 31,
        hour: 21,
        minute: 55,
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

    it('should return the legs matching 0 or max 1 stop', () => {
      const testOriginIds = ['95565052'];
      const testDestinationIds = ['95565062', '95565065'];

      const zeroStopsRes = service.filterLegsByAirport(
        mockLegs,
        testOriginIds,
        testDestinationIds,
        0,
      );

      const oneStopRes = service.filterLegsByAirport(
        mockLegs,
        testOriginIds,
        testDestinationIds,
        1,
      );

      expect(oneStopRes.length).toBe(10);
      expect(zeroStopsRes.length).toBe(4);
      expect(zeroStopsRes.length).toBeLessThan(oneStopRes.length);
    });
  });

  describe('filterTimes', () => {
    const testLegs = [
      {
        departureDateTime: {
          hour: 18,
          minute: 0,
        },
        arrivalDateTime: {
          hour: 20,
          minute: 0,
        },
      },
    ] as FlightContentLeg[];

    it('should accept the earliest departure time matching the exact departure one', () => {
      const res = service.filterTimes(testLegs, {
        earliestDepartureTime: '18:00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by earliest departure time', () => {
      const res = service.filterTimes(testLegs, {
        earliestDepartureTime: '18:01',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the latest departure time matching the exact departure one', () => {
      const res = service.filterTimes(testLegs, {
        latestDepartureTime: '18:00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by latest departure time', () => {
      const res = service.filterTimes(testLegs, {
        latestDepartureTime: '17:59',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the earliest arrival time matching the exact arrival one', () => {
      const res = service.filterTimes(testLegs, {
        earliestArrTime: '20:00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by earliest arrival time', () => {
      const res = service.filterTimes(testLegs, {
        earliestArrTime: '20:01',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the latest arrival time matching the exact arrival one', () => {
      const res = service.filterTimes(testLegs, {
        latestArrTime: '20:00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by latest arrival time', () => {
      const res = service.filterTimes(testLegs, {
        latestArrTime: '19:59',
      });
      expect(res.length).toBe(0);
    });
  });

  describe('findFlights', () => {
    const testContent = {
      results: {
        legs: {
          '1': {
            originPlaceId: testStanstedId,
            destinationPlaceId: testCiampinoId,
            durationInMinutes: 100,
            stopCount: 0,
            departureDateTime: { day: 1, hour: 1, minute: 0 },
            arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          },
          '2': {
            originPlaceId: testStanstedId,
            destinationPlaceId: testCiampinoId,
            durationInMinutes: 100,
            stopCount: 0,
            departureDateTime: { day: 1, hour: 10, minute: 0 },
            arrivalDateTime: { day: 1, hour: 12, minute: 0 },
          },
          '1-stop': {
            originPlaceId: testStanstedId,
            destinationPlaceId: testCiampinoId,
            durationInMinutes: 100,
            stopCount: 1,
            departureDateTime: { day: 1, hour: 1, minute: 0 },
            arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          },
        },
        places: mockPlaces,
      },
    } as any as FlightContent;

    it('should accept an input research option', () => {
      const input: FindFlights = {
        flightContent: mockData.content as FlightContent,
        originIata: 'STN',
        destinationIata: 'CIA',
        maxStops: 1,
        earliestArrivalTime: '08:00',
        latestArrivalTime: '11:00',
        earliestDepartureTime: '21:00',
        latestDepartureTime: '23:59',
        maxTotalPrice: 100,
      };

      expect(service.findFlights(input)).toBeDefined();
    });

    it('should accept only the mandatory fields', () => {
      const input: FindFlights = {
        flightContent: mockData.content as FlightContent,
        originIata: 'STN',
        destinationIata: 'ROM',
      };

      expect(service.findFlights(input)).toBeDefined();
    });

    it('should find the matching flights', () => {
      const input: FindFlights = {
        flightContent: testContent,
        originIata: 'STN',
        destinationIata: 'ROM',
        maxStops: 0,
        latestArrivalTime: '2:00',
        maxTotalPrice: 100,
      };

      const res = service.findFlights(input);

      expect(res.length).toBe(1);
      expect(res).toEqual([testContent.results.legs['1']]);
    });

    it('should find the matching flights when maxStops is set to 1', () => {
      const input: FindFlights = {
        flightContent: testContent,
        originIata: 'STN',
        destinationIata: 'ROM',
        maxStops: 1,
        latestArrivalTime: '2:00',
        maxTotalPrice: 100,
      };

      const res = service.findFlights(input);

      expect(res.length).toBe(2);
      expect(res).toEqual([testContent.results.legs['1'], testContent.results.legs['1-stop']]);
    });
  });

  describe('extractDate', () => {
    it('should take a string as an input and return a 3 number array', () => {
      const input = '2023-01-02';
      const [resYear, resMonth, resDay] = service.extractDate(input);
      expect(resYear).toBe(2023);
      expect(resMonth).toBe(1);
      expect(resDay).toBe(2);
    });
  });
});
