import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProducts } from 'src/interfaces/IProducts';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {  ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { RolesEnum } from 'src/entities/user.entity';
import { Roles } from '../auth/roles.decorator';

/**
 * Controlador de productos.
 * Ruta base: /products
 * Expone endpoints CRUD.
 */
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    /**
     * GET /products
     * Qué hace: obtiene todos los productos.
     * Recibe: —.
     * Devuelve: lista completa de productos.
     */
    @Get()
    findAll() {
        return this.productsService.findAll();
    }
    
    /**
     * GET /products/:id
     * Qué hace: obtiene un producto por su ID.
     * Recibe: id (param).
     * Devuelve: producto correspondiente.
     * Errores: 404 si no se encuentra el producto.
     */
     @Get(':id')
     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(RolesEnum.ADMIN, RolesEnum.USER)
     findOne(@Param('id', ParseIntPipe) id: number) {
         return this.productsService.findOne(id);
     }

     @Get('by-name/:name')
     findByName(@Param('name', ParseUpperTrimPipe) name: string) {
         return this.productsService.findByName(name);
     }

     /**
      * POST /products
      * Qué hace: crea un nuevo producto.
      * Recibe: cuerpo con los datos del producto (CreateProductDto).
      * Devuelve: el producto recién creado.
      */

     @Post()
      @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(RolesEnum.ADMIN)
     create(@Body() Body: CreateProductDto) {
         return this.productsService.create(Body);
     }

     /**
      * PUT /products/:id
      * Qué hace: actualiza un producto existente.
      * Recibe: id (param) y cuerpo con campos actualizados (UpdateProductDto).
      * Devuelve: el producto actualizado.
      */
 
     @Put(':id')
      @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(RolesEnum.ADMIN)
     update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
         return this.productsService.update(id, body);
     }

     /**
      * DELETE /products/:id
      * Qué hace: elimina un producto existente.
      * Recibe: id (param).
      * Devuelve: mensaje de confirmación.
      * Errores: 400 si el producto no existe.
      */

     @Delete(':id')
      @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(RolesEnum.ADMIN)
     disabled(@Param('id', ParseIntPipe) id: number) {
         return this.productsService.disabled(id);
     }
}
