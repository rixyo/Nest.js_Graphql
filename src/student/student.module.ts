import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentProviders } from './student.provider';
import { DataSourceModule } from 'src/datasource/datasource.module';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [DataSourceModule],
  providers: [StudentService, ...StudentProviders, StudentResolver],
  exports: [...StudentProviders],
})
export class StudentModule {}
