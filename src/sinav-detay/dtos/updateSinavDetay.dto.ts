import { PartialType } from '@nestjs/mapped-types';
import { CreateSinavDetayDto } from './createSinavDetay.dto';

export class UpdateSinavDetayDto extends PartialType(CreateSinavDetayDto) {}
