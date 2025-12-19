import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { Response } from 'express';
import { UseInterceptors, ClassSerializerInterceptor, Controller, Post, HttpCode, Body, Res, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUserDto } from 'src/personel/dtos/loginPersonel.dto';
import { CurrentPersonel } from 'src/personel/decorators/currentPersonel.decorator';
import { Personel } from 'src/personel/entities/personel.entity';

//We add these because the password field is automatically removed from the response.
@UseInterceptors(ClassSerializerInterceptor)
//user auth
@Controller('auth')
//api tags for swagger
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login function
  @Post('/login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login with Sicil No and password',
    description:
      'Authenticates a user using Sicil No and password, then returns a JWT token (stored in HTTP-only cookie).',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    schema: {
      example: {
        message: 'SUCCESS: Logged in!',
        user: {
          id: 1,
          sicil_no: '00518',
          first_last_name: 'Asya Berk',
          role: { id: 2, name: 'Teknik Şef' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Password is incorrect!',
        error: 'Unauthorized',
      },
    },
  })
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(body, response);
  }

  //logout function
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Logout the currently authenticated user',
    description: 'Clears the JWT cookie and logs the user out.',
  })
  @ApiOkResponse({
    description: 'User logged out successfully.',
    schema: {
      example: { message: 'SUCCESS: Logged out!' },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No active session or invalid token.',
  })
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  //check current user to test login logout function
  @UseGuards(JwtAuthGuard)
  @Get('/whoami')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOperation({
    summary: 'Get current authenticated user',
    description: 'Returns info about the currently logged-in user.',
  })
  @ApiOkResponse({
    description: 'Returns the details of the currently logged-in user.',
    schema: {
      example: {
        id: 1,
        sicil_no: '00518',
        first_last_name: 'Asya Berk',
        role: { name: 'İnsan Kaynakları' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Token is missing or invalid.',
  })
  whoAmI(@CurrentPersonel() personel: Personel) {
    return personel;
  }
}

