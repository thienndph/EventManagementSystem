import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport'; // Nếu bạn đang sử dụng Passport
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { GoogleStrategy } from './google.strategy'; // Đảm bảo đường dẫn đúng
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ 
      secret: process.env.USER_SECRET_KEY,
      signOptions: { expiresIn: '1d' }, 
    }),],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PrismaService,JwtStrategy],
  exports: [AuthService,GoogleStrategy], 
})
export class AuthModule { 
  
}
