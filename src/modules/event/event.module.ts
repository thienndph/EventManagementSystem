import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventUserService } from 'src/modules/event_user/event_user.service';
import { UserModule } from 'src/modules/user/user.module';
import { AdminLogService } from '../adminlog/admin-log.service';

@Module({
  imports:[UserModule],
  providers: [EventService,PrismaService,EventUserService,AdminLogService],
  controllers: [EventController],
  exports:[EventService]
})
export class EventModule {}
