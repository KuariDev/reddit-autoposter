import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../../providers/database/prisma/provider.service'
import * as snoowrap from 'snoowrap'
import { CreatePostDto } from './dto/create-post.dto'
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface'
import { IAppConfigService } from '../../configuration/app/config.interface'
import { UpdatePostDto } from './dto/update-post.dto'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IAppConfigService) private readonly appConfigService: IAppConfigService
  ) {}

  async getAllByUser(userFromReq: IAccessTokenPayload) {
    return this.prismaService.post.findMany({
      where: {
        account: {
          userId: userFromReq.id
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  async getById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id
      },
      include: {
        account: true,
        createdPosts: true
      }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }


  async delete(id: string, userFromReq: IAccessTokenPayload) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: id,
        account: {
          userId: userFromReq.id
        }
      }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return this.prismaService.post.delete({
      where: {
        id: post.id
      }
    })
  }

  async create(createPostDto: CreatePostDto, userFromReq: IAccessTokenPayload) {
    const account = await this.prismaService.account.findFirst({
      where: {
        id: createPostDto.accountId,
        userId: userFromReq.id
      }
    })
    if (!account) {
      throw new BadRequestException('Account not found')
    }

    if (Boolean(createPostDto.text) == Boolean(createPostDto.imageUrl)) {
      throw new BadRequestException('Or text post ot image post')
    }

    const r = new snoowrap({
      userAgent: `${this.appConfigService.name} by /u/${account.login}`,
      clientId: account.clientId,
      clientSecret: account.clientSecret,
      username: account.login,
      password: account.password
    })
    for (let i = 0; i < createPostDto.subbreditNames.length; i++) {
      const subReddit = r.getSubreddit(createPostDto.subbreditNames[i])
      try {
        await subReddit.title
      } catch (e) {
        throw new BadRequestException('Subreddit not found')
      }

      await subReddit.subscribe().then(() => {})
    }

    const postModel = await this.prismaService.post.create({
      data: {
        account: { connect: { id: account.id } },
        isNSFW: createPostDto.isNSFW,
        text: createPostDto.text,
        title: createPostDto.title,
        postInSeconds: null,
        imageUrl: createPostDto.imageUrl,
        subbreditNames: createPostDto.subbreditNames,
        send_at: new Date(createPostDto.send_at)
      }
    })
    return postModel
/*    let url = ''
    if (createPostDto.text) {
      const post = r.submitSelfpost({
        subredditName: createPostDto.subbreditName,
        nsfw: createPostDto.isNSFW,
        text: createPostDto.text,
        title: createPostDto.title,
      })
      url = await this._getPostUrl(post)
    } else {
      const post = r.submitLink({
        subredditName: createPostDto.subbreditName,
        nsfw: createPostDto.isNSFW,
        url: createPostDto.imageUrl,
        title: createPostDto.title,
      })
      url = await this._getPostUrl(post)
    }
    await this.prismaService.createdPost.create({
      data: {
        postId: postModel.id,
        url: url
      }
    })*/
  }

  async update(updateDto: UpdatePostDto, userFromReq: IAccessTokenPayload) {
    console.log(updateDto)
    const post = await this.prismaService.post.findUnique({
      where: {
        id: updateDto.id
      },
      include: {
        account: true
      }
    })
    if (!post || post.account.userId != userFromReq.id) {
      throw new BadRequestException('Post not found')
    }

    if ((post.text && updateDto.imageUrl) || (post.imageUrl && updateDto.text)) {
      throw new BadRequestException('The post has a different type of message')
    }

    return this.prismaService.post.update({
      where: {
        id: updateDto.id
      },
      data: {
        ...updateDto,
        postInSeconds: null,
        isSent: false,
        send_at: new Date(updateDto.send_at)
      }
    })
  }

  async stop(id: string, userFromReq: IAccessTokenPayload) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id
      },
      include: {
        account: true
      }
    })
    if (!post || post.account.userId != userFromReq.id) {
      throw new BadRequestException('Post not found')
    }
    return  this.prismaService.post.update({
      where: {
        id: id
      },
      data: {
        postInSeconds: null,
        send_at: null
      }
    })
  }

  private async _getPostUrl(post) {
    return await post.url
  }

  @Cron(CronExpression.EVERY_SECOND)
  async sendPost() {
    const posts = await this.prismaService.post.findMany({
      where: {
        isSent: false,
        send_at: {
          lte: new Date(new Date().getTime())
        }
      }
    })
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]

      if (!post.send_at) {
        continue
      }

      await this.prismaService.post.update({
        where: {
          id: post.id
        },
        data: {
          isSent: true
        }
      })
      const account = await this.prismaService.account.findUnique({
        where: {
          id: post.accountId
        }
      })

      const r = new snoowrap({
        userAgent: `${this.appConfigService.name} by /u/${account.login}`,
        clientId: account.clientId,
        clientSecret: account.clientSecret,
        username: account.login,
        password: account.password
      })

      console.log(`Новый пост -`)
      console.table(post)
      console.log('============================================')

      for (let j = 0; j < post.subbreditNames.length; j++) {
        let url = ''
        if (post.text && post.text != null) {
          try {
            const postOnReddit = r.submitSelfpost({
              subredditName: post.subbreditNames[j],
              nsfw: post.isNSFW,
              text: post.text,
              title: post.title,
            })
            url = await this._getPostUrl(postOnReddit)
          } catch (e) {
            await this.prismaService.error.create({
              data: {
                postId: post.id
              }
            })
          }
        } else {
          try {
            const postOnReddit = r.submitLink({
              subredditName: post.subbreditNames[j],
              nsfw: post.isNSFW,
              url: post.imageUrl,
              title: post.title,
            })
            url = await this._getPostUrl(postOnReddit)
          } catch (e) {
            console.log(e)
            await this.prismaService.error.create({
              data: {
                postId: post.id
              }
            })
          }
        }
        await this.prismaService.createdPost.create({
          data: {
            postId: post.id,
            url: url
          }
        })
      }
    }
  }
}