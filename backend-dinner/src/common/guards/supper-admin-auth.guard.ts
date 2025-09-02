import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '../../shared/jwt/jwt.service';

@Injectable()
export class SupperAdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;
    if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = auth.slice('Bearer '.length);
    const payload = this.jwtService.verifyToken(token);
    if (payload.scope !== 'SUPPER_ADMIN') {
      throw new ForbiddenException('Invalid scope');
    }
    req.user = { sub: payload.sub, role: payload.role };

    return true;
  }
}
