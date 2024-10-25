import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy'; 
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/modules/user/user.service';
import { AdminService } from '../admin/admin.service';
import { EventService } from '../event/event.service';
import { EventUserService } from '../event_user/event_user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.ADMIN_SECRET_KEY, 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PrismaService,JwtStrategy,UserService,AdminService,EventService,EventUserService],
  exports: [AuthService,], 
})
export class AuthModule { 
  
}
