import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AccountService } from './account.service'
import { AuthGuard } from '../../core/guards/auth.guard'
import { CreateAccountDto } from './dto/create-account.dto'
import { UserFromReq } from '../../core/decorators/userFromReq.decorator'
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface'

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getByUser(@UserFromReq() user: IAccessTokenPayload) {
    return this.accountService.getByUser(user)
  }

  @Post()
  @UseGuards(AuthGuard)
  async createAccount(@Body() createAccountDto: CreateAccountDto, @UserFromReq() user: IAccessTokenPayload) {
    return this.accountService.create(createAccountDto, user)
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  async deleteAccount(@Param('id') id: string, @UserFromReq() user: IAccessTokenPayload) {
    return this.accountService.delete(id, user)
  }
}