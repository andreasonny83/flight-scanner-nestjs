export interface FlightContentStats {
  minDuration: number;
  maxDuration: number;
  total: {
    count: number;
    minPrice: {
      amount: string;
      unit: string;
      updateStatus: string;
    };
  };
  stops: {
    direct: {
      total: {
        count: number;
        minPrice: {
          amount: string;
          unit: string;
          updateStatus: string;
        };
      };
    };
  };
}

export interface FlightItineraries {
  [key: string]: FlightItinerary;
}

export interface FlightItinerary {
  pricingOptions: Array<{
    price: {
      amount: string;
      unit: string;
      updateStatus: string;
    };
    items: Array<{
      price: {
        amount: string;
        unit:
          | 'PRICE_UNIT_UNSPECIFIED'
          | 'PRICE_UNIT_WHOLE'
          | 'PRICE_UNIT_CENTI'
          | 'PRICE_UNIT_MILLI'
          | 'PRICE_UNIT_MICRO';
        updateStatus: string;
      };
      deepLink: string;
      fares: Array<{
        segmentId: string;
      }>;
    }>;
    id: string;
  }>;
  legIds: string[];
}

export interface FlightItineraryWithPrice {
  departure: FlightContentLegWithPrices;
  return: FlightContentLegWithPrices;
  totPrice: string;
}

export interface FlightContentLegWithPrices extends FlightContentLeg {
  deepLink: string;
  price: string;
}

export interface FlightContentLeg {
  originPlaceId: string;
  destinationPlaceId: string;
  departureDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  arrivalDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  durationInMinutes: number;
  stopCount: number;
  itineraryId?: string;
}

export interface FlightReturnLeg {
  originPlace: string;
  destinationPlace: string;
  departureDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  arrivalDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  durationInMinutes: number;
  stopCount: number;
  departurePrice: string;
  returnPrice: string;
  totalPrice: string;
}

export interface FlightContentLegs {
  [key: string]: FlightContentLeg;
}

export enum PlaceTypes {
  PLACE_TYPE_CITY = 'PLACE_TYPE_CITY',
  PLACE_TYPE_COUNTRY = 'PLACE_TYPE_COUNTRY',
  PLACE_TYPE_AIRPORT = 'PLACE_TYPE_AIRPORT',
}

export interface FlightContentPlace {
  entityId: string;
  parentId: string;
  name: string;
  iata: string;
  type: PlaceTypes;
  coordinates?: any | null;
}

export interface FlightContentPlaces {
  [key: string]: FlightContentPlace;
}

export interface FlightContent {
  results: {
    itineraries: FlightItineraries;
    legs: FlightContentLegs;
    places: FlightContentPlaces;
  };
  stats: {
    itineraries: FlightContentStats;
  };
}

export interface FindFlightLegs {
  flightContent: FlightContent;
  originIata: string;
  destinationIata: string;
  maxStops?: number;
  maxTotalPrice?: number;
  earliestDepartureTime?: string;
  latestDepartureTime?: string;
  earliestArrivalTime?: string;
  latestArrivalTime?: string;
}
export interface FilterTimesOptions {
  earliestArrTime?: string;
  latestArrTime?: string;
  earliestDepartureTime?: string;
  latestDepartureTime?: string;
}

export interface SearchInput {
  originIata: string;
  destinationIata: string;
  departureDate: string;
  returnDate?: string;
  maxStops?: number;
  currency?: string;
  tripLength?: string;
  earliestDepartureArrivalTime?: string;
  latestDepartureArrivalTime?: string;
  earliestReturnLeaveTime?: string;
  latestReturnLeaveTime?: string;
  maxTotPrice?: string;
}
