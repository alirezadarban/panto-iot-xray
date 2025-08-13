import { Test, TestingModule } from '@nestjs/testing';
import { SignalsService } from './signals.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateXrayDto } from './dto/create-xray.dto';

describe('SignalsService', () => {
  let service: SignalsService;

  const mockXrayModel = {
    findById: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        {
          provide: getModelToken('Xray'),
          useValue: function (data) {
            return { ...data, save: mockXrayModel.save };
          },
        },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);

    // Manually attach findById mock to the model constructor
    (service as any).xrayModel.findById = mockXrayModel.findById;
  });

  it('should create a signal', async () => {
    const dto: CreateXrayDto = {
      deviceId: 'device123',
      time: new Date(),
      dataLength: 100,
      dataVolume: 200,
    };

    mockXrayModel.save.mockResolvedValueOnce(dto);

    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(mockXrayModel.save).toHaveBeenCalled();
  });

  it('should find a signal by id', async () => {
    const foundSignal = { deviceId: 'device123' };
    mockXrayModel.findById.mockResolvedValueOnce(foundSignal);

    const result = await (service as any).xrayModel.findById('someId');
    expect(result).toEqual(foundSignal);
    expect(mockXrayModel.findById).toHaveBeenCalledWith('someId');
  });
});
