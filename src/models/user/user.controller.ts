import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AdminGuard } from '../../core/guards/admin.guard'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    return this.userService.getAll()
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}