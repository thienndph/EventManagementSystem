import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserAccessMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.userType !== 'user') {
      throw new HttpException('Forbidden: User access only', HttpStatus.FORBIDDEN);
    }
    next();  // Cho phép tiếp tục nếu là user
  }
}
