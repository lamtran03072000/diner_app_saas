import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { auditFieldsPlugin } from '../../../common/plugins/audit-fields.plugin';

export type UsersSupperAdminDocument = HydratedDocument<UsersSupperAdmin>;

@Schema({ collection: 'users_supper_admin' })
export class UsersSupperAdmin {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}

export const UsersSupperAdminSchema = SchemaFactory.createForClass(UsersSupperAdmin);
UsersSupperAdminSchema.index({ email: 1 }, { unique: true });
UsersSupperAdminSchema.plugin(auditFieldsPlugin);


