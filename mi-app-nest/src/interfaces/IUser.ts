import { Roles } from "src/entities/user.entity"

export type IUser = { 
    id: number, 
    name: string, 
    email: string, 
    password: string, 
    age?: number ,
    role: Roles
}

/**
 * Interfaz IUser
 * 
 * Qué representa:
 * - Estructura base de un usuario dentro del sistema.
 * 
 * Campos:
 *  - id {number} Identificador único del usuario.
 *  - name {string} Nombre público.
 *  - email {string} Correo electrónico único.
 *  - password {string} Contraseña almacenada (hash o texto plano en dev).
 *  - age? {number} Edad opcional del usuario.
 *  - role {string} Rol del usuario para control de acceso.
 */