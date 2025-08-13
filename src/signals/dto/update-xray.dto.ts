import { PartialType } from '@nestjs/mapped-types';
import { CreateXrayDto } from './create-xray.dto';

export class UpdateXrayDto extends PartialType (CreateXrayDto) {}
