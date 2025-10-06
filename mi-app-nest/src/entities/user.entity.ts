import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad: User
 * Representa los usuarios registrados en el sistema.
 * Contiene credenciales y datos básicos del perfil.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /** Nombre público o identificador legible del usuario. */
  @Column({ nullable: false })
  name: string;

  /** Correo único del usuario, utilizado para autenticación. */
  @Column({ nullable: false, unique: true })
  email: string;

  /** Contraseña en texto cifrado (nunca almacenar sin hash). */
  @Column({ nullable: false })
  password: string;

  /** Edad opcional del usuario; puede ser nula. */
  @Column({ nullable: true })
  age: number;
}
