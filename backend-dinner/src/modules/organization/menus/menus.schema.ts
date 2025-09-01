import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ collection: 'menus' })
export class Menu {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', required: true })
  orgId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  isDefault: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
MenuSchema.index({ orgId: 1, isDefault: 1 });
MenuSchema.plugin(auditFieldsPlugin);


