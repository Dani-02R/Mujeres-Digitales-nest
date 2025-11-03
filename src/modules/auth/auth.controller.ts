import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';

/**
 * Controlador de autenticación.
 * Ruta base: /auth
 * Expone el endpoint de login.
 */


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() data: CreateUserDTO) {
        return this.authService.register(data);
    }

     @Post('login')
     login(@Body() data: LoginDTO) {
         return this.authService.login(data);
     }

    @UseGuards(JwtAuthGuard)
     @Get('profile')
     getProfile(@Request() req) {
         return req.user.id;
     }

     
}

/**
 * POST /auth/login
 * Qué hace: autentica credenciales del usuario.
 * Recibe: body con { email, password } (LoginDTO).
 * Devuelve: objeto con datos públicos del usuario y accessToken.
 * Errores: 401 si las credenciales son inválidas.
 */
