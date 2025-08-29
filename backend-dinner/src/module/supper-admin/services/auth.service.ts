import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';
import { SupperAdminUsersService } from './supper-admin-users.service';
import { LoginDto } from '../dto/login.dto';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private supperAdminUsersService: SupperAdminUsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    // Find user by email with password
    const user = await this.supperAdminUsersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const accessToken = this.jwtService.generateToken(
      (user._id as any).toString(),
      user.email,
      user.role,
    );

    return {
      accessToken,
      user: {
        id: (user._id as any).toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.supperAdminUsersService.findOne(userId);
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }
}
