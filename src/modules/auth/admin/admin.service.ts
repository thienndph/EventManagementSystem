import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDto } from 'src/modules/user/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthAdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateAdmin(admin: any): Promise<Admin> {
    const existingUser = await this.prisma.admin.findUnique({ where: { email: admin.email } });

    if (!existingUser) {
      // Nếu người dùng chưa tồn tại, tạo mới
      const newUser = await this.prisma.admin.create({
        data: {
          email: admin.email, 
          name: admin.name,   
          age: null,         
          gender: null,     
          dateOfBirth: null, 
          address: null,     
          phoneNumber: null,
          role :admin.role,
               
        },
      });
      return newUser;
    }

    return existingUser;
  }


  async loginAdmin(loginDto: LoginDto) {
    const { email, password } = loginDto;
  
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });
  
    if (!admin || !admin.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const token = this.jwtService.sign(
        {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        { secret: process.env.ADMIN_SECRET_KEY } // Giá trị mặc định
      );
      
  
    return {
      message: 'Login successful',
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role, // Có thể trả về role để client biết
      },
      token,
    };
  }
  
}      