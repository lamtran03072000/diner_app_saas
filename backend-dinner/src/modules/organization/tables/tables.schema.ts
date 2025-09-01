import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type TableDocument = HydratedDocument<Table>;

@Schema({ collection: 'tables' })
export class Table {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  quantityPerson: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
TableSchema.index({ storeId: 1, name: 1 }, { unique: true });
TableSchema.plugin(auditFieldsPlugin);


