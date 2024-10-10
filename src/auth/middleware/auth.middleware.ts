import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({ where: { id: decodedToken.id } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Chỉ cho phép tạo sự kiện
      if (req.method === 'POST') {
        next();
      } else {
        throw new ForbiddenException('User can only create events');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
