import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';;
import { AdminLog } from '@prisma/client';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';

@Injectable()
export class AdminLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminLogDto: CreateAdminLogDto): Promise<AdminLog> {
    return this.prisma.adminLog.create({
      data: createAdminLogDto,
    });
  }
}