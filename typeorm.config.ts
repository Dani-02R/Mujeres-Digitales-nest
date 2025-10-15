import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product],
  migrations: ['./src/migrations/*.ts'],
});

// PORT=3000
// APP_NAME=MiAppNest
// DB_HOST=localhost
// DB_PORT=3306
// DB_USER=root
// DB_PASSWORD=toor
// DB_NAME=mi_app_nest_db

