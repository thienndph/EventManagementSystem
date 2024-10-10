import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
  
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    
    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password: hashedPassword, 
      },
    });
  }

  async findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id); // Kiểm tra admin có tồn tại không
    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Kiểm tra admin có tồn tại không
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}
