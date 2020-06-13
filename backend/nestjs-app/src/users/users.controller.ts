import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: '查询所有用户' })
  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: '通过ID查询某个用户' })
  @Get(':id')
  async findUserById(@Param('id', new ParseIntPipe()) id: number) {
    console.log(typeof id);
    return 'get user by id';
  }
}
