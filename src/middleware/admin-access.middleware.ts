import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { AdminService } from 'src/modules/admin/admin.service';

@Injectable()
export class AdminAccessMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}

  async use(req: any, res: any, next: () => void) {
    const jwtToken = get(req.headers['authorization']?.split(' '), 1, '');
    if (!jwtToken) {
      throw new UnauthorizedException('Missing JWT token');
    }
  
    try {
      const decoded = verify(jwtToken, process.env.ADMIN_SECRET_KEY);
      const { sub, typeAuth } = decoded as any;
      console.log('sub==>'+sub)
      const admin = await this.adminService.findOne(+sub); 
      if (!admin) throw new UnauthorizedException('Admin not found');
      
      req.admin = admin;
      req['admin'] = admin;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}
