import { Injectable, NestMiddleware, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserAccessMiddleware implements NestMiddleware {
constructor(private readonly userSevice:UserService){}
  async use(req: any, res: any, next: () => void) {
    const jwtToken = get(req.headers['authorization']?.split(' '), 1, '');
    console.log("jwtToken=>"+jwtToken)
    if (!jwtToken) throw new UnauthorizedException();

    try {
      
      const decoded = verify(jwtToken, process.env.ADMIN_SECRET_KEY) as { sub: string, typeAuth: string };
      console.log("Decoded token:", decoded);

      const { sub, typeAuth } = decoded;
      console.log("typeAuth from token:", typeAuth);
     // //if (!sub) throw new UnauthorizedException('Invalid token: ID missing');
     
     // const userId = parseInt(sub, 10);
    //  console.log("Admin ID after parsing:", adminId);

  //    const user = await this.userSevice.findOne(userId);
      
    //  if (!user) throw new HttpException('Admin not found', HttpStatus.FORBIDDEN);

      if (typeAuth !== 'User') {
        throw new HttpException('Forbidden: Admin access only', HttpStatus.FORBIDDEN);
      }

     // req['admin'] = admin; // Gán thông tin admin vào request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token middlware');
    }
  }
}
