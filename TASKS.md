# Задачи

Порядок строгий. Следующая задача берётся только после приёмки предыдущей.

- [ ] 1. Инфраструктура: docker-compose (Postgres, MinIO, Redis), `.env` + `.env.example`
- [ ] 2. Каркас Nest: конфиг с валидацией env, `GET /health` с `SELECT 1`
- [ ] 3. Схема на Drizzle + миграции + сид (объект с 11 этапами, 6-й active, печатает invite-ссылку)
- [ ] 4. Загрузка файлов: `POST /files` → MinIO, превью через sharp, дата съёмки через exifr
- [ ] 5. События: `POST /events`, `GET /objects/:id/events`
- [ ] 6. Авторизация: сессии для сотрудника и заказчика, guard по `company_id`
- [ ] 7. Экран менеджера на Next.js: форма фотоотчёта, публикация, завершение этапа
- [ ] 8. Страница заказчика по инвайт-ссылке: шапка, индикатор этапов, лента, пустое состояние
- [ ] 9. Деплой на VPS с HTTPS и автобэкапом базы

---

## Задача 1 — в работе

Поднять локальную инфраструктуру: Postgres, MinIO, Redis в контейнерах.

### Шаги

- [x] Папка проекта, `git init`
- [x] `.gitignore`
- [x] 1a. Установить Docker Desktop (WSL2 + Docker 29.6.2, Compose v5.3.1)
- [x] 1b. `docker-compose.yml` с тремя сервисами и именованными томами
- [x] 1c. `.env` и `.env.example`
- [x] 1d. Поднять контейнеры
- [x] 1e. Создать бакет `photos` в консоли MinIO (Access: PRIVATE)
- [x] 1f. Проверить, что данные переживают перезапуск

### Критерий приёмки

- `docker version` и `docker run --rm hello-world` отрабатывают без ошибок
- `docker compose ps` показывает три запущенных сервиса
- Консоль MinIO открывается, бакет `photos` на месте
- После `docker compose down` + `docker compose up -d` бакет и данные Postgres на месте
- `.env` не попал в git, `.env.example` попал

### Окружение (проверено)

git 2.50.0 · Node 22.14.0 · npm 10.9.2 · Docker 29.6.2 · Compose v5.3.1 · WSL2 + Ubuntu
