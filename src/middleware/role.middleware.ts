import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

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

      // Kiểm tra bảng tương ứng dựa trên decoded.type
      if (decoded.type === 'admin') {
        const admin = await this.prisma.admin.findUnique({ where: { id: decoded.id } });
        if (!admin) {
          throw new HttpException('Admin not found', HttpStatus.FORBIDDEN);
        }
        req.userType = 'admin';  // Gán admin vào request
      } else if (decoded.type === 'user') {
        const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.FORBIDDEN);
        }
        req.userType = 'user';  // Gán user vào request
      } else {
        throw new HttpException('Invalid user type', HttpStatus.FORBIDDEN);
      }

      next();  // Cho phép tiếp tục nếu token hợp lệ và người dùng tồn tại
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
