import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
import { AuthGuard } from '../../core/guards/auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { UserFromReq } from '../../core/decorators/userFromReq.decorator'
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getByUser(@UserFromReq() user: IAccessTokenPayload) {
    return this.postService.getAllByUser(user)
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getById(@UserFromReq() user: IAccessTokenPayload, @Param('id') id: string) {
    return this.postService.getById(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @UserFromReq() user: IAccessTokenPayload) {
    return this.postService.create(createPostDto, user)
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Body() updatePostDto: UpdatePostDto, @UserFromReq() user: IAccessTokenPayload) {
    return this.postService.update(updatePostDto, user)
  }

  @Post('/stop/:id')
  @UseGuards(AuthGuard)
  async stop(@Param('id') id: string, @UserFromReq() user: IAccessTokenPayload) {
    return this.postService.stop(id, user)
  }
}