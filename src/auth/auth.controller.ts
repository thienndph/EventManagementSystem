import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; // Đảm bảo đường dẫn đúng
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { LoginUserDto } from './dtos/login-user.dto';

 @ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService :UserService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Request() req) {
    // Tự động chuyển hướng đến Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    
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

  
  @Post('registerUser')
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({ status: 201, description: 'User register successfully.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
https://github.com/thienndph/EventManagementSystem/pull/6/conflict?name=src%252Fauth%252Fauth.controller.ts&ancestor_oid=6a2d2d8458266a5a40df2428e76a3ce766164521&base_oid=fe8d695d79165616204882c20d6890a4c381a079&head_oid=1d21110cfbf9f629486670d42fe835e58fa9c90e
//   @Post('refresh')
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
