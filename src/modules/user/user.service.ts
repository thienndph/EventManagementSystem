import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, } from '@prisma/client';
import { UserStatus } from 'src/enums/status.enum';
import { RegisterUserDto } from './dtos/register-user.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const { email, name, age, gender, dateOfBirth, address, phoneNumber, password } = registerUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await this.prisma.user.findUnique({
        where: { email }, 
      });

      if(existingUser){
        throw new BadRequestException('Email đã có tài khoản'); 
      }

      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          age,
          gender,
          dateOfBirth: new Date(dateOfBirth),
          address,
          phoneNumber,
          password: hashedPassword,
          idGoogle: null,
          status: UserStatus.ACTIVE
        },
      });

      return user.email, user.name;
    } catch (error) {
      throw error;
    }

  }

  async findAll(page: number, limit: number) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;
    const [users, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limitNumber,
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
    };
  }


  async lockUser(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.BLOCKED,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }



  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateUserDto.password, saltRounds);
      updateUserDto.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }


  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.INACTIVE,
      },
    });
  }

}
