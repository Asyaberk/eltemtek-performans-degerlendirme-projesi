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
import { Departman } from './departman/entities/departman.entity';
import { Personel } from './personel/entities/personel.entity';
import { Role } from './role/entities/role.entity';
import { SinavDetay } from './sinav-detay/entities/sinav-detay.entity';
import { Sinav } from './sinav/entities/sinav.entity';
import { SoruAgirlik } from './soru-agirlik/entities/soru-agirlik.entity';
import { Soru } from './sorular/entities/sorular.entity';
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
      entities: [
        Departman,
        Role,
        Soru,
        Personel,
        SoruAgirlik,
        Sinav,
        SinavDetay,
      ],
    }),
    
    PersonelModule,
    DepartmanModule,
    RoleModule,
    SorularModule,
    SoruAgirlikModule,
    SinavModule,
    SinavDetayModule,
    // Auth modülünü temizleyip sonra tekrar eklicem
    // AuthModule,
  ],
  // şimdilk AppController ve HealthController kalsın
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
