import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtService]
})
export class UserModule {}
