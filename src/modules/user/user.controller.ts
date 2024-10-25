import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateEventDto } from 'src/modules/event/dtos/create-event.dto';
import { EventService } from 'src/modules/event/event.service';
import { UserAccessMiddleware } from 'src/middleware/user-access.middleware';
import { UpdateUserDto } from './dtos/update-user.dto';
import { EventUserService } from '../event_user/event_user.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(UserAccessMiddleware)
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly eventService: EventService,
    private readonly eventUserSevice: EventUserService


  ) { }

  @Get('eventAll')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  @ApiBearerAuth()
  async getAllEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventService.getAllEvents(page, limit);
  }


  @Post('createEvent')
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  async createEvent(@Body() requestBody: CreateEventDto, @Req() @Req() req: any) {
    const userId = req.user.id;
    console.log("userId+>" + userId);
    // requestBody.status=Events
    return this.eventService.createEvent(requestBody, userId);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'The user profile has been retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async getProfile(@Req() req: any) {

    const userId = req.user.id;
    const userProfile = await this.userService.findOne(userId);

    if (!userProfile) {
      throw new BadRequestException('User not found');
    }

    return userProfile;
  }

  @Patch('updateprofile')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    const userId = req.user.id;
    console.log(userId);
    return this.userService.updateUser(userId, updateUserDto);
  }

  isNumber(value: any): boolean {
    const num = Number(value);
    return !isNaN(num) && typeof num === 'number';
  }
  @Patch('JoinEvent/:id')
  @ApiOperation({ summary: 'Join an event as a user' })
  @ApiResponse({ status: 200, description: 'User successfully joined the event' })
  @ApiResponse({ status: 404, description: 'User or event not found' })
  @ApiResponse({ status: 400, description: 'User has already joined this event' })
  @ApiResponse({ status: 400, description: 'The event is full, no more seats available' })
  @ApiBearerAuth()
  async JoinEvent(@Param('id') idEvent: string, @Req() req: any) {
    if (!this.isNumber(idEvent)) {
      throw new BadRequestException('Vui lòng nhập số');
    }
    const userId = parseInt(req.user.id, 10);
    const eventId = parseInt(idEvent, 10);
    const existingEventUser = await this.eventUserSevice.findOne({
      idEvent: eventId,
      idUser: userId,
    });

    if (existingEventUser) {
      throw new BadRequestException('User has already joined this event');
    }

    const countUsers = await this.eventUserSevice.countUsersInEvent(eventId);
    const event = await this.eventService.findOne(eventId);

    if (countUsers >= event.seats) {
      throw new BadRequestException('The event is full, no more seats available');
    }

    return this.eventUserSevice.create({
      idEvent: eventId,
      idUser: userId,
    });


  }




  @Get('getJoinEvent')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  getJoinEvent(@Req() req: any, @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,) {
    const userId = req.user.id;
    console.log(userId);
    return this.eventUserSevice.findUserEvents(userId, page, limit);
  }

}
