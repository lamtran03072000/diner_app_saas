import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupperAdminUserDocument = SupperAdminUser & Document;

export enum SupperAdminRole {
  SUPER_ADMIN = 'super_admin',
  OPERATOR = 'operator',
  SUPPORT = 'support',
}

@Schema({
  timestamps: true,
  collection: 'supper_admin_users',
})
export class SupperAdminUser {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true 
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ 
    type: String, 
    enum: SupperAdminRole, 
    default: SupperAdminRole.SUPPORT,
    index: true 
  })
  role: SupperAdminRole;

  @Prop({ default: true })
  isActive: boolean;
}

export const SupperAdminUserSchema = SchemaFactory.createForClass(SupperAdminUser);
