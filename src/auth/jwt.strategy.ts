// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Lấy secret từ biến môi trường
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // Tìm người dùng trong DB bằng ID từ payload
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) {
      throw new UnauthorizedException(); // Nếu không tồn tại, ném ngoại lệ
    }

    return user; // Trả về người dùng đã xác thực
  }
}
