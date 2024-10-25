import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin, Role } from '@prisma/client';
import { EventService } from '../event/event.service';
import { adminStatus } from 'src/enums/adminStatus';

@Injectable()
export class AdminService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventService: EventService,
  ) { }

  // Create Admin
  async create(createAdminDto: CreateAdminDto) {
    try {
      const existingAdmin = await this.prisma.admin.findUnique({
        where: { email: createAdminDto.email },
      });

      if (existingAdmin) {
        throw new BadRequestException('Email đã có tài khoản');
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      const admin = await this.prisma.admin.create({
        data: {
          ...createAdminDto,
          password: hashedPassword,
          role: createAdminDto.role || Role.ADMIN,
          status: createAdminDto.status,
        },
      });

      return { email: admin.email, name: admin.name };
    } catch (error) {
      console.error('Error creating admin:', error);
      throw new InternalServerErrorException('Error creating admin');
    }
  }

  // Find All Admins with Pagination
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const parsedLimit = Number(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      throw new InternalServerErrorException('Invalid limit provided');
    }

    try {
      const [admins, totalCount] = await this.prisma.$transaction([
        this.prisma.admin.findMany({
          skip,
          take: parsedLimit,
        }),
        this.prisma.admin.count(),
      ]);

      return {
        admins,
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw new InternalServerErrorException('Error fetching admins');
    }
  }

  // Find One Admin by ID
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    try {
      const admin = await this.prisma.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }

      return admin;
    } catch (error) {
      console.error('Error fetching admin:', error);
      throw new InternalServerErrorException('Error fetching admin');
    }
  }

  // Update Admin
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (!admin) {
      throw new NotFoundException('Admin không tồn tại');
    }

    const hashedPassword = updateAdminDto.password
      ? await bcrypt.hash(updateAdminDto.password, 10)
      : admin.password;

    try {
      return this.prisma.admin.update({
        where: { id },
        data: {
          ...updateAdminDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error('Error updating admin:', error);
      throw new InternalServerErrorException('Error updating admin');
    }
  }

  // Remove (Soft Delete) Admin by setting status
  async remove(id: number): Promise<Admin> {
    const admin = await this.findOne(id);

    if (!admin) {
      throw new NotFoundException('Admin không tồn tại');
    }

    try {
      return this.prisma.admin.update({
        where: { id },
        data: {
          status: adminStatus.DELETE,  // or adminStatus.INACTIVE if needed
        },
      });
    } catch (error) {
      console.error('Error updating admin status:', error);
      throw new InternalServerErrorException('Error updating admin status');
    }
  }

  // Get Dashboard Overview
  async getDashboardOverview() {
    try {
      const totalUsers = await this.prisma.user.count();
      const totalEvents = await this.prisma.event.count();
      const totalRegistrationsResponse = await this.eventService.getEventByStatusCount();
      const totalRegistrationsCount = totalRegistrationsResponse.length;
      const userRegisEvent = await this.prisma.eventUser.count();

      return {
        totalUsers,
        totalEvents,
        totalRegistrationsCount,
        userRegisEvent,
      };
    } catch (error) {
      console.error('Error fetching dashboard overview:', error);
      throw new InternalServerErrorException('Error fetching dashboard overview');
    }
  }
}
