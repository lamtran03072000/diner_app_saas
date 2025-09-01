import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersSupperAdminService } from '../users-supper-admin/users-supper-admin.service';
import { HashingService } from '../../../shared/hashing/hashing.service';
import { JwtService } from '../../../shared/jwt/jwt.service';
import { SupperAdminRole } from '../../../common/enums/supper-admin-role.enum';

@Injectable()
export class SupperAdminAuthService {
  constructor(
    private readonly usersService: UsersSupperAdminService,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await this.hashing.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const accessToken = this.jwt.signToken({
      sub: user._id.toString(),
      role: user.role as SupperAdminRole,
      scope: 'SUPPER_ADMIN',
    });
    return {
      accessToken,
      user: { id: user._id.toString(), email: user.email, role: user.role },
    };
  }
}


