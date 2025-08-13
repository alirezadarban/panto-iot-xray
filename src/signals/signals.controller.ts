import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateXrayDto } from './dto/create-xray.dto';
import { Xray } from './schemas/xray.schema';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  async create(@Body() createXrayDto: CreateXrayDto): Promise<Xray> {
    return await this.signalsService.create(createXrayDto);
  }

  @Get()
  async findAll(): Promise<Xray[]> {
    return await this.signalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Xray> {
    return await this.signalsService.findOne(id);
  }
}
