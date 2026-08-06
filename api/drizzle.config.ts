import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '../.env' });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    'переменная DATABASE_URL не задана; проверьте .env в корне проекта, образец — .env.example',
  );
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: url,
  },
});
