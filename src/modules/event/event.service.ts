// src/event/event.service.ts

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Event, EventUser,EventStatus } from '@prisma/client';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventUserService } from 'src/modules/event_user/event_user.service';
import { eventStatus } from 'src/enums/eventStatus';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService,
    private eventUserService: EventUserService) { }

  async createEvent(data: CreateEventDto, userId: number): Promise<Event> {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        userId: userId, 
        status: eventStatus.NOCONFRIM
      },
    });
     this.prisma.eventUser.create({
      data: {
        idEvent: event.id,  
        idUser: userId,  
      },
    });
  
    return event;
  }

  async getAllEvents(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      // Đảm bảo rằng `limit` là số nguyên
      const parsedLimit = Number(limit);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new InternalServerErrorException('Invalid limit provided');
      }

      const [events, total] = await this.prisma.$transaction([
        this.prisma.event.findMany({
          skip: skip,
          take: parsedLimit, // Sử dụng parsedLimit ở đây
        }),
        this.prisma.event.count(),
      ]);

      return {
        data: events,
        total,
        page,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new InternalServerErrorException('Error fetching events');
    }
  }
  async getEventById(id: number): Promise<Event> {
    //const parsedId = Number(id);
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
  
  async EventJoin(idUser: number, idEvent: number) {
    this.prisma.eventUser.create({
      data: {
        idEvent: idEvent,  
        idUser: idUser,  
      },
    });
  }
  
  getEventByStatusCount() {
    return this.prisma.event.findMany({
      where: { status:eventStatus.NOCONFRIM },
    });
  }

  
  async getEventByStatus(status: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
  
    const [events, totalCount] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where: {
          status:eventStatus.NOCONFRIM,
        },
        skip: skip,
        take: limit, 
      }),
      this.prisma.event.count({
        where: {
          status: eventStatus.NOCONFRIM,
        },
      }),
    ]);
  
    return {
      events,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  async updateStatus(id: string): Promise<Event> {
    const idNew = parseInt(id, 10);
    return this.prisma.event.update({
      where: { id:idNew },
      data: {
        status: eventStatus.CONFRIM,  
      },
    });
  }
  
  

  async updateEvent(id: number, data: UpdateEventDto): Promise<Event> {
   // if(data.status==)
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async delelte(id: number): Promise<Event> {
      return this.prisma.event.update({
        where: { id },
        data: {
          status:eventStatus.DELETE, 
        },
      });
    }    
  
  async findOne(id: number) {
    if (id === undefined || id === null) {
      throw new BadRequestException('ID is required');
    }
  try {
       const event = await this.prisma.event.findUnique({
        where: { id },
      });
       console.log("event=>"+event)
      if (event==null) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return event;
  } catch (error) {
    throw error;
  }
   
  }

  async findEvents(query: { date?: string; eventType?: string; name?: string; description?: string }) {
    return this.prisma.event.findMany({
      where: {
        AND: [
          query.date ? { date: new Date(query.date) } : {},  
          query.eventType ? { title: query.eventType } : {},  
          query.description ? { description: { contains: query.description, mode: 'insensitive' } } : {}, 
        ],
      },
    });
  }
  
}
