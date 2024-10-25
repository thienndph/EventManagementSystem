import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventUserDto } from './dto/create-event-user.dto';

@Injectable()
export class EventUserService {
  constructor(private prisma: PrismaService,
  ) { }

  async create(createEventUserDto: CreateEventUserDto) {
    return this.prisma.eventUser.create({
      data: createEventUserDto,
    });
  }

  async countUsersInEvent(idEvent: number) {
    return this.prisma.eventUser.count({
      where: {
        idEvent: idEvent,
      },
    });
  }


  async findOne(where: { idEvent: number; idUser: number }) {
    return this.prisma.eventUser.findUnique({
      where: {
        idEvent_idUser: {
          idEvent: where.idEvent,
          idUser: where.idUser,
        },
      },
    });
  }


  async findUserEvents(idUser: number, page: number , pageSize: number ) {
    const eventUser = await this.prisma.eventUser.findMany({
      where: {
        idUser: idUser,
      },
      include: { user: true, event: true },
      take: pageSize, 
      skip: (page - 1) * pageSize, 
    });
  
    const totalCount = await this.prisma.eventUser.count({
      where: {
        idUser: idUser,
      },
    });
  
    return {
      data: eventUser,
      total: totalCount, 
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
  
}  