import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        role: createAdminDto.role as Role,
        password: hashedPassword, 
        id: undefined, 
      },
    });
  }
  
  async findAll() {
    return this.prisma.admin.findMany();
  }
  async findOne(id: number) {
    // Kiểm tra nếu id không được cung cấp
    if (id === undefined || id === null) {
      throw new Error("ID must be provided"); // Ném lỗi nếu id không hợp lệ
    }
  
    // Gọi hàm findUnique để tìm admin
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: id, // Đảm bảo bạn đang sử dụng giá trị id hợp lệ
      },
    });
  
    // Kiểm tra nếu không tìm thấy admin
    if (!admin) {
      throw new Error("Admin not found"); // Thông báo nếu không tìm thấy admin
    }
  
    return admin; // Trả về admin nếu tìm thấy
  }
  
  

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id); 
    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}
