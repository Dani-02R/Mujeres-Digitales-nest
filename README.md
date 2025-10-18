# 🌸 Mujeres Digitales — Backend API + Talleres + Ejercicios

[![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?logo=nestjs&logoColor=white)](#-api-backend-mi-app-nest)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#-tecnolog%C3%ADas)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](#-instalaci%C3%B3n-r%C3%A1pida)
[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-pink)]()
[![License](https://img.shields.io/badge/License-MIT-green)](#-licencia)

> Proyecto desarrollado dentro del programa **Mujeres Digitales**.  
> Incluye una **API REST (NestJS)** con autenticación **JWT** y **roles/guards**, además de **talleres** y **ejercicios** prácticos.

---

## 🗂️ Contenido del repositorio

```
Mujeres-Digitales-nest/
├─ mi-app-nest/          # 🧠 API principal con NestJS (auth, roles, users, products)
│  └─ src/
│     ├─ common/         # Pipes & utils (p.ej., parse-uppertrim.pipe, translate util)
│     ├─ dto/            # Data Transfer Objects (create-user, login, create-product)
│     ├─ entities/       # (si aplica) Entidades TypeORM
│     ├─ modules/
│     │  ├─ auth/        # JWT strategy, guards, roles decorator
│     │  ├─ users/       # Users controller/service/module
│     │  └─ products/    # Products controller/service/module
│     ├─ app.module.ts
│     └─ main.ts
│
├─ Talleres/             # 🎓 Talleres prácticos
│  ├─ cajero.js
│  └─ calculadora.js
│
└─ Ejercicios/           # 🧩 Ejercicios base
   ├─ par-impar.js
   ├─ tablaMultiplicar.js
   └─ teoria.js
```

---

## 🚀 API Backend — `mi-app-nest`

**Stack**: NestJS · TypeScript · (TypeORM/DB si aplica) · JWT · Passport · class-validator · bcrypt

### 🔐 Autenticación y autorización
- **Login / Register** con **JWT** (genera `access token`).
- **JwtStrategy** (Passport) para validar tokens.
- **Roles** con decorador `@Roles(...)` y **RolesGuard** para proteger endpoints por permisos.
- **ValidationPipe global** (DTOs).

**Ejemplo de protección por rol**:
```ts
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('users')
findAll() { ... }
```

### 📦 Estructura destacada (src/)
- `common/pipes/parse-uppertrim.pipe.ts` — ejemplo de pipe personalizado.
- `common/utils/translate.ts` — utilidades compartidas.
- `dto/create-user.dto.ts`, `dto/login.dto.ts`, `dto/create-product.dto.ts` — validación de entrada.
- `modules/auth/` — `auth.controller`, `auth.service`, `jwt.strategy`, `roles.guard`, `roles.decorator`.
- `modules/users/` — CRUD de usuarios.
- `modules/products/` — CRUD de productos.

> **Tip**: si usas TypeORM, incluye tus `entities/` y `migrations/` y documenta los comandos de migración.

---

## 🧪 Endpoints principales (referencia)

| Método | Ruta               | Descripción                     | Protegido |
|:------:|--------------------|---------------------------------|:---------:|
| POST   | `/auth/register`   | Registro de usuario             |   ❌      |
| POST   | `/auth/login`      | Login → `access token`          |   ❌      |
| GET    | `/auth/profile`    | Perfil del usuario autenticado  |   ✅      |
| GET    | `/users`           | Listado de usuarios             | ✅ `admin`|
| CRUD   | `/products`        | Gestión de productos            |   ✅      |

> Agrega aquí cualquier ruta extra que exponga tu API (filtros, búsquedas, etc.).

---

## 🧠 Talleres y ejercicios

- **Talleres/**
  - `cajero.js`: lógica de *cash dispenser* (retirar, validar, componer billetes, etc.).
  - `calculadora.js`: operaciones básicas, validaciones, manejo de entradas.

- **Ejercicios/**
  - `par-impar.js`: condicionales y aritmética.
  - `tablaMultiplicar.js`: bucles, formateo de salida.
  - `teoria.js`: apuntes/teoría de apoyo.

> Sugerencia: añade README individuales dentro de cada taller con **objetivo**, **pasos**, **retos** y **solución**.

---

## ⚙️ Instalación rápida

```bash
# Clonar el repo
git clone https://github.com/Dani-02R/Mujeres-Digitales-nest.git
cd Mujeres-Digitales-nest/mi-app-nest

# Instalar dependencias
npm install

# Variables de entorno (crear .env si aplica)
# Ejemplo:
# JWT_SECRET_KEY=tu_clave_super_secreta
# JWT_EXPIRES_IN=1h
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASS=tu_password
# DB_NAME=mujeres_digitales_db

# Desarrollo
npm run start:dev
# API en http://localhost:3000
```

> **Opcional (TypeORM):**  
> `npm run typeorm migration:run` para aplicar migraciones.

---

## 🔧 Scripts útiles

```bash
npm run start         # producción (compilado)
npm run start:dev     # desarrollo con watch
npm run build         # compilar TypeScript → dist
# npm run test        # (si tienes tests)
# npm run typeorm ... # (si usas CLI de TypeORM)
```

---

## 🛡️ Buenas prácticas incluidas
- **DTOs + ValidationPipe** para inputs confiables.
- **Guards** (`JwtAuthGuard`, `RolesGuard`) para seguridad por capa.
- **Módulos desacoplados** (auth, users, products).
- **Código limpio** con utils/pipes reutilizables.

---

## 🌱 Roadmap sugerido
- Documentación con **Swagger** (`@nestjs/swagger`).
- **Pagination & filtering** en listados.
- **Seeding** de datos iniciales.
- Tests unitarios e integración.
- Dockerización (si planeas despliegue).

---

## 👩‍💻 Autora

**Heidy Daniela Romero Aguiar**  
Proyecto del programa **Mujeres Digitales**.  
GitHub: [Dani-02R](https://github.com/Dani-02R)

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia **MIT**. ¡Úsalo, aprende y mejora! 🌷
