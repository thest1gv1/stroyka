import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  companies,
  event_files,
  events,
  files,
  objects,
  stages,
} from './schema';

config({ path: '../.env' });

async function main() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      'переменная DATABASE_URL не задана; проверьте .env в корне проекта, образец — .env.example',
    );
  }

  const client = postgres(url);
  const db = drizzle(client);

  await db.delete(event_files);
  await db.delete(events);
  await db.delete(files);
  await db.delete(stages);
  await db.delete(objects);
  await db.delete(companies);

  const [company] = await db
    .insert(companies)
    .values({ name: 'Контур' })
    .returning();

  const [object] = await db
    .insert(objects)
    .values({ company_id: company.id, name: 'Квартира 78 м², ЖК Панорама' })
    .returning();

  await db.insert(stages).values([
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Замер и техзадание',
      order_index: 1,
      status: 'done',
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Планировочное решение',
      order_index: 2,
      status: 'done',
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Концепция',
      order_index: 3,
      status: 'active',
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: '3D-визуализации',
      order_index: 4,
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Рабочая документация',
      order_index: 5,
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Ведомости и спецификации',
      order_index: 6,
    },
    {
      company_id: company.id,
      object_id: object.id,
      name: 'Авторский надзор',
      order_index: 7,
    },
  ]);

  console.log(
    'Ссылка для заказчика:',
    `http://localhost:3000/p/${object.invite_token}`,
  );

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
