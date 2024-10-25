import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { EventService } from '../event/event.service';
import { EventUserService } from '../event_user/event_user.service';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuards } from './guards/admin.guard';
import { UserService } from '../user/user.service';
import { AdminLogService } from '../adminlog/admin-log.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ADMIN_SECRET_KEY, // hoặc bất kỳ giá trị nào bạn đang sử dụng
      signOptions: { expiresIn: '1d' }, 
      
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService,PrismaService,EventService,EventUserService,AdminGuards,UserService,AdminLogService
    // {
    //   provide: APP_GUARD,
    //   useClass: AdminGuards, // Đảm bảo rằng AdminGuard là một class guard hợp lệ
    // },
  ],
  exports: [AdminService,AdminGuards],
})
export class AdminModule {
  //   configure(consumer: MiddlewareConsumer) {
  //  consumer.apply(AdminController).forRoutes('admin'); 
  //  }
 }
 