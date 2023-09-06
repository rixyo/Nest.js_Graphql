import { SetMetadata } from '@nestjs/common';
enum Role {
  ADMIN = 'TEACHER',
  USER = 'STUDENT',
}
export const UserRole = (...role: Role[]) => SetMetadata('role', role);
