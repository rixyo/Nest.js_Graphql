/**
 * This is the module for lesson entity. It imports the DataSourceModule, which is the module for the database connection.
 * It also imports the LessonProviders, which is the provider for the lesson entity.
 * It also imports the LessonResolver, which is the resolver for the lesson entity.
 * It also imports the LessonService, which is the service for the lesson entity.
 */
import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { DataSourceModule } from 'src/datasource/datasource.module';
import { LessonProviders } from './lesson.provider';

@Module({
  imports: [DataSourceModule],
  providers: [LessonResolver, LessonService, ...LessonProviders],
})
export class LessonModule {}
