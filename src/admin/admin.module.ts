import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService,PrismaService]
})
export class AdminModule {
  //   configure(consumer: MiddlewareConsumer) {
  //  consumer.apply(AuthMiddleware).forRoutes('admin'); 
  //  }
 }
 
