import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: process.env.URI_MONGO ?? 'mongodb://localhost:27017/myappdb',
  dbName: process.env.MONGO_DB_NAME ?? 'myappdb',
}));


