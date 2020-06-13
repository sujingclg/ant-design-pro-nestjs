import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findAllUsers() {
    return 'All users';
  }
}
