import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

/**
 * Módulo de autenticación.
 * Qué hace: agrupa controller y service de auth.
 * Importa: repositorios TypeORM de User y Product.
 * Expone: AuthController; provee AuthService.
 */



@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
