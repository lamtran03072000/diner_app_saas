import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3030', 10),
  jwtSecret: process.env.JWT_SECRET ?? 'change_me',
  jwtTtl: process.env.JWT_TTL ?? '1d',
}));


