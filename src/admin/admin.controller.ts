import { Controller, Get, Post, Body, Param, Patch, Delete,UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse,ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { EventUserService } from 'src/event_user/event_user.service';
import { EventService } from 'src/event/event.service';
import { Event } from '@prisma/client';
import { UpdateEventDto } from 'src/event/dtos/update-event.dto';

@ApiTags('admin') 
@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly eventService: EventService
  ) {}


  @Post()
  @Roles(['SUPER_ADMIN'])
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  @ApiBearerAuth()
  regester(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('getAll')
  @Roles(['SUPER_ADMIN','ADMIN'])
  @ApiResponse({ status: 200, description: 'List of all admins.' })
  @ApiBearerAuth()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiResponse({ status: 200, description: 'Admin found.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/event_no_accept')
  @Roles(['SUPER_ADMIN'])
  @ApiResponse({ status: 200, description: 'List event no accept.' })
  findByStatus() {
    return this.eventService.getEventByStatus();
  }
 
  @UseGuards(AuthGuard('jwt'))
  @Get('getallevent')
  @Roles(['SUPER_ADMIN'])
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'The found event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getEventById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'The updated event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(@Param('id') id: string, @Body() requestBody:UpdateEventDto)  {
    return this.eventService.updateEvent(+id, requestBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Roles(['SUPER_ADMIN'])
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async deleteEvent(@Param('id') id: string): Promise<Event> {
    return this.eventService.deleteEvent(+id);
  }
}

