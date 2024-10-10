import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventUserService {
    constructor(private prisma: PrismaService) {}

    
    async createEventUser(idEvent: number, idUser: number): Promise<any> {
        const eventUserData = {
          idEvent: idEvent,
          idUser: idUser,
        };
      
        return this.prisma.eventUser.create({
          data: eventUserData,
        });
      }
      
      
  
}
