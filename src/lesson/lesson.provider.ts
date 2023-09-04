/**
 * this file is used to provide the lesson repository to the lesson module, which will be used in the lesson service.
 * The lesson repository is the repository for the lesson entity.
 */
import { DataSource } from 'typeorm';
import { Lesson } from './lession.entity';
export const LessonProviders = [
  {
    provide: 'Lesson_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lesson),
    inject: ['DATA_SOURCE'],
  },
];
