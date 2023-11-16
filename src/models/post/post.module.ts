import { Module } from '@nestjs/common'
import { AuthModule } from '../../auth/auth.module'
import { AuthController } from '../../auth/auth.controller'
import { AuthService } from '../../auth/auth.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}