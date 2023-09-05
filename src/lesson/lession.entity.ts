/**
 * this file will contain the entity for the lesson entity.
 * The lesson entity is the entity for the lesson table in the database.
 * The lesson table will contain the following columns:
 */
import { Student } from 'src/student/student.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @ManyToMany(() => Student, (student) => student.lessons)
  @JoinTable({ name: 'student_lesson' })
  students: Student[];
}
