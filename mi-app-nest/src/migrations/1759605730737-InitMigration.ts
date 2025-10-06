import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Migración: InitMigration1759605730737
 * 
 * Objetivo:
 * - Crear las tablas iniciales `user` y `product` en la base de datos.
 * 
 * Detalles:
 * - Tabla `user`:
 *    - Campos: id, name, email (único), password, age (opcional)
 *    - Índice único en el campo `email`
 * - Tabla `product`:
 *    - Campos: id, name, description, price (decimal con precisión 10,2)
 * 
 * Método up():
 * - Crea las estructuras de ambas tablas usando InnoDB.
 * 
 * Método down():
 * - Elimina las tablas `product` y `user`.
 * - Borra el índice único de `email` antes de eliminar la tabla `user`.
 * 
 * Notas:
 * - Esta migración representa la estructura base del esquema inicial del proyecto.
 */


export class InitMigration1759605730737 implements MigrationInterface {
  name = 'InitMigration1759605730737'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`age\` int NULL,
        UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`product\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`description\` varchar(255) NOT NULL,  -- usa TEXT si lo prefieres
        \`price\` decimal(10,2) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `product`');
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
  }
}
