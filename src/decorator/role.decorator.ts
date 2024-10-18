import { SetMetadata } from '@nestjs/common';

export const AdminGuard = (roles: string[]) => SetMetadata('roles', roles);
