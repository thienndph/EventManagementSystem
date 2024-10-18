import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      return this.prisma.admin.create({
        data: {
          ...createAdminDto,
          password: hashedPassword, 
          role: createAdminDto.role || Role.ADMIN,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating admin');
    }
  }

  async findAll() {
    try {
      return this.prisma.admin.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching admins');
    }
  }

  async findOne(id: number) {
    try {
      if (id === undefined || id === null) {
        throw new BadRequestException('ID is required');
      }
      console.log('id TEST->>', id);
      const admin = await this.prisma.admin.findUnique({
        where: { id },
      });
  
      if (!admin) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
  
      return admin;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching admin');
    }
  }
  
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      await this.findOne(id); // Kiểm tra admin có tồn tại không
      return this.prisma.admin.update({
        where: { id },
        data: {
          ...updateAdminDto,
          role: updateAdminDto.role,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating admin');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id); // Kiểm tra admin có tồn tại không
      return this.prisma.admin.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting admin');
    }
  }

  async getDashboardOverview() {
    try {
      const totalUsers = await this.prisma.user.count();
      const totalEvents = await this.prisma.event.count();
      // const totalRegistrations = await this.prisma.registration.count();
  
      return {
        "Số người dùng => ": totalUsers,
        "Số event => ": totalEvents,
        // totalRegistrations,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching dashboard overview');
    }
  }
}
