import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ collection: 'stores' })
export class Store {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', required: true })
  orgId: string;

  @Prop({ required: true })
  name: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
StoreSchema.index({ orgId: 1 });
StoreSchema.plugin(auditFieldsPlugin);


