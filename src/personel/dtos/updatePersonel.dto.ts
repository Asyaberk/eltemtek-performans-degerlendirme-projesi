import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonelDto } from './createPersonel.dto';

export class UpdatePersonelDto extends PartialType(CreatePersonelDto) {}
