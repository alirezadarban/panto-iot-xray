import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateXrayDto {
  @IsString()
  deviceId: string;

  @IsDate()
  time: Date;

  @IsNumber()
  dataLength: number;

  @IsNumber()
  dataVolume: number;

  @IsString()
  rawData?: Record<string, any>;
}
