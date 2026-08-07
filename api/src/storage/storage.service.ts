import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';
import { STORAGE_CLIENT } from './storage.constants';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly bucket: string;

  constructor(
    @Inject(STORAGE_CLIENT) private readonly client: Client,
    config: ConfigService,
  ) {
    this.bucket = config.getOrThrow<string>('MINIO_BUCKET');
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);

    if (!exists) {
      throw new Error(
        `бакет «${this.bucket}» не найден в объектном хранилище; ` +
          `создайте его в консоли MinIO на http://localhost:9001 ` +
          `или проверьте MINIO_BUCKET в .env`,
      );
    }
  }
}
