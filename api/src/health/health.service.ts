import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.module';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

@Injectable()
export class HealthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: ReturnType<typeof drizzle>,
  ) {}

  async check() {
    try {
      await this.db.execute(sql`select 1`);
      return { status: 'ok' };
    } catch (error) {
      console.log(error);
      return { status: 'error' };
    }
  }
}
