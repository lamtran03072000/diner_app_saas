import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UsersSupperAdmin,
  UsersSupperAdminDocument,
} from './users-supper-admin.schema';

@Injectable()
export class UsersSupperAdminService {
  constructor(
    @InjectModel(UsersSupperAdmin.name)
    private readonly userModel: Model<UsersSupperAdminDocument>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }
}
