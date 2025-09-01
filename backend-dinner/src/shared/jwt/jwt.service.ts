import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, JwtPayload, SignOptions } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  signToken(payload: Record<string, any>): string {
    const secret = this.config.get<string>('app.jwtSecret') ?? 'change_me';
    const ttl = this.config.get<string>('app.jwtTtl') ?? '1d';
    const expiresIn: number | string = /^\d+$/.test(ttl) ? parseInt(ttl, 10) : ttl;
    return sign(payload, secret, { expiresIn } as SignOptions);
  }

  verifyToken(token: string): JwtPayload & Record<string, any> {
    const secret = this.config.get<string>('app.jwtSecret') ?? 'change_me';
    return verify(token, secret) as JwtPayload & Record<string, any>;
  }
}


