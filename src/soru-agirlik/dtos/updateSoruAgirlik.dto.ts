import { PartialType } from '@nestjs/mapped-types';
import { CreateSoruAgirlikDto } from './createSoruAgirlik.dto';

// PK'lar güncellenmeyeceği için sadece ağırlık alanını opsiyonel yapıyoruz
export class UpdateSoruAgirlikDto extends PartialType(CreateSoruAgirlikDto) {}
