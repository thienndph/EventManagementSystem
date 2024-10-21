import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Admin, User } from '@prisma/client';

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:// process.env.USER_SECRET_KEY,
                process.env.ADMIN_SECRET_KEY
    });
  }

  async validate(payload: JwtPayload): Promise<Admin> {
    // Kiểm tra xem id có tồn tại trong payload không
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    // Tìm người dùng trong DB bằng ID từ payload
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: payload.sub, 
      },
    });

    // Kiểm tra xem người dùng có tồn tại không
    if (!admin) {
      throw new UnauthorizedException('User not found');
    }

    return admin;
  }
}
