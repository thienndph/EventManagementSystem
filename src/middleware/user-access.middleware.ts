import { Injectable, NestMiddleware, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserAccessMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const jwtToken = get(req.headers['authorization']?.split(' '), 1, '');
    console.log("jwtToken: " + jwtToken);
    
    if (!jwtToken) throw new UnauthorizedException('Missing JWT token');

    try {
      const decoded = verify(jwtToken, process.env.ADMIN_SECRET_KEY) as { sub: string; typeAuth: string; id: string };
      console.log("Decoded token:", decoded);

      const { sub, typeAuth } = decoded;
      console.log("typeAuth from token:", typeAuth);
      // Kiểm tra sub để đảm bảo nó là ID hợp lệ
      const userId = parseInt(decoded.id, 10);
      if (isNaN(userId)) throw new UnauthorizedException('Invalid token: ID missing');

      console.log("User ID after parsing:", decoded.id);

      // Tìm người dùng trong cơ sở dữ liệu
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException('User not found');

      if (typeAuth !== 'User') {
        throw new HttpException('Forbidden: User access only', HttpStatus.FORBIDDEN);
      }

      req['user'] = user; 
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token: Middleware error');
    }
  }
}
