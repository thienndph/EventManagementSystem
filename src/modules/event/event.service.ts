// src/event/event.service.ts

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventUserService } from 'src/modules/event_user/event_user.service';

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

  async getAllEvents(){
    try {
      const page=1;
      const limit=10;
      const skip = (page - 1) * limit;
      const events = await this.prisma.event.findMany({
        skip: skip,
        take: limit,
      });

      const total = await this.prisma.event.count();

      return {
        data: events,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching event');
    }
  }

  async getEventById(id: number): Promise<Event> {
    //const parsedId = Number(id);
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
  
  async getEventByStatus(status:number) {
    
    try {
      const page=1;
      const limit=10;
      const skip = (page - 1) * limit;
      const events = await this.prisma.event.findMany({
        skip: skip,
        take: limit,
        where: { status: status },
      });

      const total = await this.prisma.event.count();

      return {
        data: events,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching event');
    }
  }

  async updateStatus(id: string): Promise<Event> {
    const newStatus=1;
    const idNew = parseInt(id, 10);
    return this.prisma.event.update({
      where: { id:idNew },
      data: {
        status: newStatus,  
      },
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
  
  
}
``