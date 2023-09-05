import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @Inject('Student_REPOSITORY')
    private readonly studentRepository: Repository<Student>,
  ) {}
  async createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      firstName: createStudent.firstName,
      lastName: createStudent.lastName,
    });
    return await this.studentRepository.save(student);
  }
  async getStudent(id: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: {
        _id: id,
      },
    });
  }
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
}
