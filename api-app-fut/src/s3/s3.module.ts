import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
  imports: [],
  exports: [S3Service],
})
export class S3Module {}
