import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AdminAccessMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}

  async use(req: any, res: any, next: () => void) {
    const jwtToken = get(req.headers['authorization']?.split(' '),1 , '');
    console.log("jwtToken "+jwtToken)
    if (!jwtToken) {
      console.log('Missing JWT token');
      throw new UnauthorizedException();
    }

    try {
      const decoded = verify(jwtToken, process.env.ADMIN_SECRET_KEY);
      console.log('Decoded JWT:', decoded); 

      const { sub, typeAuth } = decoded as any;

      if (!sub) {
        console.log('JWT missing sub (admin ID)');
        throw new UnauthorizedException('Invalid token: ID missing');
      }

      console.log("Admin ID:", sub);
      const admin = await this.adminService.findOne(+sub);
      if (!admin) throw new UnauthorizedException('Admin not found');

      if (typeAuth !== 'Admin') {
        console.log('Unauthorized: Admin access required');
        throw new UnauthorizedException('Forbidden: Admin access only');
      }

      req['admin'] = admin;
      next();
    } catch (error) {
      console.log('JWT verification error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
