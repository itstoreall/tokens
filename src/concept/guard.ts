import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Auth (guard)...');

    const req = context.switchToHttp().getRequest();
    const isAuth = req.headers.authorization === 'secret';

    if (!isAuth) throw new UnauthorizedException('Not auth');

    return isAuth;
  }
}
