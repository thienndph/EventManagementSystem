import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dtos/login-admin.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    
  ) {}

  async validateUser(user: any): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } });

    if (!existingUser) {
      // Nếu người dùng chưa tồn tại, tạo mới
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email, 
          name: user.name,   
          age: null,         
          gender: null,     
          dateOfBirth: null, 
          address: null,     
          phoneNumber: null,
          idGoogle:user.idGoogle, 
               
        },
      });
      return newUser;
    }

    return existingUser;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id ,typeAuth:user.typeAuth };
  
    // Sửa cú pháp khai báo token
    const type ='User'
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        typeAuth:type,
      },
      token: token, // Trả về token JWT cho client
    };
  }
  

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Tìm người dùng theo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Kiểm tra người dùng có tồn tại và mật khẩu đã được lưu
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Kiểm tra mật khẩu có khớp không
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const type ='User'
    // Tạo token JWT với thông tin người dùng
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      typeAuth:type,
    });
  

    // Trả về token và thông tin người dùng
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        typeAuth:type,
      },
      token: token, // Trả về token JWT cho client
    };
  }


  async loginadmin(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;

    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const type ='Admin'
    const payload = { email: admin.email, sub: admin.id , role: admin.role,
      typeAuth:type};
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        typeAuth:type,
      },
      token: token, 

    };
  }
}
