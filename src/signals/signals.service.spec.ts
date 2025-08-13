import { Test, TestingModule } from '@nestjs/testing';
import { SignalsService } from './signals.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';

describe('SignalsService', () => {
  let service: SignalsService;

  const mockSignal = {
    deviceId: 'device123',
    time: new Date(),
    dataLength: 100,
    dataVolume: 200,
  };

  const mockXrayModel = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockSignal]),
    findById: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn().mockImplementation(() => ({
      exec: jest.fn(),
    })),
    findByIdAndDelete: jest.fn().mockImplementation(() => ({
      exec: jest.fn(),
    })),
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

    // Attach findById, findByIdAndUpdate, findByIdAndDelete mocks
    (service as any).xrayModel.findById = mockXrayModel.findById;
    (service as any).xrayModel.findByIdAndUpdate = mockXrayModel.findByIdAndUpdate;
    (service as any).xrayModel.findByIdAndDelete = mockXrayModel.findByIdAndDelete;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a signal', async () => {
    const dto: CreateXrayDto = { ...mockSignal };
    mockXrayModel.save.mockResolvedValueOnce(dto);

    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(mockXrayModel.save).toHaveBeenCalled();
  });

  it('should find a signal by id', async () => {
    const foundSignal = { ...mockSignal };
    (mockXrayModel.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(foundSignal),
    });

    const result = await service.findOne('someId');
    expect(result).toEqual(foundSignal);
    expect(mockXrayModel.findById).toHaveBeenCalledWith('someId');
  });

  it('should update a signal by id', async () => {
    const id = 'someId';
    const updateDto: UpdateXrayDto = { dataVolume: 500 };
    const updatedSignal = { ...mockSignal, ...updateDto };

    (mockXrayModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedSignal),
    });

    const result = await service.update(id, updateDto);
    expect(result).toEqual(updatedSignal);
    expect(mockXrayModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDto, { new: true });
  });

  it('should delete a signal by id', async () => {
    const id = 'someId';
    const deletedSignal = { ...mockSignal };

    (mockXrayModel.findByIdAndDelete as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(deletedSignal),
    });

    const result = await service.remove(id);
    expect(result).toEqual(deletedSignal);
    expect(mockXrayModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
