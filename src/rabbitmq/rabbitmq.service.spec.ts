import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqService } from './rabbitmq.service';
import { SignalsService } from '../signals/signals.service';

describe('RabbitmqService', () => {
  let service: RabbitmqService;

  const mockSignalsService = {
    saveSignal: jest.fn(),
    // هر متد دیگه که توی RabbitmqService استفاده میشه رو اینجا mock کن
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitmqService,
        {
          provide: SignalsService,
          useValue: mockSignalsService,
        },
      ],
    }).compile();

    service = module.get<RabbitmqService>(RabbitmqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
