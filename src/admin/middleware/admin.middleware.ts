import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token);
      const admin = await this.prisma.admin.findUnique({ where: { id: decodedToken.id } });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      // Chỉ cho phép sửa hoặc xoá sự kiện
      if (req.method === 'PATCH' || req.method === 'DELETE') {
        next();
      } else {
        throw new ForbiddenException('Admin can only edit or delete events');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
