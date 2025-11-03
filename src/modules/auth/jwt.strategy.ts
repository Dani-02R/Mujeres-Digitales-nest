import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { sub: number; email: string; role: string; name?: string; age?: number }) {
    // Lo que se inyecta en req.user
    return { id: payload.sub, email: payload.email, role: payload.role, name: payload.name, age: payload.age };
  }
}
