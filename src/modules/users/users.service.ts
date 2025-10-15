import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm/repository/Repository.js';

/**
 * Servicio de usuarios.
 * Qué hace: contiene la lógica CRUD de los usuarios.
 * Dependencias: repositorio User.
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepo: Repository<User>
    ) {}

    /**
     * Obtiene todos los usuarios.
     * Recibe: —.
     * Devuelve: arreglo con registros User.
     */
    findAll() {
        return this.usersRepo.find();
    }

    /**
     * Obtiene un usuario por ID.
     * Recibe: id (number).
     * Devuelve: usuario correspondiente.
     * Errores: NotFoundException si no existe.
     */
    async findOne(id: number) {
         const userFind = await this.usersRepo.findOne({ where: { id } });
         if (!userFind) throw new NotFoundException('Usuario no encontrado')
         return userFind
     }

     /**
      * Crea un nuevo usuario.
      * Recibe: datos del usuario (CreateUserDTO).
      * Devuelve: usuario guardado en la base de datos.
      */
     create(newUser: CreateUserDTO) {
             const userCreated = this.usersRepo.create(newUser)
             return this.usersRepo.save(userCreated)
         }

     /**
      * Actualiza un usuario existente.
      * Recibe: id (number) y datos modificados (UpdateUserDTO).
      * Devuelve: usuario actualizado.
      */
     async update(id: number, updateUser: UpdateUserDTO) {
        await this.usersRepo.update(id, updateUser);
        return this.findOne(id);
     }

     /**
      * Elimina un usuario por ID.
      * Recibe: id (number).
      * Devuelve: mensaje de confirmación.
      * Errores: BadRequestException si no existe el registro.
      */
      async remove(id: number) {
         const result = await this.usersRepo.delete(id);
         if (result.affected === 0) {
             throw new BadRequestException(`Usuario con id ${id} no encontrado`);
         }
         return { message: `Usuario con id ${id} eliminado correctamente` };
     }

}
