// src/users/user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { email, name, age, gender, dateOfBirth, address, phoneNumber, idGoogle, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        age,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
        idGoogle,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getProfile(id: number) {
    

    return ;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }


  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,  
      },
    });
  }
  


  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }


  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

}
