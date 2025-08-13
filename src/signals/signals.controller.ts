import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateXrayDto: UpdateXrayDto,
  ): Promise<Xray> {
    return this.signalsService.update(id, updateXrayDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Xray> {
    return this.signalsService.remove(id);
  }
}
