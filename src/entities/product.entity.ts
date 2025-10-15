import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad: Product
 * Representa la tabla de productos en la base de datos.
 * Incluye información básica como nombre, descripción y precio.
 */
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  /** Nombre comercial del producto (obligatorio). */
  @Column({ nullable: false })
  name: string;

  /** Descripción corta o detalle del producto (obligatorio). */
  @Column({ nullable: false })
  description: string;

  /**
   * Precio del producto, con precisión de 10 dígitos y 2 decimales.
   * Ejemplo: 19999.99
   */
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;
}
