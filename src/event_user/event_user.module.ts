import { Module } from '@nestjs/common';
import { EventUserService } from './event_user.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [EventUserService,PrismaService]
})
export class EventUserModule {}
