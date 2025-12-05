import { PartialType } from '@nestjs/mapped-types';
import { CreateSoruDto } from './createSoru.dto';

export class UpdateSoruDto extends PartialType(CreateSoruDto) {}
