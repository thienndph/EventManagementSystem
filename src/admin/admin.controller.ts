import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@ApiTags('admin') 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  @ApiBearerAuth()
  regester(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'List of all admins.' })
  @ApiBearerAuth()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Admin found.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
