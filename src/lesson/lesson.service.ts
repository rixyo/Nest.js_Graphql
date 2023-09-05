/**
 * this service is responsible for creating and getting lessons
 * The lesson service is the service for the lesson entity.
 */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from './lession.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lession.input';
import { AssignStudentToLession } from './assign-student-to-lession.input';
import { Student } from 'src/student/student.entity';
interface LessonFilters {
  name?: string;
  search?: string;
}
@Injectable()
export class LessonService {
  constructor(
    @Inject('Lesson_REPOSITORY')
    private lessonRepository: Repository<Lesson>,
    @Inject('Student_REPOSITORY')
    private studentRepository: Repository<Student>,
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
    const query = this.lessonRepository.createQueryBuilder('lesson');
    query.leftJoinAndSelect('lesson.students', 'student');
    query.where('lesson._id = :id', { id });
    return await query.getOne();
  }
  async findAll(filters: LessonFilters, page: number): Promise<Lesson[]> {
    const query = this.lessonRepository.createQueryBuilder('lesson');
    query.leftJoinAndSelect('lesson.students', 'student');
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
  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentToLession,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({
      where: {
        _id: lessonId,
      },
    });

    const students = await this.studentRepository
      .createQueryBuilder('student')
      .where('student._id IN (:...studentIds)', { studentIds }) // Use the IN operator with an array
      .getMany();
    lesson.students = students;
    return await this.lessonRepository.save(lesson);
  }
}
