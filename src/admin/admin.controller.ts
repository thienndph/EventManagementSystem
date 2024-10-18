import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { AdminGuard } from 'src/decorator/role.decorator';

import { AuthGuard } from '@nestjs/passport';
import { EventUserService } from 'src/event_user/event_user.service';
import { EventService } from 'src/event/event.service';
import { Event } from '@prisma/client';
import { UpdateEventDto } from 'src/event/dtos/update-event.dto';
import { AdminGuards } from './guards/admin.guard';
import { AdminAccessMiddleware } from 'src/middleware/admin-access.middleware';
import { CreateEventDto } from 'src/event/dtos/create-event.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('admin')
@ApiBearerAuth()
// @UseGuards(AdminAccessMiddleware)
@Controller('admin')
@UseGuards(AdminGuards)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly eventService: EventService,
    private readonly userService: UserService
  ) { }

  //////////*ADMIN*//////////
  @AdminGuard(['SUPER_ADMIN'])
  @Post()
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  regester(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.role =("ADMIN")
    return this.adminService.create(createAdminDto);
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getAll')
  @ApiResponse({ status: 200, description: 'List of all admins.' })
  findAll() {
    return this.adminService.findAll();
  }


  @AdminGuard(['SUPER_ADMIN','ADMIN'])
  @Get('getByID/:id')
  @ApiResponse({ status: 200, description: 'Admin found.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  async getAdminById(@Param('id') id: string) {  
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.adminService.findOne(+id);
  }

  isNumber(value: any): boolean {
    const num = Number(value); 
    return !isNaN(num) && typeof num === 'number';  
  }

  @AdminGuard(['SUPER_ADMIN'])
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.adminService.update(+id, updateAdminDto);
  }

  @AdminGuard(['SUPER_ADMIN'])
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  remove(@Param('id') id: string) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.adminService.remove(+id);
  }



  //////////*EVENT*//////////
  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('/event_no_accept')
  @ApiResponse({ status: 200, description: 'List event no accept.' })
  findByStatus() {
    const status = 0;
    console.log('TEST')
    return this.eventService.getEventByStatus(status);
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('eventAll')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getIdEvent/:id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'The found event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id') id: string): Promise<Event> {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    const parsedId = Number(id);
    return this.eventService.getEventById(parsedId);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Patch('updateEvent/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'The updated event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(@Param('id') id: string, @Body() requestBody: UpdateEventDto) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.eventService.updateEvent(+id, requestBody);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Delete('deleteEvent/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async deleteEvent(@Param('id') id: string): Promise<Event> {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.eventService.deleteEvent(+id);
  }

  //////////*USER*//////////
  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getalluser')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAllUser() {
    return this.userService.findAll();
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getIdUser/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  findOneUser(@Param('id') id: string) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.userService.findOne(+id);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Patch('updateUser/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.userService.updateUser(+id, updateUserDto);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Delete('deleteUser/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  removeUser(@Param('id') id: string) {
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.userService.deleteUser(+id);
  }
 
  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardOverview();
  }
}
