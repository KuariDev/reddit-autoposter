"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("../../providers/database/prisma/provider.service");
const snoowrap = require("snoowrap");
const config_interface_1 = require("../../configuration/app/config.interface");
const schedule_1 = require("@nestjs/schedule");
let PostService = class PostService {
    constructor(prismaService, appConfigService) {
        this.prismaService = prismaService;
        this.appConfigService = appConfigService;
    }
    async getAllByUser(userFromReq) {
        return this.prismaService.post.findMany({
            where: {
                account: {
                    userId: userFromReq.id
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }
    async getById(id) {
        const post = await this.prismaService.post.findUnique({
            where: {
                id: id
            },
            include: {
                account: true,
                createdPosts: true
            }
        });
        if (!post) {
            throw new common_1.BadRequestException('Post not found');
        }
        return post;
    }
    async delete(id, userFromReq) {
        const post = await this.prismaService.post.findFirst({
            where: {
                id: id,
                account: {
                    userId: userFromReq.id
                }
            }
        });
        if (!post) {
            throw new common_1.BadRequestException('Post not found');
        }
        return this.prismaService.post.delete({
            where: {
                id: post.id
            }
        });
    }
    async create(createPostDto, userFromReq) {
        const account = await this.prismaService.account.findFirst({
            where: {
                id: createPostDto.accountId,
                userId: userFromReq.id
            }
        });
        if (!account) {
            throw new common_1.BadRequestException('Account not found');
        }
        if (Boolean(createPostDto.text) == Boolean(createPostDto.imageUrl)) {
            throw new common_1.BadRequestException('Or text post ot image post');
        }
        const r = new snoowrap({
            userAgent: `${this.appConfigService.name} by /u/${account.login}`,
            clientId: account.clientId,
            clientSecret: account.clientSecret,
            username: account.login,
            password: account.password
        });
        for (let i = 0; i < createPostDto.subbreditNames.length; i++) {
            const subReddit = r.getSubreddit(createPostDto.subbreditNames[i]);
            try {
                await subReddit.title;
            }
            catch (e) {
                throw new common_1.BadRequestException('Subreddit not found');
            }
            await subReddit.subscribe().then(() => { });
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
        });
        return postModel;
    }
    async update(updateDto, userFromReq) {
        console.log(updateDto);
        const post = await this.prismaService.post.findUnique({
            where: {
                id: updateDto.id
            },
            include: {
                account: true
            }
        });
        if (!post || post.account.userId != userFromReq.id) {
            throw new common_1.BadRequestException('Post not found');
        }
        if ((post.text && updateDto.imageUrl) || (post.imageUrl && updateDto.text)) {
            throw new common_1.BadRequestException('The post has a different type of message');
        }
        return this.prismaService.post.update({
            where: {
                id: updateDto.id
            },
            data: Object.assign(Object.assign({}, updateDto), { postInSeconds: null, isSent: false, send_at: new Date(updateDto.send_at) })
        });
    }
    async stop(id, userFromReq) {
        const post = await this.prismaService.post.findUnique({
            where: {
                id: id
            },
            include: {
                account: true
            }
        });
        if (!post || post.account.userId != userFromReq.id) {
            throw new common_1.BadRequestException('Post not found');
        }
        return this.prismaService.post.update({
            where: {
                id: id
            },
            data: {
                postInSeconds: null,
                send_at: null
            }
        });
    }
    async _getPostUrl(post) {
        return await post.url;
    }
    async sendPost() {
        const posts = await this.prismaService.post.findMany({
            where: {
                isSent: false,
                send_at: {
                    lte: new Date(new Date().getTime())
                }
            }
        });
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            if (!post.send_at) {
                continue;
            }
            await this.prismaService.post.update({
                where: {
                    id: post.id
                },
                data: {
                    isSent: true
                }
            });
            const account = await this.prismaService.account.findUnique({
                where: {
                    id: post.accountId
                }
            });
            const r = new snoowrap({
                userAgent: `${this.appConfigService.name} by /u/${account.login}`,
                clientId: account.clientId,
                clientSecret: account.clientSecret,
                username: account.login,
                password: account.password
            });
            console.log(`Новый пост -`);
            console.table(post);
            console.log('============================================');
            for (let j = 0; j < post.subbreditNames.length; j++) {
                let url = '';
                if (post.text && post.text != null) {
                    try {
                        const postOnReddit = r.submitSelfpost({
                            subredditName: post.subbreditNames[j],
                            nsfw: post.isNSFW,
                            text: post.text,
                            title: post.title,
                        });
                        url = await this._getPostUrl(postOnReddit);
                    }
                    catch (e) {
                        await this.prismaService.error.create({
                            data: {
                                postId: post.id
                            }
                        });
                    }
                }
                else {
                    try {
                        const postOnReddit = r.submitLink({
                            subredditName: post.subbreditNames[j],
                            nsfw: post.isNSFW,
                            url: post.imageUrl,
                            title: post.title,
                        });
                        url = await this._getPostUrl(postOnReddit);
                    }
                    catch (e) {
                        console.log(e);
                        await this.prismaService.error.create({
                            data: {
                                postId: post.id
                            }
                        });
                    }
                }
                await this.prismaService.createdPost.create({
                    data: {
                        postId: post.id,
                        url: url
                    }
                });
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_SECOND),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostService.prototype, "sendPost", null);
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(config_interface_1.IAppConfigService)),
    __metadata("design:paramtypes", [provider_service_1.PrismaService, Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map