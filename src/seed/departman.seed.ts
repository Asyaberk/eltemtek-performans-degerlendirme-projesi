// src/seed/departman.seed.ts

import { INestApplicationContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Departman } from 'src/departman/entities/departman.entity';

const DEPARTMANLAR = [
  'EKAT Şefliği',
  'Denetim ve Test Hizmetleri Şefliği',
  'İletim Tesisleri İşletme Bakım Şefliği',
  'Çevre ve Enerji Verimliliği Şefliği',
  'İdari İşler Şefliği Merkez',
  'İSG Şefliği',
  'EİH Etüt ve Proje Şefliği',
  'Bilişim Teknolojileri ve Teknik Hizmetler Direktörlüğü',
  'Genel Müdürlük',
  'KYS Şefliği',
  'Mali İşler Müdürlüğü',
  'Harita Hizmetleri Şefliği',
  'Yenilenebilir Enerji ve Elektrik Dağıtım Tesisleri Şefliği',
  'Donanım ve Teknik Destek Şefliği',
  'Enerji Teknolojileri ve Yazılım Müdürlüğü',
  'İnsan Kaynakları Şefliği',
  'Teklif ve Satın Alma Müdürlüğü',
  'Özel Kalem ve Kurumsal İletişim Müdürlüğü',
  'Harita Müdürlüğü',
  'İdari İşler Şefliği İstanbul',
  'İnsan Kaynakları ve İdari İşler Direktörlüğü',
  'Enerji ve İletim Tesisleri Müdürlüğü',
  'Yenilenebilir Enerji ve Elektrik Dağıtım Tesisleri Müdürlüğü',
  'Eğitim Şefliği',
  'Muhasebe ve Bütçe Şefliği',
  'Satın Alma Şefliği',
  'İnsan Kaynakları Müdürlüğü',
  'Hukuk Müşavirliği',
  'Trafo ve Üretim Tesisleri Müdürlüğü',
  'Denetim ve Test Hizmetleri Müdürlüğü',
  'İSG, Çevre ve Enerji Verimliliği Müdürlüğü',
  'Teklif ve Sözleşmeler Şefliği',
  'Strateji ve Proje Yönetim Şefliği',
  'Kurumsal Gelişim Direktörlüğü',
  'Trafo ve Üretim Tesisleri Şefliği',
];

export async function seedDepartmanlar(app: INestApplicationContext) {
  const dataSource = app.get(DataSource);
  const deptRepo = dataSource.getRepository(Departman);

  console.log('Departman seed başlıyor...');

  for (const name of DEPARTMANLAR) {
    const exists = await deptRepo.findOne({ where: { name } });

    if (exists) {
      console.log(`!-> Departman zaten var: ${name}`);
    } else {
      const dept = deptRepo.create({ name });
      await deptRepo.save(dept);
      console.log(`-> Departman eklendi: ${name}`);
    }
  }

  console.log('Departman seed tamamlandı...');
}
