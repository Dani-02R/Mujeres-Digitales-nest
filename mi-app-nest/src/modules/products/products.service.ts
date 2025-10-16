import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { IProducts } from 'src/interfaces/IProducts';


/**
 * Servicio de productos.
 * Qué hace: gestiona la lógica CRUD con la base de datos.
 * Dependencias: repositorio Product.
 */
@Injectable()
export class ProductsService {
   constructor(
    @InjectRepository(Product)
     private productsRepo: Repository<Product>
    ) {}

    /**
     * Obtiene todos los productos.
     * Recibe: —.
     * Devuelve: arreglo con todos los registros Product.
     */
    findAll() {
        return this.productsRepo.find();
    }

    /**
     * Obtiene un producto por ID.
     * Recibe: id (number).
     * Devuelve: Product correspondiente.
     * Errores: NotFoundException si no existe.
     */
     async findOne(id: number) {
         const productFind = await this.productsRepo.findOne({ where: { id } });
         if(!productFind) throw new NotFoundException(`Producto con id ${id} no encontrado`);
         return productFind;
     }

   async findByName(name: string): Promise<Product> {
    const product = await this.productsRepo
      .createQueryBuilder('product')
      .where('UPPER(product.name) = (:name)', { name: name.trim() })
      .getOne();

    if (!product) throw new NotFoundException(`Producto con nombre ${name} no encontrado`);
    return product;
  }

     /**
      * Crea un nuevo producto.
      * Recibe: datos del producto (CreateProductDto).
      * Devuelve: producto guardado en la base.
      */
     create(newProduct: CreateProductDto) {
            const productCreated = this.productsRepo.create(newProduct);
            return this.productsRepo.save(productCreated);
     }

     /**
      * Actualiza un producto existente.
      * Recibe: id (number) y datos modificados (UpdateProductDto).
      * Devuelve: producto actualizado.
      */
     async update(id: number, updateProduct: UpdateProductDto) {
            await this.productsRepo.update(id, updateProduct);
            return this.findOne(id);
         }

    /**
     * Elimina un producto por ID.
     * Recibe: id (number).
     * Devuelve: mensaje de confirmación.
     * Errores: BadRequestException si no existe el registro.
     */
    async remove(id: number) {
             const result = await this.productsRepo.delete(id);
             if (result.affected === 0) {
                 throw new BadRequestException(`Producto con id ${id} no encontrado`);
             }
             return { message: `Producto con id ${id} eliminado correctamente` };
         }
}
