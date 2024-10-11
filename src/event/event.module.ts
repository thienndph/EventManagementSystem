import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'prisma/prisma.service';
import { EventUserService } from 'src/event_user/event_user.service';

@Module({
  providers: [EventService,PrismaService,EventUserService],
  controllers: [EventController],
  exports:[EventService]
})
export class EventModule {}
