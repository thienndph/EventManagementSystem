import { Controller, Get, Post, Body, Param, Patch, Delete,Req,UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import {ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { AuthGuard } from '@nestjs/passport';

// @ApiTags('events') 
 @Controller('events')
@ApiBearerAuth()
export class EventController {
//   constructor(private readonly eventService: EventService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post()
//   @ApiOperation({ summary: 'Create an event' })
//   @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
//   @ApiResponse({ status: 400, description: 'Bad Request' })
//   async createEvent(@Body() requestBody: CreateEventDto, @Req() @Req() req: any) {
//     const userId = req.user.id;
//     console.log(userId);
//    return this.eventService.createEvent(requestBody,userId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get('/event_no_accept')
//   @ApiResponse({ status: 200, description: 'List event no accept.' })
//   findByStatus() {
//     return this.eventService.getEventByStatus();
//   }
 
//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   @ApiOperation({ summary: 'Get all events' })
//   @ApiResponse({ status: 200, description: 'List of events' })
//   async getAllEvents(): Promise<Event[]> {
//     return this.eventService.getAllEvents();
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get(':id')
//   @ApiOperation({ summary: 'Get event by ID' })
//   @ApiResponse({ status: 200, description: 'The found event' })
//   @ApiResponse({ status: 404, description: 'Event not found' })
//   async getEventById(@Param('id') id: string): Promise<Event> {
//     return this.eventService.getEventById(+id);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Patch(':id')
//   @ApiOperation({ summary: 'Update an event' })
//   @ApiResponse({ status: 200, description: 'The updated event' })
//   @ApiResponse({ status: 404, description: 'Event not found' })
//   async updateEvent(@Param('id') id: string, @Body() requestBody:UpdateEventDto)  {
//     return this.eventService.updateEvent(+id, requestBody);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete an event' })
//   @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
//   @ApiResponse({ status: 404, description: 'Event not found' })
//   async deleteEvent(@Param('id') id: string): Promise<Event> {
//     return this.eventService.deleteEvent(+id);
//   }
 }
