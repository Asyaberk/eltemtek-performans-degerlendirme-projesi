import { INestApplicationContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

const ROLES = [
  'Teknik Şef',
  'İdari Şef',
  'Müdür',
  'Genel Müdür',
  'Direktör',
  'Danışman',
  'Saha Koordinatörü',
  'Proje Yöneticisi',
  'Teknik Personel',
  'Teknik Uzman',
  'İdari Uzman',
  'Teknik Uzman Yardımcısı',
  'İdari Uzman Yardımcısı',
  'İdari Personel',
  'Operatör',
  'Avukat',
  'Hukuk Müşaviri',
];

export async function seedRoles(app: INestApplicationContext) {
  const dataSource = app.get(DataSource);
  const roleRepo = dataSource.getRepository(Role);

  console.log('Role seed başlıyor...');

  for (const roleName of ROLES) {
    const exists = await roleRepo.findOne({
      where: { name: roleName },
    });

    if (exists) {
      console.log(`!-> Rol zaten var: ${roleName}`);
    } else {
      const role = roleRepo.create({ name: roleName });
      await roleRepo.save(role);
      console.log(`-> Rol eklendi: ${roleName}`);
    }
  }

  console.log('Role seed tamamlandı...');
}
