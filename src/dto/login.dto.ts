import { IsEmail, MaxLength, MinLength } from "class-validator";

/**
 * DTO: LoginDTO
 * Uso: Inicio de sesión (POST /auth/login).
 *
 * Campos
 *  - email {string}    Correo registrado. (IsEmail)
 *  - password {string} Contraseña de 6–10 caracteres. (MinLength(6), MaxLength(10))
 *
 * Ejemplo de payload
 * {
 *   "email": "ada@example.com",
 *   "password": "aD4#x9"
 * }
 */


export class LoginDTO {
    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(10)
    password: string;
}