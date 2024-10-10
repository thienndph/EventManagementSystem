import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { EventUserModule } from './event_user/event_user.module';
import { AdminAccessMiddleware } from './middleware/admin-access.middleware';
import { UserAccessMiddleware } from './middleware/user-access.middleware';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [JwtModule.register({
    secret: 'your-secret-key', // Khóa bí mật cho JWT
    signOptions: { expiresIn: '60s' }, // Thời gian hết hạn của JWT
  }),AuthModule,EventModule, AdminModule, EventUserModule, UserModule,],
  controllers: [AppController,],
  providers: [AppService,PrismaService],
})
export class AppModule { configure(consumer: MiddlewareConsumer) {
  consumer
  // .apply(RoleMiddleware) // Áp dụng middleware kiểm tra token và phân quyền
  // .forRoutes('*')        // Áp dụng cho tất cả các route

  .apply(AdminAccessMiddleware) 
  .forRoutes({ path: 'admin/*', method: RequestMethod.ALL })

  .apply(UserAccessMiddleware)
  .forRoutes({ path: 'user/*', method: RequestMethod.ALL });
}}
