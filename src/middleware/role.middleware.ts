import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded; 

      let user;
      if (decoded.type === 'Admin') {
        user = await this.prisma.admin.findUnique({ where: { id: decoded.id } });
        if (!user) {
          throw new HttpException('Admin not found', HttpStatus.FORBIDDEN);
        }
        req.userType = 'Admin'; 
      } else if (decoded.type === 'User') {
        user = await this.prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.FORBIDDEN);
        }
        req.userType = 'User'; 
      } else {
        throw new HttpException('Invalid user type', HttpStatus.FORBIDDEN);
      }

      req.userInfo = user; 
      next(); 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Invalid token RoleMiddleware', HttpStatus.UNAUTHORIZED);
    }
  }
}