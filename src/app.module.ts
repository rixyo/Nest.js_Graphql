import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceModule } from './datasource/datasource.module';
import { StudentModule } from './student/student.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLUserInterceptor } from './interceptors/user.interceptors';
import { AuthGuard } from './Guard/auth.guard';
@Module({
  imports: [
    DataSourceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.stage.${process.env.STAGE}`,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    LessonModule,
    StudentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLUserInterceptor,
    },
  ],
})
export class AppModule {}
