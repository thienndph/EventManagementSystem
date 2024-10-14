import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token không tồn tại hoặc không hợp lệ');
    }

    const token = authHeader.split(' ')[1]; // Lấy token từ header

    try {
      const decoded = this.jwtService.verify(token); // Xác thực token
      req.user = decoded; // Gắn thông tin user vào request
      next(); // Tiếp tục chuyển request đến controller
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
