import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ collection: 'schedules' })
export class Schedule {
  @Prop({ type: Date, required: true })
  time: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Table', required: true })
  tableId: string;

  @Prop({ type: Number, required: true })
  quantityPerson: number;

  @Prop()
  note?: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
ScheduleSchema.index({ storeId: 1, time: 1 });
ScheduleSchema.plugin(auditFieldsPlugin);


