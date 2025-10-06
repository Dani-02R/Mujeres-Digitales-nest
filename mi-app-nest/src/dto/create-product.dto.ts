import { IsInt, IsNotEmpty } from "class-validator";

/**
 * DTO: CreateProductDto
 * Uso: Cuerpo de petición para crear un producto (POST /products).
 *
 * Campos
 *  - name {string}        Nombre comercial del producto. (IsNotEmpty)
 *  - description {string} Descripción corta del producto. (IsNotEmpty)
 *  - price {number}       Precio entero en la moneda del sistema. (IsNotEmpty, IsInt)
 *
 * Ejemplo de payload
 * {
 *   "name": "Café Premium 500g",
 *   "description": "Café de origen único, tostado medio",
 *   "price": 24990
 * }
 */


export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    price: number;
}