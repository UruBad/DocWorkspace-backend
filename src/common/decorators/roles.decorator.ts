import { SetMetadata } from '@nestjs/common';
import { ERole } from '../index';

export const ROLE_KEY = 'role';

export const Roles = (...roles: ERole[]) => SetMetadata(ROLE_KEY, roles);
