// src/users/user.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateEventDto } from 'src/event/dtos/create-event.dto';
import { EventService } from 'src/event/event.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly eventService: EventService
  ) {}

  @Post()
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({ status: 201, description: 'User register successfully.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details'})
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('create_event')
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createEvent(@Body() requestBody: CreateEventDto, @Req() @Req() req: any) {
    const userId = req.user.id;
    console.log(userId);
   return this.eventService.createEvent(requestBody,userId);
  }
}
