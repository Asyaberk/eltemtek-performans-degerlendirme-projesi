import {Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PersonelRepository } from '../../personel/repository/personel.repository';
import { LoginUserDto } from '../../personel/dtos/loginPersonel.dto';
import { Personel } from 'src/personel/entities/personel.entity';

@Injectable()
export class AuthService {
  //jwt web token
  //own user repo
  constructor(
    private readonly personelRepo: PersonelRepository,
    private readonly jwtService: JwtService,
  ) {}

  //Token creation
  //We receive the token from the user for each request, validate it, and use it for permission.
  async createToken(personel: Personel): Promise<string> {
    const payload = {
      sub: personel.id,
      sicil_no: personel.sicil_no,
      role: personel.role?.name,
    };
    return this.jwtService.sign(payload);
  }

  //login fuction
  async login(body: LoginUserDto, response: Response) {
    // Sicil no ile personeli bul
    const user = await this.personelRepo.findBySicilNo(body.sicil_no);

    if (!user || !user.password) {
      throw new UnauthorizedException('Sicil numarası veya şifre hatalı!');
    }

    // Hashlenmiş şifreyi kontrol et
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sicil numarası veya şifre hatalı!');
    }

    // Token üret
    const jwt = await this.createToken(user);

    //Cookie
    response.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      message: 'Giriş başarılı!',
      user: {
        id: user.id,
        sicil_no: user.sicil_no,
        name: user.name,
        role: user.role?.name,
      },
    };
  }

  //logout function
  logout(response: Response) {
    response.clearCookie('jwt');
    return { message: 'Başarıyla çıkış yapıldı.' };
  }
}
