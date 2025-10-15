import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProducts } from 'src/interfaces/IProducts';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

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
     findOne(@Param('id') id: string) {
         return this.productsService.findOne(Number(id));
     }

     /**
      * POST /products
      * Qué hace: crea un nuevo producto.
      * Recibe: cuerpo con los datos del producto (CreateProductDto).
      * Devuelve: el producto recién creado.
      */
     @UseGuards(JwtAuthGuard)
     @Post()
     create(@Body() Body: CreateProductDto) {
         return this.productsService.create(Body);
     }

     /**
      * PUT /products/:id
      * Qué hace: actualiza un producto existente.
      * Recibe: id (param) y cuerpo con campos actualizados (UpdateProductDto).
      * Devuelve: el producto actualizado.
      */
     @UseGuards(JwtAuthGuard)
     @Put(':id')
     update(@Param('id') id: string, @Body() body: UpdateProductDto) {
         return this.productsService.update(Number(id), body);
     }

     /**
      * DELETE /products/:id
      * Qué hace: elimina un producto existente.
      * Recibe: id (param).
      * Devuelve: mensaje de confirmación.
      * Errores: 400 si el producto no existe.
      */
     @UseGuards(JwtAuthGuard)
     @Delete(':id')
     remove(@Param('id') id: string) {
         return this.productsService.remove(Number(id));
     }
}
