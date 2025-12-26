// npx ts-node -r tsconfig-paths/register src/seed/seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedRoles } from './role.seed';
import { seedDepartmanlar } from './departman.seed';
import { seedSorular } from './sorular.seed';
 import { seedSinavTurleri } from './sinav-turu.seed';
 import { seedPersoneller } from './personel.seed';
import { seedSoruAgirliklari } from './soru-agirlik.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('SEED BAŞLADI...');

  await seedRoles(app);
  await seedDepartmanlar(app);
   await seedSorular(app);
   await seedSinavTurleri(app);
   await seedPersoneller(app);
   await seedSoruAgirliklari(app);

  console.log('TÜM SEEDLER TAMAMLANDI!!!');
  await app.close();
}

bootstrap();
