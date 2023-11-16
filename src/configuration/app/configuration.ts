import { registerAs } from '@nestjs/config';
import * as process from 'process'

export default registerAs('app', () => ({
  port: process.env.APP_PORT,
  backendUrl: process.env.APP_BACKEND_URL,
  frontendUrl: process.env.APP_FRONTEND_URL,
  adminPassword: process.env.APP_ADMIN_PASSWORD,
  name: process.env.APP_NAME
}));
