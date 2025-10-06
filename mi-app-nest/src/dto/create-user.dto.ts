import { IsEmail, IsInt, IsNotEmpty, IsOptional, max, MaxLength, Min, MinLength, Max} from "class-validator";

/**
 * DTO: CreateUserDTO
 * Uso: Registro de usuario (POST /auth/register).
 *
 * Campos
 *  - name {string}          Nombre público del usuario. (IsNotEmpty)
 *  - email {string}         Correo único del usuario. (IsNotEmpty, IsEmail)
 *  - password {string}      Contraseña de 6–10 caracteres. (IsNotEmpty, MinLength(6), MaxLength(10))
 *  - age? {number}          Edad opcional entre 18 y 100. (IsOptional, IsInt, Min(18), Max(100))
 *
 *
 * Ejemplo de payload
 * {
 *   "name": "Ada Lovelace",
 *   "email": "ada@example.com",
 *   "password": "aD4#x9",
 *   "age": 28
 * }
 */


export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsOptional()
    @IsInt()
    @Min(18,{ message: "La edad debe ser mayor o igual a 18" })
    @Max(100,{ message: "Segun el promedio de vida en Colombia, la edad debe ser menor o igual a 100" })
    age?: number;
}