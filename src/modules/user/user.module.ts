import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EventService } from 'src/modules/event/event.service';
import { EventUserService } from 'src/modules/event_user/event_user.service';
import { UserAccessMiddleware } from 'src/middleware/user-access.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtService,EventService,EventUserService,UserAccessMiddleware],
  exports:[EventService,UserModule,UserService]
})
export class UserModule {}