import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { user_roles } from './../enums/index';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (
      req.user?.role ||
      req.user?.role === user_roles.SUPER_ADMIN ||
      req.user?.role === user_roles.ADMIN
    ) {
      return Promise.resolve(true);
    }
    if (req.params.id !== req.user.id) {
      throw new ForbiddenException('Forbidden user');
    }
    return Promise.resolve(true);
  }
}
