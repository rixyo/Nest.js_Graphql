import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, Student } from './student.entity';
import { CreateStudentInput, LoginInput } from './student.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthorizationType } from './student.type';

@Injectable()
export class StudentService {
  constructor(
    @Inject('Student_REPOSITORY')
    private readonly studentRepository: Repository<Student>,
  ) {}
  async createStudent(
    createStudent: CreateStudentInput,
  ): Promise<AuthorizationType> {
    const existingStudent = await this.studentRepository.findOne({
      where: {
        email: createStudent.email,
      },
    });
    if (existingStudent) throw new ConflictException('Student already exists');
    const password = await this.hashPassword(createStudent.password);
    const student = this.studentRepository.create({
      firstName: createStudent.firstName,
      lastName: createStudent.lastName,
      email: createStudent.email,
      password,
    });
    await this.studentRepository.save(student);
    const token = await this.createToken(student._id, student.role);
    return {
      access_token: token,
    };
  }
  async login(loginInput: LoginInput): Promise<AuthorizationType> {
    const student = await this.studentRepository.findOne({
      where: {
        email: loginInput.email,
      },
    });
    if (!student) throw new ConflictException('Student does not exist');
    const isPasswordValid = await this.comparePasswords(
      loginInput.password,
      student.password,
    );
    if (!isPasswordValid) throw new ConflictException('Invalid credentials');
    const token = await this.createToken(student._id, student.role);
    return {
      access_token: token,
    };
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
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  private async comparePasswords(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
  private async createToken(userId: string, userRole: Role): Promise<string> {
    const expiresIn = 60 * 60; // an hour
    const secret = 'mysupersecret';
    const dataStoredInToken = {
      _id: userId,
      role: userRole,
    };
    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  }
}
