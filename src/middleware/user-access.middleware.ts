import { Injectable, NestMiddleware, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { UserService } from 'src/modules/user/user.service';
@Injectable()
export class UserAccessMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const jwtToken = get(req.headers['authorization']?.split(' '), 1, '');
    console.log("jwtToken"+jwtToken)
    if (!jwtToken) {
      throw new UnauthorizedException('Missing JWT token');
    }
  
    try {
      const decoded = verify(jwtToken, process.env.ADMIN_SECRET_KEY);
      console.log("decoded"+decoded)
      const { id, typeAuth } = decoded as any;
      console.log('typeAuth==>'+typeAuth)
      console.log('sub==>'+id)
      const user = await this.userService.findOne(+id); 
      if (!user) throw new UnauthorizedException('Admin not found');
      
      req.user = user;
      req['user'] = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
