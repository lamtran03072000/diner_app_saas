import { Schema, SchemaOptions } from 'mongoose';

export interface AuditFields {
  createdAt?: Date;
  createdBy?: string | null;
  updatedAt?: Date;
  updatedBy?: string | null;
}

export function auditFieldsPlugin(schema: Schema, options?: SchemaOptions) {
  schema.add({
    createdBy: { type: Schema.Types.ObjectId, default: null },
    updatedBy: { type: Schema.Types.ObjectId, default: null },
  });

  schema.set('timestamps', true);
}


