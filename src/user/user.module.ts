import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EventService } from 'src/event/event.service';
import { EventUserService } from 'src/event_user/event_user.service';
import { UserAccessMiddleware } from 'src/middleware/user-access.middleware';
import { EventModule } from 'src/event/event.module';

@Module({
  imports:[
    EventModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtService,EventService,EventUserService,UserAccessMiddleware],
  exports:[EventService,UserModule,UserService]
})
export class UserModule {}
