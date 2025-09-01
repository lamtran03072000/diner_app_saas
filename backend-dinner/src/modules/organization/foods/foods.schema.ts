import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type FoodDocument = HydratedDocument<Food>;

@Schema({ collection: 'foods' })
export class Food {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Menu', required: true })
  menuId: string;

  @Prop({ required: true })
  type: string; // 'chien'|'luoc'|...

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Boolean, default: false })
  isHot: boolean;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
FoodSchema.index({ menuId: 1 });
FoodSchema.plugin(auditFieldsPlugin);


