import { Test, TestingModule } from '@nestjs/testing';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

describe('FlightsController', () => {
  let controller: FlightsController;
  let service: FlightsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlightsController],
      providers: [
        {
          provide: FlightsService,
          useValue: { search: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<FlightsService>(FlightsService);
    controller = app.get<FlightsController>(FlightsController);
  });

  describe('search', () => {
    it('should call the FlightsService search method', async () => {
      jest.spyOn(service, 'search');

      await controller.searchFlights({
        destinationIata: 'x',
        originIata: 'x',
        departureDate: 'x',
        returnDate: 'x',
      });

      expect(service.search).toBeCalled();
    });
  });
});
