import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  sicil_no: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
