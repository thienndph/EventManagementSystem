import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { AdminModule } from './modules/admin/admin.module';
import { EventUserModule } from './modules/event_user/event_user.module';
import { AdminAccessMiddleware } from './middleware/admin-access.middleware';
import { UserAccessMiddleware } from './middleware/user-access.middleware';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ADMIN_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    EventModule,
    AdminModule,
    EventUserModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AdminGuards, // Đảm bảo rằng AdminGuard là một class guard hợp lệ
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
  // .apply(RoleMiddleware) 
  // .exclude('auth/**')
  // .forRoutes('*')       

  .apply(AdminAccessMiddleware) 
  .forRoutes({ path: 'admin/*', method: RequestMethod.ALL })

  .apply(UserAccessMiddleware)
  .forRoutes({ path: 'user/*', method: RequestMethod.ALL });
}}
 