import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

/**
 * Controlador de usuarios.
 * Ruta base: /users
 * Expone endpoints CRUD para gestión de usuarios.
 */
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * GET /users
     * Qué hace: obtiene todos los usuarios registrados.
     * Recibe: —.
     * Devuelve: lista de usuarios.
     */
    @Get()
    @Roles(RolesEnum.ADMIN)
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
     @Roles(RolesEnum.ADMIN)
     findOne(@Param('id', ParseIntPipe) id: number) {
         return this.usersService.findOne(id)
     }

     /**
      * POST /users
      * Qué hace: crea un nuevo usuario.
      * Recibe: cuerpo con los datos del usuario (CreateUserDTO).
      * Devuelve: usuario creado.
      */
     @Post()
     @Roles(RolesEnum.ADMIN)
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
     @Roles(RolesEnum.ADMIN)
     update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
         return this.usersService.update(id, body)
     }

     /**
      * DELETE /users/:id
      * Qué hace: elimina un usuario por su ID.
      * Recibe: id (param).
      * Devuelve: mensaje de confirmación.
      * Errores: 400 si el usuario no existe.
      */
     @Delete(':id')
     @Roles(RolesEnum.ADMIN)
     remove(@Param('id', ParseIntPipe) id: number) {
         return this.usersService.remove(id)
     }
}
