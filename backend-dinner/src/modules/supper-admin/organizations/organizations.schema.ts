import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ collection: 'organizations' })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  emailBling?: string;

  @Prop({ enum: ['pro', 'basic'], default: 'basic' })
  plan: 'pro' | 'basic';

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.plugin(auditFieldsPlugin);


