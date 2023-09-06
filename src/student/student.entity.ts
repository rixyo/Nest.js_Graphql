import { Lesson } from 'src/lesson/lession.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
export enum Role {
  ADMIN = 'TEACHER',
  USER = 'STUDENT',
}
@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  @Unique(['email'])
  email: string;
  @Column()
  password: string;
  @Column({ default: Role.USER })
  role: Role;
  @ManyToMany(() => Lesson, (lesson) => lesson.students)
  @JoinTable({ name: 'student_lesson' })
  lessons: Lesson[];
}
