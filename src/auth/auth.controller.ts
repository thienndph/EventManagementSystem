// import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service'; // Đảm bảo đường dẫn đúng
// import { AuthGuard } from '@nestjs/passport';
// import { LoginDto } from 'src/user/dtos/login-user.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   googleAuth(@Request() req) {
//     // Tự động chuyển hướng đến Google
//   }

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   googleAuthRedirect(@Request() req) {
//     return this.authService.login(req.user); // Trả về JWT token
//   }

//   @Post('user/login')
//   async loginUser(@Body() loginDto: LoginDto) {
//     return this.authService.loginUser(loginDto);
//   }

//   @Post('admin/login')
//   async loginAdmin(@Body() loginDto: LoginDto) {
//     return this.authService.loginAdmin(loginDto);
//   }

// }
