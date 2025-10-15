import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrPrivateKey: process.env.JWT_SECRET_KEY
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        })
        console.log('JWT Strategy initialized');
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email }
    }
}