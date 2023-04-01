# Flight Scanner NestJS
## Description

Find your best flight deals.

## Installation

```bash
$ pnpm install
```

## Environment Variables

Rename the `.env.sample` to `.env` and add the missing `SEARCH_FLIGHTS_API_KEY`.
This is the SkyScanner API key. You can use a free testing one or register your own business key.
Read more about that on: https://developers.skyscanner.net/docs/getting-started/authentication

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# use mock data
$ MOCK='true' npm run start:dev

# production mode
$ pnpm run start:prod
```


## Example requests

### Flight in and return on same day at any given time

Find all flights starting from London Stansted and arriving in Rome (any airport).
The flight must be on the 1st of May 2023. Note: The `returnDate` can be omitted when the same as
the `departureDate`.

http://localhost:4001/search-flights?originIata=STN&destinationIata=ROM&departureDate=2023-05-01&returnDate=2023-05-01

### Flight in and return on same day with given times

Find all flights starting from London Stansted and arriving in Rome (any airport).
The flight must be on the 1st of May 2023. The departure arrival time should not be later than
1.00PM and the return flight should not depart before 6.00PM

http://localhost:4001/search-flights?originIata=STN&destinationIata=ROM&departureDate=2023-05-01&latestDepartureArrivalTime=13-00&earliestReturnLeaveTime=18-00


## Search parameters

| Parameter Name                          | Data Type | Description                                                      |
|-----------------------------------------|-----------|------------------------------------------------------------------|
| originIata                              | string    | The IATA code for the departure airport.                         |
| destinationIata                         | string    | The IATA code for the arrival airport.                           |
| departureDate                           | string    | The date of departure in the format "YYYY-MM-DD".                |
| returnDate (optional)                   | string    | The date of return in the format "YYYY-MM-DD".                   |
| maxStops (optional)                     | number    | The maximum number of stops allowed on the trip.                 |
| currency (optional)                     | string    | The currency to use for pricing.                                 |
| tripLength (optional)                   | string    | The length of the trip in days.                                  |
| earliestDepartureArrivalTime (optional) | string    | The earliest time for departure/arrival, in the format "HH-mm".  |
| latestDepartureArrivalTime (optional)   | string    | The latest time for departure/arrival, in the format "HH-mm".    |
| earliestReturnLeaveTime (optional)      | string    | The earliest time for return/leave, in the format "HH-mm".       |
| latestReturnLeaveTime (optional)        | string    | The latest time for return/leave, in the format "HH-mm".         |
| maxTotPrice (optional)                  | string    | The maximum total price for the trip, in the currency specified. |

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
