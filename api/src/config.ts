import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  MINIO_ENDPOINT: z.string().min(1),
  MINIO_PORT: z.coerce.number().int().min(1).max(65535),
  MINIO_USE_SSL: z.stringbool(),
  MINIO_ACCESS_KEY: z.string().min(1),
  MINIO_SECRET_KEY: z.string().min(1),
  MINIO_BUCKET: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validate(raw: Record<string, unknown>): EnvConfig {
  return envSchema.parse(raw);
}
