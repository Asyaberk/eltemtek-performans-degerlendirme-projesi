import { INestApplicationContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Soru } from 'src/sorular/entities/sorular.entity';
import { SoruAgirlik } from 'src/soru-agirlik/entities/soru-agirlik.entity';

const ROLE_MAPPINGS: Record<string, string[]> = {
  'Şef': ['Teknik Şef', 'İdari Şef'],
  'Müdür': ['Müdür', 'Müdür Teknik', 'Müdür İdari', 'Genel Müdür'],
  'Direktör': ['Direktör'],
  'İdari Personel': ['İdari Personel', 'Operatör', 'Avukat'],
  'Koordinatör': ['Saha Koordinatörü', 'Proje Yöneticisi', 'Danışman'],
  'Teknik Personel': ['Teknik Personel'],
  'Uzman': ['Teknik Uzman', 'İdari Uzman'],
  'Uzman Yardımcısı': ['Teknik Uzman Yardımcısı', 'İdari Uzman Yardımcısı'],
};

const WEIGHT_SETS: Record<string, number[]> = {
  'Şef': [2,1,1,2,0.5,2,1,2,2,2,1,0.5,0.5,1,1,1,1,0.5,1,2],
  'Müdür': [1,1,2,2,0.5,0.5,2,0.5,1,0.5,1.5,1,1,1,2,2,0.5,1,2,2],
  'Direktör': [0.5,0.5,1,2,2,0.5,1,0.5,1.5,1,2,0.5,2,2,1.5,1,0.5,2,1,2],
  'İdari Personel': [2,2,1.5,2,0.5,2,1,1.5,2,2,0.5,0.5,0.5,0.5,0.5,0.5,1,2,0.5,2],
  'Koordinatör': [1,1,2,2,2,0.5,1,2,0.5,0.5,2,1,1,1,2,0.5,0.5,1,1.5,2],
  'Teknik Personel': [1.5,2,1,2,0.5,2,2,2,1.5,2,0.5,1,0.5,0.5,0.5,0.5,1,1.5,0.5,2],
  'Uzman': [1,2,1,2,0.5,2,2,2,2,2,0.5,1.5,0.5,1,1,1,2,0.5,1,2],
  'Uzman Yardımcısı': [1.5,2,2,2,0.5,0.5,0.5,1,1.5,1,0.5,2,0.5,1,1,2,2,1,0.5,2],
};

export async function seedSoruAgirliklari(app: INestApplicationContext) {
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(Role);
  const soruRepo = dataSource.getRepository(Soru);
  const agirlikRepo = dataSource.getRepository(SoruAgirlik);

  const sorular = await soruRepo.find({ order: { soru_id: 'ASC' } });

  if (sorular.length !== 20) {
    throw new Error(`!-> 20 soru bekleniyordu, ${sorular.length} bulundu`);
  }

  for (const [pdfRole, roleNames] of Object.entries(ROLE_MAPPINGS)) {
    const weights = WEIGHT_SETS[pdfRole];
    if (!weights) continue;

    for (const roleName of roleNames) {
      const role = await roleRepo.findOne({ where: { name: roleName } });
      if (!role) {
        console.warn(`!-> Role bulunamadı: ${roleName}`);
        continue;
      }

      console.log(`-> ${roleName} için ağırlıklar ekleniyor`);

      for (let i = 0; i < weights.length; i++) {
        const soru = sorular[i];

        const existing = await agirlikRepo.findOne({
          where: {
            role_id: role.role_id,
            soru_id: soru.soru_id,
          },
        });

        if (existing) {
          existing.agirlik = weights[i];
          await agirlikRepo.save(existing);
        } else {
          const yeni = agirlikRepo.create({
            role_id: role.role_id,
            soru_id: soru.soru_id,
            agirlik: weights[i],
          });
          await agirlikRepo.save(yeni);
        }
      }
    }
  }

  console.log('Soru ağırlıkları başarıyla seed edildi...');
}

