import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { CanActivate, Inject } from '@nestjs/common';
import { Student } from 'src/student/student.entity';
import { Repository } from 'typeorm';
enum Role {
  ADMIN = 'TEACHER',
  USER = 'STUDENT',
}
type JWTPayload = {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('Student_REPOSITORY')
    private Student_REPOSITORY: Repository<Student>,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    try {
      const role = this.getRolesFromContext(gqlContext);
      if (!role) {
        return true; // No specific roles required, allow access.
      }

      const token = this.getTokenFromRequest(req);

      if (!token) {
        return false; // No token found, deny access.
      }

      const user = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
      req.user = user;

      return this.matchRoles(role, user.userId);
    } catch (error) {
      return false;
    }
  }

  private getRolesFromContext(gqlContext: GqlExecutionContext): Role[] {
    const resolverClass = gqlContext.getClass(); // Get the class associated with the resolver
    const resolverMethodName = gqlContext.getHandler().name; // Get the resolver method name
    const roles = Reflect.getMetadata(
      'role',
      resolverClass,
      resolverMethodName,
    ); // Assuming 'roles' is the metadata key for specifying required roles in GraphQL resolvers.

    return roles || [];
  }

  private getTokenFromRequest(req: any): string | null {
    return req.headers.authorization?.split('Bearer ')[1] || null;
  }

  private async matchRoles(roles: Role[], userId: string): Promise<boolean> {
    try {
      const user = await this.Student_REPOSITORY.findOne({
        where: { _id: userId },
      });

      if (!user) {
        return false;
      }

      return roles.includes(user.role);
    } catch (error) {
      return false;
    }
  }
}
