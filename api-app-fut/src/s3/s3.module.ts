import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { MulterModule } from '@nestjs/platform-express';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
  imports: [MulterModule.register({
    dest: './files',
  })],
  exports: [S3Service],
})
export class S3Module {}
