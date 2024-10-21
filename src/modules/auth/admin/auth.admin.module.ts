import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './admin.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport'; // Nếu bạn đang sử dụng Passport
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

import { JwtStrategy } from '../user/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: process.env.ADMIN_SECRET_KEY,
        signOptions: { expiresIn: '1d' }, 
    }),],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, PrismaService,JwtStrategy],
  exports: [AuthAdminService,], 
})
export class AuthModule { 
  
}
