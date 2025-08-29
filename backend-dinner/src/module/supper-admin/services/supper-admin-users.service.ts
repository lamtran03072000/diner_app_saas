import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { 
  SupperAdminUser, 
  SupperAdminUserDocument,
  SupperAdminRole 
} from '../schemas/supper-admin-users.schema';
import { CreateSupperAdminUserDto } from '../dto/create-supper-admin-user.dto';

@Injectable()
export class SupperAdminUsersService {
  constructor(
    @InjectModel(SupperAdminUser.name)
    private supperAdminUserModel: Model<SupperAdminUserDocument>,
  ) {}

  async create(dto: CreateSupperAdminUserDto) {
    // Normalize email to lowercase and trim
    const normalizedEmail = dto.email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await this.supperAdminUserModel.findOne({ 
      email: normalizedEmail 
    }).exec();
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password with salt rounds = 10
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create new user document
    const newUser = new this.supperAdminUserModel({
      fullName: dto.fullName.trim(),
      email: normalizedEmail,
      passwordHash,
      role: dto.role || SupperAdminRole.SUPPORT,
      isActive: true,
    });

    const savedUser = await newUser.save();

    // Sanitize response: convert to object and remove passwordHash
    const sanitizedUser = savedUser.toObject();
    delete (sanitizedUser as any).passwordHash;

    return sanitizedUser;
  }

  // Additional methods for future use
  async findAll(): Promise<Partial<SupperAdminUser>[]> {
    const users = await this.supperAdminUserModel.find().exec();
    return users.map(user => {
      const userObj = user.toObject();
      delete (userObj as any).passwordHash;
      return userObj;
    });
  }

  async findOne(id: string): Promise<Partial<SupperAdminUser> | null> {
    const user = await this.supperAdminUserModel.findById(id).exec();
    if (user) {
      const userObj = user.toObject();
      delete (userObj as any).passwordHash;
      return userObj;
    }
    return null;
  }

  async findByEmail(email: string): Promise<Partial<SupperAdminUser> | null> {
    const user = await this.supperAdminUserModel.findOne({ 
      email: email.toLowerCase() 
    }).exec();
    if (user) {
      const userObj = user.toObject();
      delete (userObj as any).passwordHash;
      return userObj;
    }
    return null;
  }

  async findByEmailWithPassword(email: string): Promise<SupperAdminUserDocument | null> {
    return this.supperAdminUserModel.findOne({ 
      email: email.toLowerCase() 
    }).exec();
  }

  async findByRole(role: SupperAdminRole): Promise<Partial<SupperAdminUser>[]> {
    const users = await this.supperAdminUserModel.find({ role }).exec();
    return users.map(user => {
      const userObj = user.toObject();
      delete (userObj as any).passwordHash;
      return userObj;
    });
  }
}
