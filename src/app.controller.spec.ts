import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            greetings: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return appService.greetings', async () => {
      const mockGreetings = {
        message: 'ok',
      };
      jest.spyOn(appService, 'greetings').mockImplementation(() => mockGreetings);

      const res = await appController.getHello();

      expect(res).toBe(mockGreetings);
      expect(appService.greetings).toBeCalled();
    });
  });
});
