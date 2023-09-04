/**
 * this service is responsible for creating and getting lessons
 * The lesson service is the service for the lesson entity.
 */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from './lession.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lession.input';
interface LessonFilters {
  name?: string;
  search?: string;
}
@Injectable()
export class LessonService {
  constructor(
    @Inject('Lesson_REPOSITORY')
    private lessonRepository: Repository<Lesson>,
  ) {}
  async createLesson(createLession: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      name: createLession.name,
      description: createLession.description,
      startDate: createLession.startDate,
      endDate: createLession.endDate,
    });
    return await this.lessonRepository.save(lesson);
  }
  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({
      where: {
        _id: id,
      },
    });
  }
  async findAll(filters: LessonFilters, page: number): Promise<Lesson[]> {
    const query = this.lessonRepository.createQueryBuilder('lesson');
    try {
      if (filters.name) {
        query.andWhere('(LOWER(lesson.name) LIKE LOWER(:name))', {
          name: `%${filters.name}%`,
        });
      }
      if (filters.search) {
        query.andWhere(
          '(LOWER(lesson.name) LIKE LOWER(:name) OR lesson.description LIKE :description)',
          {
            name: `%${filters.search}%`,
            description: `%${filters.search}%`,
          },
        );
      }
      query
        .skip((page - 1) * 10) // Calculate how many records to skip (page - 1) * items per page
        .take(10); // Items per page;
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException(`No Orders found`);
    }
  }
}
