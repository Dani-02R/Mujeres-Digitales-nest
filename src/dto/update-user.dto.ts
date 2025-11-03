import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import { Roles, RolesEnum } from "src/entities/user.entity";

/**
 * DTO: UpdateUserDTO
 * Uso: Actualización de usuario (PUT/PATCH /users/:id).
 *
 * Hereda de: CreateUserDTO
 *  - name {string}
 *  - email {string}
 *  - password {string}
 *  - age? {number}
 *
 * Ejemplo de payload (PUT completo)
 * {
 *   "name": "Ada L.",
 *   "email": "ada.new@example.com",
 *   "password": "N3w#Pwd",
 *   "age": 30
 * }
 */


export class UpdateUserDTO extends CreateUserDTO {
    @IsNotEmpty()
    role: RolesEnum
}