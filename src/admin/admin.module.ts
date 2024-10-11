import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'prisma/prisma.service';
import { EventService } from 'src/event/event.service';
import { EventUserService } from 'src/event_user/event_user.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, EventService, EventUserService], 
  exports: [EventService],
})
export class AdminModule {}
