import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDto } from 'src/modules/user/dtos/login-user.dto';
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
          status:user.status
               
        },
      });
      return newUser;
    }

    return existingUser;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id ,typeAuth:user.typeAuth ,status:user.status};
  
    const status0 =0
    const type ='User'
    const token = this.jwtService.sign(payload);
    payload.status=0;
    // const refreshToken = this.jwtService.sign(payload, {
    //   secret: 'refresh_token_secret',
    //   expiresIn: '7d',
    // });
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        typeAuth:type,
        status :payload.status
      },
      token: token,
    //  refreshToken:refreshToken, 
    };
  }
  

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const type ='User'
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      typeAuth:type,
    });
  
    // const refreshToken = this.jwtService.sign({
    //    id: user.id,
    //   email: user.email,
    //   name: user.name,
    //   typeAuth:type,}, {
    //   secret: 'refresh_token_secret',
    //   expiresIn: '7d', 
    // });
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        typeAuth:type,
      },
      token: token,
      // refreshToken:refreshToken,
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

    // const refreshToken = this.jwtService.sign(payload, {
    //   secret: 'refresh_token_secret',
    //   expiresIn: '7d',  
    // });
    return {
      message: 'Login successful',
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        typeAuth:type,
      },
      token: token, 
    //  refreshToken:refreshToken,

    };
  }

  createAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'access_token_secret',
      expiresIn: '15m',
    });
  }
}