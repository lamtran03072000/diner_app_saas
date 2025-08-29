import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerUserDocument = CustomerUser & Document;

export enum CustomerOrgRole {
  OWNER = 'owner',
  ORG_ADMIN = 'org_admin',
  BILLING_ADMIN = 'billing_admin',
  MEMBER = 'member',
}

@Schema({
  timestamps: true,
  collection: 'customer_users',
})
export class CustomerUser {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true, index: true })
  customerId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ 
    required: true, 
    lowercase: true, 
    trim: true 
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ 
    type: String, 
    enum: CustomerOrgRole, 
    default: CustomerOrgRole.MEMBER 
  })
  orgRole: CustomerOrgRole;

  @Prop({ default: true })
  isActive: boolean;
}

export const CustomerUserSchema = SchemaFactory.createForClass(CustomerUser);

// Create compound unique index for customerId + email
CustomerUserSchema.index({ customerId: 1, email: 1 }, { unique: true });
