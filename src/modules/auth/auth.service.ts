import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { privateDecrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

/**
 * Servicio de autenticación.
 * Qué hace: valida credenciales y emite un token (placeholder).
 * Dependencias: repositorio User.
 */


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private  userRepo: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(data: CreateUserDTO) { 
       const hashedPassword = await bcrypt.hash(data.password, 10);
       const userCreated = this.userRepo.create({
           ...data,
           password: hashedPassword
       });
       await this.userRepo.save(userCreated);
         return {message: 'Usuario creado exitosamente', user: { id: userCreated.id, name: userCreated.name, email: userCreated.email, age: userCreated.age }};
    }

     async login(data: LoginDTO) {
         const user = await this.userRepo.findOne({where: { email: data.email}
         });

         if (!user) {
             throw new UnauthorizedException("Credenciales invalidas");
         }

         const isPasswordValid = await bcrypt.compare(data.password, user.password);
         if (!isPasswordValid) {
             throw new UnauthorizedException("Credenciales invalidas");
         }

         const payloadToken ={
             user: { sub: user.id, name: user.name, email: user.email, age: user.age }
         }
         const token = await this.jwtService.signAsync(payloadToken);

         return {
             accessToken: token
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
