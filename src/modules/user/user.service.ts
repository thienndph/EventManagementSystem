import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
    try {
      const page=1;
      const limit=10;
      const skip = (page - 1) * limit;
      const users = await this.prisma.user.findMany({
        skip: skip,
        take: limit,
      });

      const total = await this.prisma.admin.count();

      return {
        data: users,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching admins');
    }
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
