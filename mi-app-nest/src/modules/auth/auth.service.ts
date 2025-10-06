import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository.js';

/**
 * Servicio de autenticación.
 * Qué hace: valida credenciales y emite un token (placeholder).
 * Dependencias: repositorio User.
 */


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private  usersRepo: Repository<User>
    ) {}

     async login(data: LoginDTO) {
         const user = await this.usersRepo.findOne({where: { email: data.email}
         });

         if (!user) {
             throw new UnauthorizedException("Credenciales invalidas");
         }

         const isPasswordValid = user.password === data.password;
         if (!isPasswordValid) {
             throw new UnauthorizedException("Credenciales invalidas");
         }

         return {
             user: { id: user.id, name: user.name, email: user.email, age: user.age },
             accessToken: `fake-token-${user.id}-${Date.now()}`
         }
     }
}
/**
 * login(data: LoginDTO)
 * Qué hace: verifica email y password contra la base.
 * Recibe: { email: string, password: string }.
 * Devuelve: { user: { id, name, email, age }, accessToken: string }.
 * Errores: UnauthorizedException si el email no existe o la contraseña no coincide.
 */
