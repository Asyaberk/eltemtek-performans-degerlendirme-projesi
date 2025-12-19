import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { PersonelModule } from 'src/personel/personel.module';
import { DepartmanModule } from 'src/departman/departman.module';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personel } from 'src/personel/entities/personel.entity';

@Module({
  //import jwt
  imports: [
    TypeOrmModule.forFeature([Personel]),
    PersonelModule,
    DepartmanModule,
    RoleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'cat',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  //we import to provider because we put guard and jwtstrategy is injectable
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
