import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { HealthModule } from './health/health.module';
import { StorageModule } from './storage/storage.module';

const configModule = ConfigModule.forRoot({
  validate,
  isGlobal: true,
  envFilePath: '../.env',
});

@Module({
  imports: [configModule, DatabaseModule, HealthModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
