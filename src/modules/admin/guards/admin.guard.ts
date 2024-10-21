import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
@Injectable()
export class AdminGuards implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const adminRole = this.reflector.get<string[]>('roles', context.getHandler());
  
    if (!adminRole) {
      console.error('adminRole is undefined');
      return false;
    }
  
    const request = context.switchToHttp().getRequest();
    const admin = request.admin; 
  
    if (!admin) {
      console.error('Admin not found in request');
      return false;
    }
  
    console.log('Admin:', admin); 
    console.log('Admin Roles:', admin.role); 
  
    
    if (!admin.role) {
      console.error('Admin roles is undefined or not an array');
      return false;
    }
  
    return adminRole.includes(admin.role.toString());
  }
}  