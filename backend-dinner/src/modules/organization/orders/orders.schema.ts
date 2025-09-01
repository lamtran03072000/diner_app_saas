import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';
import { OrderStatus } from '../../../common/enums/order-status.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ collection: 'order_food' })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Table', required: true })
  tableId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: string;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({
    type: [
      {
        foodId: { type: MongooseSchema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true },
        note: { type: String },
      },
    ],
    default: [],
  })
  listFood: Array<{ foodId: string; quantity: number; note?: string }>;

  @Prop({ enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ storeId: 1, tableId: 1, status: 1 });
OrderSchema.plugin(auditFieldsPlugin);


