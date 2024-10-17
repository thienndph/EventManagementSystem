import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy'; 
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.ADMIN_SECRET_KEY, 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PrismaService,JwtStrategy,UserService],
  exports: [AuthService,], 
})
export class AuthModule { 
  
}
