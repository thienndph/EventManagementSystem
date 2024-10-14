import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
//import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { EventUserModule } from './event_user/event_user.module';
import { AdminAccessMiddleware } from './middleware/admin-access.middleware';
import { UserAccessMiddleware } from './middleware/user-access.middleware';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleMiddleware } from './middleware/role.middleware';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/user/auth.module';
//import { JwtStrategy } from './auth/user/jwt.strategy';
import { JwtStrategyAdmin } from './auth/admin/jwt.strategy';


@Module({
  imports: [
    // PassportModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1d' },
    // }),
    AuthModule,
    EventModule,
    AdminModule,
    UserModule,
    EventUserModule,
    UserModule,
  //  JwtStrategy,
   // JwtStrategyAdmin,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(RoleMiddleware) // Áp dụng middleware kiểm tra token và phân quyền
      // .forRoutes('*')        // Áp dụng cho tất cả các route

      .apply(AdminAccessMiddleware)
      .forRoutes({ path: 'admin/*', method: RequestMethod.ALL })

      .apply(UserAccessMiddleware)
      .forRoutes({ path: 'user/*', method: RequestMethod.ALL });
  }
}
