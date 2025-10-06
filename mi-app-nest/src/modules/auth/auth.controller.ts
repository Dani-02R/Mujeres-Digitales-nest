import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';

/**
 * Controlador de autenticación.
 * Ruta base: /auth
 * Expone el endpoint de login.
 */


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

     @Post('login')
     login(@Body() data: LoginDTO) {
         return this.authService.login(data);
     }
}

/**
 * POST /auth/login
 * Qué hace: autentica credenciales del usuario.
 * Recibe: body con { email, password } (LoginDTO).
 * Devuelve: objeto con datos públicos del usuario y accessToken.
 * Errores: 401 si las credenciales son inválidas.
 */
