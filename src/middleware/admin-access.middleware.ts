import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminAccessMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.userType !== 'admin') {
      throw new HttpException('Forbidden: Admin access only', HttpStatus.FORBIDDEN);
    }
    next();  
  }
}
