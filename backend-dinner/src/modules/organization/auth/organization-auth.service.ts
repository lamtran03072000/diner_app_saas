import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../customers/customers.schema';
import { HashingService } from '../../../shared/hashing/hashing.service';
import { JwtService } from '../../../shared/jwt/jwt.service';

@Injectable()
export class OrganizationAuthService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string, orgId: string) {
    const user = await this.customerModel.findOne({ email, orgId });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await this.hashing.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const accessToken = this.jwt.signToken({
      sub: user._id.toString(),
      role: user.role,
      scope: 'ORG',
      orgId: orgId,
    });
    return {
      accessToken,
      user: { id: user._id.toString(), email: user.email, role: user.role },
      org: { id: orgId },
    };
  }
}


