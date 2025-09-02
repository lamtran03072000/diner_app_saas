import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  auditFieldsPlugin,
  AuditFields,
} from '../../../common/plugins/audit-fields.plugin';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ collection: 'organizations' })
export class Organization implements AuditFields {
  @Prop({ required: true })
  name: string;

  @Prop()
  emailBling?: string;

  @Prop({ enum: ['pro', 'basic'], default: 'basic' })
  plan: 'pro' | 'basic';

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  // Audit fields added by plugin
  createdAt?: Date;
  createdBy?: string | null;
  updatedAt?: Date;
  updatedBy?: string | null;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.plugin(auditFieldsPlugin);
