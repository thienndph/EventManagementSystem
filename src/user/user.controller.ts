// src/users/user.controller.ts
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateEventDto } from 'src/event/dtos/create-event.dto';
import { EventUser } from '@prisma/client';
import { EventService } from 'src/event/event.service';
import { UserAccessMiddleware } from 'src/middleware/user-access.middleware';

@ApiTags('user')
@Controller('user')
@UseInterceptors(UserAccessMiddleware) 
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly eventService: EventService
  ) {}


  @Post('createEvent')
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  async createEvent(@Body() requestBody: CreateEventDto, @Req() @Req() req: any) {
        const userId = req.user.id;
        console.log(userId);
       return this.eventService.createEvent(requestBody,userId);
      }

  @Post()
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({ status: 201, description: 'User register successfully.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @UseGuards(AuthGuard('jwt')) // Sử dụng guard xác thực JWT
  //@UseInterceptors(UserAccessMiddleware) 
  @Get('getalluser')
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
  

}
