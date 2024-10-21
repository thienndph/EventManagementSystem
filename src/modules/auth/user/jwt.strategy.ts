import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.USER_SECRET_KEY,
      //             process.env.ADMIN_SECRET_KEY
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // Kiểm tra xem id có tồn tại trong payload không
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    // Tìm người dùng trong DB bằng ID từ payload
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub, 
      },
    });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
