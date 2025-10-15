import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrPrivateKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email }
    }
}