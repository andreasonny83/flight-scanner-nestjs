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

export interface FlightContentResults {
  [key: string]: {
    pricingOptions: Array<{
      price: {
        amount: string;
        unit: string;
        updateStatus: string;
      };
      items: Array<{
        price: {
          amount: string;
          unit: string;
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
  };
}

export interface FlightContentLegs {
  [key: string]: {
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
  };
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
    itineraries: FlightContentResults;
    legs: FlightContentLegs;
    places: FlightContentPlaces;
  };
  stats: {
    itineraries: FlightContentStats;
  };
}
