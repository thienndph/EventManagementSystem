import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse,ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from 'src/event/event.service';
import { UpdateEventDto } from 'src/event/dtos/update-event.dto';

@ApiTags('admin') 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
              private readonly eventService: EventService
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
 // @ApiBearerAuth()
  regester(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'List of all admins.' })
  @ApiBearerAuth()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Admin found.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    const adminId = parseInt(id, 10);
    return this.adminService.findOne(adminId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/event_no_accept')
  @ApiResponse({ status: 200, description: 'List event no accept.' })
  findByStatus() {
    return this.eventService.getEventByStatus();
  }
 
  @UseGuards(AuthGuard('jwt'))
  @Get('getAllevent')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getbyidevent/:id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'The found event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id') id: string){
    return this.eventService.getEventById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updateevent/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'The updated event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(@Param('id') id: string, @Body() requestBody:UpdateEventDto)  {
    return this.eventService.updateEvent(+id, requestBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteevent/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(+id);
  }

}
