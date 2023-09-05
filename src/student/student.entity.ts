import { Lesson } from 'src/lesson/lession.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @ManyToMany(() => Lesson, (lesson) => lesson.students)
  @JoinTable({ name: 'student_lesson' })
  lessons: Lesson[];
}
