// imports más limpios
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCreated = this.userRepo.create({ ...data, password: hashedPassword });
    await this.userRepo.save(userCreated);
    return {
      message: 'Usuario creado exitosamente',
      user: { id: userCreated.id, name: userCreated.name, email: userCreated.email, age: userCreated.age },
    };
  }

  async login(data: LoginDTO) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales invalidas');

    // ⬇️ Claims en la RAÍZ (no en `user`)
    const payload = { sub: user.id, email: user.email, role: user.role, name: user.name, age: user.age };
    const token = await this.jwtService.signAsync(payload);

    return { accessToken: token };
  }
}
