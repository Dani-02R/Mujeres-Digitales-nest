import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Migración: seedUserProduct17596286951000
 * 
 * Objetivo:
 * - Insertar datos de ejemplo (semillas) en las tablas `user` y `product`.
 * 
 * Método up():
 * - Inserta 2 registros en la tabla `user` con nombres, correos y edades.
 * - Inserta 2 registros en la tabla `product` con nombres, descripciones y precios.
 * 
 * Método down():
 * - Elimina los registros insertados (por id = 1 y 2) de ambas tablas.
 * 
 * Notas:
 * - Ideal para entorno de desarrollo o pruebas iniciales.
 * - Las contraseñas en texto plano son solo demostrativas (no para producción).
 */


export class seedUserProduct17596286951000 implements MigrationInterface {
    name = 'seedUserProduct17596286951000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO user (name, email, password, age) VALUES
            ( 'John Doe', 'john.doe@example.com', 'password123', 30),
            ( 'Jane Smith', 'jane.smith@example.com', 'password456', 25)
        `);

        await queryRunner.query(`
            INSERT INTO product (name, description, price) VALUES
            ( 'Televisor', 'electronico de consumo', 100),
            ( 'Computadora', 'dispositivo informatico', 200)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "product" WHERE id IN (1, 2)
        `);

        await queryRunner.query(`
            DELETE FROM "user" WHERE id IN (1, 2)
        `);
    }

}
