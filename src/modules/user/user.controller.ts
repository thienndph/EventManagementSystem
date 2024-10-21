import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

import { CreateEventDto } from 'src/modules/event/dtos/create-event.dto';
import { EventUser } from '@prisma/client';
import { EventService } from 'src/modules/event/event.service';
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

  // @Post()
  // @ApiOperation({ summary: 'register a new user' })
  // @ApiResponse({ status: 201, description: 'User register successfully.' })
  // register(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }


 // @UseGuards(AuthGuard('jwt')) // Sử dụng guard xác thực JWT
 //@UseInterceptors(UserAccessMiddleware) 
//   @Get('getalluser')
//   @ApiOperation({ summary: 'Get all users' })
//   @ApiResponse({ status: 200, description: 'List of users' })
//   @ApiBearerAuth()
//   findAll() {
//     return this.userService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a user by ID' })
//   @ApiResponse({ status: 200, description: 'User details'})
//   @ApiResponse({ status: 404, description: 'User not found' })
//   @ApiBearerAuth()
//   findOne(@Param('id') id: string) {
//     return this.userService.findOne(+id);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a user' })
//   @ApiResponse({ status: 200, description: 'User updated successfully' })
//   @ApiResponse({ status: 404, description: 'User not found' })
//   @ApiBearerAuth()
//   update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
//     if(this.isNumber(id)==false){

//       return 'Vui lòng nhập số';
//     }
//     return this.userService.updateUser(+id, updateUserDto);
//   }
  
//    isNumber(value: any): boolean {
//     return typeof value === 'number' && !isNaN(value); // Kiểm tra kiểu dữ liệu và xem nó có phải là NaN không
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a user' })
//   @ApiResponse({ status: 204, description: 'User deleted successfully' })
//   @ApiResponse({ status: 404, description: 'User not found' })
//   @ApiBearerAuth()
//   remove(@Param('id') id: string) {
//     return this.userService.deleteUser(+id);
//   }
  

 }
