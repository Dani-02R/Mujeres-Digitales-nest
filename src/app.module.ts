import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';

/**
 * Módulo raíz de la aplicación.
 * 
 * Qué hace:
 * - Configura la aplicación NestJS.
 * - Carga variables de entorno globales (ConfigModule).
 * - Inicializa la conexión con MySQL mediante TypeORM.
 * - Importa los módulos principales: Users, Auth y Products.
 * 
 * Notas:
 * - `synchronize: true` solo debe usarse en desarrollo (sin migraciones manuales).
 * - Las entidades se cargan automáticamente gracias a `autoLoadEntities: true`.
 */
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // SOLO para desarrollo
        // logging: true,   // útil para depurar
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
