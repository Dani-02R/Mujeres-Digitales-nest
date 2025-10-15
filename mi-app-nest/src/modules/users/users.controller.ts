import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
/**
 * Controlador de usuarios.
 * Ruta base: /users
 * Expone endpoints CRUD para gestión de usuarios.
 */
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * GET /users
     * Qué hace: obtiene todos los usuarios registrados.
     * Recibe: —.
     * Devuelve: lista de usuarios.
     */
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    /**
     * GET /users/:id
     * Qué hace: obtiene un usuario por su ID.
     * Recibe: id (param).
     * Devuelve: usuario correspondiente.
     * Errores: 404 si no existe.
     */
     @Get(':id')
     findOne(@Param('id') id: string) {
         return this.usersService.findOne(Number(id))
     }

     /**
      * POST /users
      * Qué hace: crea un nuevo usuario.
      * Recibe: cuerpo con los datos del usuario (CreateUserDTO).
      * Devuelve: usuario creado.
      */
     @Post()
     create(@Body() body: CreateUserDTO) {
         return this.usersService.create(body);
     }

     /**
      * PUT /users/:id
      * Qué hace: actualiza un usuario existente.
      * Recibe: id (param) y cuerpo con datos modificados (UpdateUserDTO).
      * Devuelve: usuario actualizado.
      */
     @Put(':id')
     update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
         return this.usersService.update(Number(id), body)
     }

     /**
      * DELETE /users/:id
      * Qué hace: elimina un usuario por su ID.
      * Recibe: id (param).
      * Devuelve: mensaje de confirmación.
      * Errores: 400 si el usuario no existe.
      */
     @Delete(':id')
     remove(@Param('id') id: string) {
         return this.usersService.remove(Number(id))
     }
}
