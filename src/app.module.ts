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
import { RoleMiddleware } from './middleware/role.middleware';

@Module({
  imports: [JwtModule.register({
    secret: process.env.ADMIN_SECRET_KEY, 
    signOptions: { expiresIn: '1d' }, 
  }),AuthModule,EventModule, AdminModule, EventUserModule, UserModule,],
  controllers: [AppController,],
  providers: [AppService,PrismaService],
})
export class AppModule { configure(consumer: MiddlewareConsumer) {
  consumer
  // .apply(RoleMiddleware) 
  // .exclude('auth/**')
  // .forRoutes('*')       

  .apply(AdminAccessMiddleware) 
  .forRoutes({ path: 'admin/*', method: RequestMethod.ALL })

  .apply(UserAccessMiddleware)
  .forRoutes({ path: 'user/*', method: RequestMethod.ALL });
}}
