import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

/**
 * DTO: UpdateProductDto
 * Uso: Actualización de producto (PUT/PATCH /products/:id).
 *
 * Hereda de: CreateProductDto
 *  - name {string}
 *  - description {string}
 *  - price {number}
 *
 *
 * Ejemplo de payload (PUT completo)
 * {
 *   "name": "Café Premium 1kg",
 *   "description": "Origen único, tostado oscuro",
 *   "price": 44990
 * }
 */


export class UpdateProductDto extends CreateProductDto {
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
