import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; // Đảm bảo đường dẫn đúng
import { AuthGuard } from '@nestjs/passport';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dtos/create-admin.dto';
import { RegisterUserDto } from '../user/dtos/register-user.dto';

 @ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService :UserService,
    private readonly adminService :AdminService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Request() req) {
    // Tự động chuyển hướng đến Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    console.log("1")
    return this.authService.login(req.user); 
  }

  @Post('userlogin')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }
  
  @Post('adminlogin')
  async adminLogin(@Body() loginDto: LoginAdminDto) {
    return this.authService.loginadmin(loginDto);
  }
  
  @Post('registerAdmin')
  @ApiOperation({ summary: 'Admin created' })
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  regesterasdmin(@Body() createAdminDto: RegisterUserDto) {
    return this.adminService.create(createAdminDto);
  }
  
  @Post('registerUser')
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({ status: 201, description: 'User register successfully.' })
  registerUser(@Body() createUserDto: RegisterUserDto) {
    return this.userService.createUser(createUserDto);
  }

// async refreshToken(@Body('refreshToken') refreshToken: string) {
//   if (!refreshToken) {
//     throw new BadRequestException('Refresh token is required');
//   }

//   console.log('Received refresh token:', refreshToken); // In ra token để kiểm tra

//   try {
//     const payload = this.jwtService.verify(refreshToken, {
//       secret: 'refresh_token_secret', // Đảm bảo sử dụng secret chính xác
//     });

//     const newAccessToken = this.authService.createAccessToken(payload);
//     return { accessToken: newAccessToken };
//   } catch (error) {
//     console.error('Error verifying token:', error); // Log lỗi để kiểm tra chi tiết
//     throw new BadRequestException('Invalid refresh token');
//   }
// }

}