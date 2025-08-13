import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray, XrayDocument } from './schemas/xray.schema';
import { CreateXrayDto } from './dto/create-xray.dto';

@Injectable()
export class SignalsService {
  constructor(
    @InjectModel(Xray.name) private readonly xrayModel: Model<XrayDocument>,
  ) {}

  async create(createXrayDto: CreateXrayDto): Promise<Xray> {
    const newXray = new this.xrayModel(createXrayDto);
    return newXray.save();
  }

  async findAll(): Promise<Xray[]> {
    return this.xrayModel.find().exec();
  }

  async findOne(id: string): Promise<Xray> {
    const xray = await this.xrayModel.findById(id).exec();
    if (!xray) {
      throw new NotFoundException(`Signal with ID ${id} not found`);
    }
    return xray;
  }
}
