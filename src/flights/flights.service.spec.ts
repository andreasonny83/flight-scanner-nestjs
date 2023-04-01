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
  FindFlightLegs,
  FlightItineraries,
  FlightContentLegWithPrices,
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
        earliestDepartureTime: '18-00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by earliest departure time', () => {
      const res = service.filterTimes(testLegs, {
        earliestDepartureTime: '18-01',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the latest departure time matching the exact departure one', () => {
      const res = service.filterTimes(testLegs, {
        latestDepartureTime: '18-00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by latest departure time', () => {
      const res = service.filterTimes(testLegs, {
        latestDepartureTime: '17-59',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the earliest arrival time matching the exact arrival one', () => {
      const res = service.filterTimes(testLegs, {
        earliestArrTime: '20-00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by earliest arrival time', () => {
      const res = service.filterTimes(testLegs, {
        earliestArrTime: '20-01',
      });
      expect(res.length).toBe(0);
    });

    it('should accept the latest arrival time matching the exact arrival one', () => {
      const res = service.filterTimes(testLegs, {
        latestArrTime: '20-00',
      });
      expect(res.length).toBe(1);
      expect(res).toEqual(testLegs);
    });

    it('should filter by latest arrival time', () => {
      const res = service.filterTimes(testLegs, {
        latestArrTime: '19-59',
      });
      expect(res.length).toBe(0);
    });
  });

  describe('findFlightLegs', () => {
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
      const input: FindFlightLegs = {
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

      expect(service.findFlightLegs(input)).toBeDefined();
    });

    it('should accept only the mandatory fields', () => {
      const input: FindFlightLegs = {
        flightContent: mockData.content as FlightContent,
        originIata: 'STN',
        destinationIata: 'ROM',
      };

      expect(service.findFlightLegs(input)).toBeDefined();
    });

    it('should find the matching flights', () => {
      const input: FindFlightLegs = {
        flightContent: testContent,
        originIata: 'STN',
        destinationIata: 'ROM',
        maxStops: 0,
        latestArrivalTime: '2-00',
        maxTotalPrice: 100,
      };

      const res = service.findFlightLegs(input);

      expect(res.length).toBe(1);
      expect(res).toEqual([{ ...testContent.results.legs['1'], itineraryId: '1' }]);
    });

    it('should find the matching flights when maxStops is set to 1', () => {
      const input: FindFlightLegs = {
        flightContent: testContent,
        originIata: 'STN',
        destinationIata: 'ROM',
        maxStops: 1,
        latestArrivalTime: '2-00',
        maxTotalPrice: 100,
      };

      const res = service.findFlightLegs(input);

      expect(res.length).toBe(2);
      expect(res).toEqual([
        { ...testContent.results.legs['1'], itineraryId: '1' },
        { ...testContent.results.legs['1-stop'], itineraryId: '1-stop' },
      ]);
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

  describe('addMatchingPrices', () => {
    it('should add the prices to the flightContent', () => {
      const flightItineraries: FlightItineraries = {
        '16574-2305310555--31915,-30727-1-11493-2305311310': {
          pricingOptions: [
            {
              price: {
                amount: '64000',
                unit: 'PRICE_UNIT_CENTI',
                updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
              },
              items: [
                {
                  price: {
                    amount: '64000',
                    unit: 'PRICE_UNIT_CENTI',
                    updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
                  },
                  deepLink:
                    'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
                  fares: [
                    {
                      segmentId: '16574-9884-2305310555-2305310850--31915',
                    },
                    {
                      segmentId: '13572-11493-2305311200-2305311310--30727',
                    },
                  ],
                },
                {
                  price: {
                    amount: '63000',
                    unit: 'PRICE_UNIT_MILLI',
                    updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
                  },
                  deepLink:
                    'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
                  fares: [
                    {
                      segmentId: '16574-9884-2305310555-2305310850--31915',
                    },
                    {
                      segmentId: '13572-11493-2305311200-2305311310--30727',
                    },
                  ],
                },
              ],
              id: '8ATPRsYMPdiG',
            },
            {
              price: {
                amount: '12000000',
                unit: 'PRICE_UNIT_MICRO',
                updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
              },
              items: [
                {
                  price: {
                    amount: '12000000',
                    unit: 'PRICE_UNIT_MICRO',
                    updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
                  },
                  deepLink:
                    'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
                  fares: [
                    {
                      segmentId: '16574-9884-2305310555-2305310850--31915',
                    },
                    {
                      segmentId: '13572-11493-2305311200-2305311310--30727',
                    },
                  ],
                },
                {
                  price: {
                    amount: '130',
                    unit: 'PRICE_UNIT_WHOLE',
                    updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
                  },
                  deepLink:
                    'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
                  fares: [
                    {
                      segmentId: '16574-9884-2305310555-2305310850--31915',
                    },
                    {
                      segmentId: '13572-11493-2305311200-2305311310--30727',
                    },
                  ],
                },
              ],
              id: '8ATPRsYMPdiG',
            },
          ],
          legIds: ['16574-2305310555--31915,-30727-1-11493-2305311310'],
        },
        '16574-2305310555--31915,-30727-1-11493-2305311410': {
          pricingOptions: [
            {
              price: {
                amount: '62200',
                unit: 'PRICE_UNIT_MILLI',
                updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
              },
              items: [
                {
                  price: {
                    amount: '62200',
                    unit: 'PRICE_UNIT_MILLI',
                    updateStatus: 'PRICE_UPDATE_STATUS_UNSPECIFIED',
                  },
                  deepLink:
                    'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2133%257C13572%257C2023-05-31T13%253A00%257C11493%257C2023-05-31T14%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D62.20%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C5343883620813655327%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
                  fares: [
                    {
                      segmentId: '16574-9884-2305310555-2305310850--31915',
                    },
                    {
                      segmentId: '13572-11493-2305311300-2305311410--30727',
                    },
                  ],
                },
              ],
              id: 'gqsoUwezoYbT',
            },
          ],
          legIds: ['16574-2305310555--31915,-30727-1-11493-2305311410'],
        },
      };

      const flightLegs: FlightContentLeg[] = [
        {
          originPlaceId: '123',
          destinationPlaceId: '456',
          durationInMinutes: 100,
          stopCount: 0,
          departureDateTime: { day: 1, hour: 1, minute: 0 },
          arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
        },
        {
          originPlaceId: '123',
          destinationPlaceId: '789',
          durationInMinutes: 100,
          stopCount: 0,
          departureDateTime: { day: 1, hour: 10, minute: 0 },
          arrivalDateTime: { day: 1, hour: 12, minute: 0 },
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311410',
        },
      ];

      const expectedRes: FlightContentLegWithPrices[] = [
        {
          arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          departureDateTime: { day: 1, hour: 1, minute: 0 },
          destinationPlaceId: '456',
          durationInMinutes: 100,
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
          originPlaceId: '123',
          stopCount: 0,
          deepLink:
            'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
          price: '640',
        },
        {
          arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          departureDateTime: { day: 1, hour: 1, minute: 0 },
          destinationPlaceId: '456',
          durationInMinutes: 100,
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
          originPlaceId: '123',
          stopCount: 0,
          deepLink:
            'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
          price: '63',
        },
        {
          arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          departureDateTime: { day: 1, hour: 1, minute: 0 },
          destinationPlaceId: '456',
          durationInMinutes: 100,
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
          originPlaceId: '123',
          stopCount: 0,
          deepLink:
            'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
          price: '12',
        },
        {
          arrivalDateTime: { day: 1, hour: 2, minute: 0 },
          departureDateTime: { day: 1, hour: 1, minute: 0 },
          destinationPlaceId: '456',
          durationInMinutes: 100,
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
          originPlaceId: '123',
          stopCount: 0,
          deepLink:
            'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
          price: '130',
        },
        {
          arrivalDateTime: { day: 1, hour: 12, minute: 0 },
          departureDateTime: { day: 1, hour: 10, minute: 0 },
          destinationPlaceId: '789',
          durationInMinutes: 100,
          itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311410',
          originPlaceId: '123',
          stopCount: 0,
          deepLink:
            'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2133%257C13572%257C2023-05-31T13%253A00%257C11493%257C2023-05-31T14%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D62.20%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C5343883620813655327%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
          price: '62.2',
        },
      ];

      const res = service.addMatchingPrices(flightItineraries, flightLegs);

      expect(res).toEqual(expectedRes);
    });
  });

  describe.only('createItineraries', () => {
    const departures: FlightContentLegWithPrices[] = [
      {
        arrivalDateTime: { day: 1, hour: 2, minute: 0 },
        departureDateTime: { day: 1, hour: 1, minute: 0 },
        destinationPlaceId: '456',
        durationInMinutes: 100,
        itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
        originPlaceId: '123',
        stopCount: 0,
        deepLink:
          'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
        price: '83.3',
      },
      {
        arrivalDateTime: { day: 1, hour: 2, minute: 0 },
        departureDateTime: { day: 1, hour: 1, minute: 0 },
        destinationPlaceId: '456',
        durationInMinutes: 100,
        itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
        originPlaceId: '123',
        stopCount: 0,
        deepLink:
          'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
        price: '63',
      },
    ];
    const returns: FlightContentLegWithPrices[] = [
      {
        arrivalDateTime: { day: 1, hour: 2, minute: 0 },
        departureDateTime: { day: 1, hour: 1, minute: 0 },
        destinationPlaceId: '456',
        durationInMinutes: 100,
        itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311310',
        originPlaceId: '123',
        stopCount: 0,
        deepLink:
          'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2037%257C13572%257C2023-05-31T12%253A00%257C11493%257C2023-05-31T13%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D64.00%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C3135137620125792512%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
        price: '72.5',
      },
      {
        arrivalDateTime: { day: 1, hour: 12, minute: 0 },
        departureDateTime: { day: 1, hour: 10, minute: 0 },
        destinationPlaceId: '789',
        durationInMinutes: 100,
        itineraryId: '16574-2305310555--31915,-30727-1-11493-2305311410',
        originPlaceId: '123',
        stopCount: 0,
        deepLink:
          'https://skyscanner.pxf.io/c/2850210/1103265/13416?u=https%3A%2F%2Fwww.skyscanner.net%2Ftransport_deeplink%2F4.0%2FUK%2Fen-GB%2FGBP%2Fctuk%2F1%2F16574.11493.2023-05-31%2Fair%2Ftrava%2Fflights%3Fitinerary%3Dflight%257C-31915%257C2696%257C16574%257C2023-05-31T05%253A55%257C9884%257C2023-05-31T08%253A50%257C115%257C-%257C-%257C-%253Bflight%257C-30727%257C2133%257C13572%257C2023-05-31T13%253A00%257C11493%257C2023-05-31T14%253A10%257C70%257C-%257C-%257C-%26carriers%3D-31915%252C-30727%26operators%3D-31915%253B-30727%26passengers%3D1%26channel%3Ddataapi%26cabin_class%3Deconomy%26facilitated%3Dfalse%26fps_session_id%3D4107902d-d880-4e25-9466-f791168ee447%26ticket_price%3D62.20%26is_npt%3Dfalse%26is_multipart%3Dfalse%26client_id%3Dskyscanner_b2b%26request_id%3D6e0602db-4d7c-47be-9607-c33c40a31d72%26q_ids%3DH4sIAAAAAAAA_-OS4mJJLinNFmLmuKUixczx10ShYc6txWxGTAqMABgDqkIcAAAA%257C5343883620813655327%257C2%26q_sources%3DJACQUARD%26commercial_filters%3Dfalse%26q_datetime_utc%3D2023-03-11T17%253A13%253A50%26transfer_protection%3Dprotected%26pqid%3Dtrue%26api_logo%3Dhttps%253A%252F%252Flogos.skyscnr.com%252Fimages%252Fpartners%252Fdefault.png%26api_pbs%3Dtrue%26associate_id%3DAFF_TRA_19354_00001%26app_id%3DG4IcGcdmVpjw77HZ3bCQanBnLBKNE76h2RC%25252Bq0zWNAx4vlSXpxjay009pDhvp9R8&associateid=AFF_TRA_19354_00001',
        price: '62.2',
      },
    ];

    it('should create all the possible itinerary combinations', () => {
      const res = service.createItineraries(departures, returns);

      expect(res.length).toBe(departures.length * returns.length);
    });

    it('should create itineraries with a departure and a return leg', () => {
      const res = service.createItineraries(departures, returns);

      expect(res[0].departure).toBeDefined();
      expect(res[0].return).toBeDefined();
    });

    it.each([
      [0, departures[0], returns[0]],
      [1, departures[0], returns[1]],
      [2, departures[1], returns[0]],
      [3, departures[1], returns[1]],
    ])(
      'should populate the itinerary %p with the given departure and a return legs',
      (index, expDep, expRet) => {
        const res = service.createItineraries(departures, returns);

        expect(res[index].departure).toEqual(expDep);
        expect(res[index].return).toEqual(expRet);
      },
    );

    it('should add a total price per itinerary', () => {
      const res = service.createItineraries(departures, returns);
      const expectedTotPrice = '155.8';
      expect(res[0].totPrice).toBe(expectedTotPrice);
    });
  });
});
