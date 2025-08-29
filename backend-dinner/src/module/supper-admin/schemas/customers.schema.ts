import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

export enum CustomerPlan {
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

@Schema({
  timestamps: true,
  collection: 'customers',
})
export class Customer {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ lowercase: true, trim: true })
  billingEmail?: string;

  @Prop({ 
    type: String, 
    enum: CustomerPlan, 
    default: CustomerPlan.BASIC,
    index: true 
  })
  plan: CustomerPlan;

  @Prop({ default: true, index: true })
  isActive: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Create text index for search functionality
CustomerSchema.index({ name: 'text' });
