import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ collection: 'customers' })
export class Customer {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', required: true })
  orgId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.index({ orgId: 1, email: 1 }, { unique: true });
CustomerSchema.plugin(auditFieldsPlugin);


