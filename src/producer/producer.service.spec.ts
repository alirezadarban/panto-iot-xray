// src/producer/producer.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

jest.mock('amqplib');

describe('ProducerService', () => {
  let service: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        { provide: ConfigService, useValue: { get: () => 'amqp://localhost:5672' } },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send sample data', async () => {
    const sendToQueueMock = jest.fn();
    const createChannelMock = jest.fn().mockResolvedValue({
      assertQueue: jest.fn(),
      sendToQueue: sendToQueueMock,
      close: jest.fn(),
    });
    (amqp.connect as jest.Mock).mockResolvedValue({
      createChannel: createChannelMock,
      close: jest.fn(),
    });

    await service.sendSampleXrayData();
    expect(sendToQueueMock).toHaveBeenCalled();
  });
});
