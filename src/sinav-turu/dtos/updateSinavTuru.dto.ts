import { PartialType } from '@nestjs/mapped-types';
import { CreateSinavTuruDto } from './createSinavTuru.dto';

export class UpdateSinavTuruDto extends PartialType(CreateSinavTuruDto) {}
