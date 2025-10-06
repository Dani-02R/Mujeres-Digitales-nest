export type IUser = { 
    id: number, 
    name: string, 
    email: string, 
    password: string, 
    age?: number 
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
 */