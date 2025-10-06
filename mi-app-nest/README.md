# 🚀 API REST con NestJS, TypeORM y MySQL - Mujeres Digitales

## 📖 Descripción  
Proyecto backend desarrollado con **NestJS**, conectado a **MySQL** mediante **TypeORM**, que incluye módulos para autenticación, usuarios y productos.  
Cada módulo cuenta con controladores, servicios, entidades y DTOs con validaciones.

---

## ⚙️ Tecnologías principales  
- NestJS  
- TypeORM  
- MySQL  
- class-validator / class-transformer  
- @nestjs/config  

---

## 🧱 Estructura general  
```
src/
 ├── dto/           → Validación de datos de entrada
 ├── entities/      → Entidades de base de datos (TypeORM)
 ├── interfaces/    → Modelos y contratos de datos
 ├── migrations/    → Migraciones y semillas
 ├── modules/       → Auth, Users y Products
 ├── app.module.ts  → Configuración global
 └── main.ts        → Punto de arranque del servidor
```

---

## ⚡ Configuración rápida  

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Configurar entorno
Crea un archivo `.env` con tus datos:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=nestjs_db
PORT=3000
```

### 3️⃣ Ejecutar migraciones
```bash
npm run build
npm run typeorm migration:run
```

### 4️⃣ Iniciar servidor
```bash
npm run start:dev
```
> Disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📚 Endpoints principales  

### 🔐 Auth  
- `POST /auth/login` → Inicia sesión con email y contraseña.

### 👤 Users  
- `GET /users` → Lista usuarios.  
- `GET /users/:id` → Obtiene un usuario.  
- `POST /users` → Crea usuario.  
- `PUT /users/:id` → Actualiza usuario.  
- `DELETE /users/:id` → Elimina usuario.

### 🛒 Products  
- `GET /products` → Lista productos.  
- `GET /products/:id` → Obtiene producto.  
- `POST /products` → Crea producto.  
- `PUT /products/:id` → Actualiza producto.  
- `DELETE /products/:id` → Elimina producto.

---

## 🔧 Notas  
- Las contraseñas se comparan en texto plano (solo para desarrollo).  
- En producción se recomienda usar **bcrypt** y **JWT**.  
- `synchronize: true` en TypeORM debe desactivarse en producción.

---

## 👨‍💻 Autor  
**Heidy Romero - Mujeres digitales**  
> _“Código limpio, mente tranquila.”_
