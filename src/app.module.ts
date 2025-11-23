import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersonelModule } from './personel/personel.module';
import { DepartmanModule } from './departman/departman.module';
import { RoleModule } from './role/role.module';
import { SorularModule } from './sorular/sorular.module';
import { SoruAgirlikModule } from './soru-agirlik/soru-agirlik.module';
import { SinavModule } from './sinav/sinav.module';
import { SinavDetayModule } from './sinav-detay/sinav-detay.module';
import { HealthController } from './health.controller';
// Auth modülünü sonra ekleyeceğiz
// import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    // --- POSTGRES BAĞLANTISI ---
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      synchronize: true,
      database: process.env.DB_DATABASE,

      // Şimdilik boş entity ekleyeceğim
      // [Personel, Departman, Rol, Soru, SoruAgirlik, Sinav, SinavDetay] olur
      entities: [],
    }),

    // --- YENİ MODÜLLERİMİZ ---
    PersonelModule,
    DepartmanModule,
    RoleModule,
    SorularModule,
    SoruAgirlikModule,
    SinavModule,
    SinavDetayModule,
    // Auth modülünü temizleyip sonra tekrar ekleyeceğiz
    // AuthModule,
  ],
  // şimdilk AppController ve HealthController kalsın
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
