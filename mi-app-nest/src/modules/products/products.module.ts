import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import {  ProductsService  } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

/**
 * Módulo de productos.
 * Qué hace: registra el controller y service de productos.
 * Importa: repositorio TypeORM de Product.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
