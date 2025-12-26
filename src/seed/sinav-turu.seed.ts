// src/seed/sinav-turu.seed.ts

import { INestApplicationContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SinavTuru } from 'src/sinav-turu/entities/sinav-turu.entity';

export async function seedSinavTurleri(app: INestApplicationContext) {
  const dataSource = app.get(DataSource);
  const repo = dataSource.getRepository(SinavTuru);

  console.log('Sınav Türleri seed başlıyor...');

  const sinavTurleri = [
    { name: 'Yıllık Performans Değerlendirmesi' },
    { name: 'Dönemsel Performans Değerlendirmesi' },
    { name: 'Rotasyon Değerlendirmesi' },
    { name: 'Deneme / Pilot Değerlendirme' },
  ];

  for (const tur of sinavTurleri) {
    const exists = await repo.findOne({
      where: { name: tur.name },
    });

    if (exists) {
      console.log(`!-> Zaten var: ${tur.name}`);
    } else {
      await repo.save(repo.create(tur));
      console.log(`-> Sınav Türü eklendi: ${tur.name}`);
    }
  }

  console.log('Sınav Türleri seed tamamlandı...');
}
