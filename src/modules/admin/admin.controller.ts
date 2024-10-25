import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, BadRequestException, Req, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { AdminGuard } from 'src/decorator/role.decorator';
import { EventService } from '../event/event.service';
import { Event } from '@prisma/client';
import { UpdateEventDto } from '../event/dtos/update-event.dto';
import { AdminGuards } from './guards/admin.guard';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { UserService } from '../user/user.service';
import { CreateAdminLogDto } from '../adminlog/dto/create-admin-log.dto';
import { AdminLogService } from '../adminlog/admin-log.service';
import { UserStatus } from '@prisma/client';
import { SearchEventDto } from '../event/dtos/event.dto';
import { eventStatus } from 'src/enums/eventStatus';

@ApiTags('admin')
@ApiBearerAuth()
// @UseGuards(AdminAccessMiddleware)
@Controller('admin')
@UseGuards(AdminGuards)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly logAdminService: AdminLogService,
  ) { }

  //////////*ADMIN*//////////
  @AdminGuard(['SUPER_ADMIN'])
  @Post()
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  regester(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.role = ("ADMIN")
    return this.adminService.create(createAdminDto);
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getAll')
  @ApiResponse({ status: 200, description: 'List of all admins.' })
  async findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.adminService.findAll(page, limit);
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
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
  @Patch('admin/:id')
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
    const parsedId = Number(id);
    // const user = await this.u.findUnique({
    //   where: { id },
    // });
    if (!this.isNumber(id)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    return this.adminService.remove(+parsedId);
  }



  //////////*EVENT*//////////
  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('/event_no_accept')
  @ApiResponse({ status: 200, description: 'List event no accept.' })
  async findByStatus(
    @Query('page') page:string,  @Query('limit') limit :string
  ) {
    const status = 0;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
  
    return this.eventService.getEventByStatus(status, pageNumber, limitNumber);
  }
  

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Post('eventConfirm/:id')
  @ApiResponse({ status: 200, description: 'List event no accept.' })
  async confirmEvent(@Param('id') id: string,@Req() req: any): Promise<Event> {
    console.log("Id=>"+id)
    const parsedId = Number(id);
    console.log("parsedId=>"+parsedId)
    if (!this.isNumber(parsedId)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    const event_confirm= this.eventService.getEventById(parsedId);
    if(!event_confirm){
      throw new BadRequestException('Vui lòng nhập lại đúng');
      }

    const event =this.eventService.updateStatus(id);

    const adminId = req.admin.id;
    const logData: CreateAdminLogDto = {
      adminId: adminId,
      action: 'UPDATE',
      eventId: parsedId,
    };

    await this.logAdminService.create(logData);

    return event;
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('eventAll')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  async getAllEvents(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10, 
  ) {
    return this.eventService.getAllEvents(page, limit); 
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getIdEvent/:id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'The found event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id') id: string): Promise<Event> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const eventId = parseInt(id, 10);
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return this.eventService.getEventById(eventId);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Patch('updateEvent/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'The updated event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(@Param('id') id: string, @Body() requestBody: UpdateEventDto,@Req() req) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const eventId = parseInt(id, 10);
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event dùng không tồn tại');
    }
    if(event.status==eventStatus.DELETE){
      throw new NotFoundException('Event đã bị xoá');
    }
    const eventUpdate= this.eventService.updateEvent(+id, requestBody);

    const adminId = req.admin.id;
    const logData: CreateAdminLogDto = {
      adminId: adminId,
      action: 'UPDATE',
      eventId: eventId,
    };

    await this.logAdminService.create(logData);
    return eventUpdate;
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Delete('deleteEvent/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'The event has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async deleteEvent(@Param('id') id: string,@Req() req): Promise<Event> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const eventId = parseInt(id, 10);
    const event = await this.eventService.findOne(eventId);
    console.log("event=>"+event)
    if (!event) {
      throw new NotFoundException('Event không tồn tại');
    }
    if(event.status==eventStatus.DELETE){
      throw new NotFoundException('Event không còn tồn tại');
    }
    const eventDelete= this.eventService.delelte(+id);
    const adminId = req.admin.id;
    const logData: CreateAdminLogDto = {
      adminId: adminId,
      action: 'DELETE',
      eventId: eventId,
    };
    await this.logAdminService.create(logData);
    return eventDelete;
  }


  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getalluser')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  async findAllUser(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10 
  ) {
    return this.userService.findAll(page, limit); 
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('getIdUser/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async findOneUser(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if(user.status=UserStatus.INACTIVE){
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return this.userService.findOne(+id);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Patch('updateUser/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    console.log('user.status =>'+user.status)
    if(user.status==UserStatus.INACTIVE){
      throw new NotFoundException('Người dùng không tồn tại');
    }

    return this.userService.updateUser(+id, updateUserDto);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Patch('lockUser/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async lockUser(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    console.log('user.status =>'+user.status)
    if(user.status==UserStatus.INACTIVE){
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if(user.status==UserStatus.BLOCKED){
      throw new NotFoundException('Người dùng đã bị block');
    }

    return this.userService.lockUser(+id);
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Delete('deleteUser/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async removeUser(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Vui lòng nhập một số hợp lệ');
    }
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if(user.status==UserStatus.INACTIVE){
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return this.userService.deleteUser(userId);
  }
  

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardOverview();
  }

  @AdminGuard(['SUPER_ADMIN', 'ADMIN'])
  @Get('findEventByTime')
  @ApiOperation({ summary: 'Find event by time' })
  @Get('search')
  async searchEvents(@Query() query: SearchEventDto) {
    return this.eventService.findEvents(query);
  }
}
