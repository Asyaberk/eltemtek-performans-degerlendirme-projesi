import { PartialType } from '@nestjs/mapped-types';
import { CreateSinavDto } from './createSinav.dto';

export class UpdateSinavDto extends PartialType(CreateSinavDto) {}
