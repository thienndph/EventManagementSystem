// src/event/event.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventUserService } from 'src/event_user/event_user.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService,
    private eventUser: EventUserService) { }

  async createEvent(data: CreateEventDto, userId: number): Promise<Event> {
    data.status=0;
    const event = await this.prisma.event.create({
      data: {
        ...data,
        userId: userId, 
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

  async getAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async getEventById(id: number): Promise<Event> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
  
  async getEventByStatus(): Promise<Event[]> {
    const status = 0; // hoặc giá trị status bạn muốn tìm
    return this.prisma.event.findMany({
      where: { status }, // Tìm kiếm theo status
    });
  }
  

  async updateEvent(id: number, data: UpdateEventDto): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async deleteEvent(id: number): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
