import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { StorageService } from './storage.service';
import { STORAGE_CLIENT } from './storage.constants';

@Module({
  imports: [],
  providers: [
    {
      provide: STORAGE_CLIENT,
      useFactory: (config: ConfigService) => {
        return new Client({
          endPoint: config.getOrThrow<string>('MINIO_ENDPOINT'),
          port: config.getOrThrow<number>('MINIO_PORT'),
          useSSL: config.getOrThrow<boolean>('MINIO_USE_SSL'),
          accessKey: config.getOrThrow<string>('MINIO_ACCESS_KEY'),
          secretKey: config.getOrThrow<string>('MINIO_SECRET_KEY'),
        });
      },
      inject: [ConfigService],
    },
    StorageService,
  ],
  exports: [STORAGE_CLIENT, StorageService],
})
export class StorageModule {}
