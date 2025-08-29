import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomerUser, CustomerUserDocument } from '../schemas/customer-users.schema';

@Injectable()
export class SupperAdminCustomerUsersService {
  constructor(
    @InjectModel(CustomerUser.name)
    private customerUserModel: Model<CustomerUserDocument>,
  ) {}

  async findByEmail(customerId: string, email: string): Promise<CustomerUserDocument | null> {
    return this.customerUserModel.findOne({
      customerId: new Types.ObjectId(customerId),
      email: email.toLowerCase(),
    }).exec();
  }

  async findById(id: string): Promise<CustomerUserDocument | null> {
    return this.customerUserModel.findById(id).exec();
  }

  async findByCustomerId(customerId: string): Promise<CustomerUser[]> {
    return this.customerUserModel.find({
      customerId: new Types.ObjectId(customerId),
    }).exec();
  }

  async createOwner(customerId: string, ownerData: {
    fullName: string;
    email: string;
    passwordHash: string;
  }): Promise<CustomerUser> {
    const owner = new this.customerUserModel({
      customerId: new Types.ObjectId(customerId),
      fullName: ownerData.fullName,
      email: ownerData.email.toLowerCase(),
      passwordHash: ownerData.passwordHash,
      orgRole: 'owner',
      isActive: true,
    });

    return owner.save();
  }

  sanitize(userDoc: CustomerUserDocument): Partial<CustomerUser> {
    const userObj = userDoc.toObject();
    delete (userObj as any).passwordHash;
    return userObj;
  }
}
