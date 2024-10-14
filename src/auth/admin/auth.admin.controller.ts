import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/dtos/login-user.dto';

@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}


  @Post('admin/login')
  async loginAdmin(@Body() loginDto: LoginDto) {
    return this.authAdminService.loginAdmin(loginDto);
  }

}
