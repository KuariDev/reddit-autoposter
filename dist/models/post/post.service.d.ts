import { PrismaService } from '../../providers/database/prisma/provider.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface';
import { IAppConfigService } from '../../configuration/app/config.interface';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly prismaService;
    private readonly appConfigService;
    constructor(prismaService: PrismaService, appConfigService: IAppConfigService);
    getAllByUser(userFromReq: IAccessTokenPayload): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {})[]>;
    getById(id: string): Promise<{
        account: import("@prisma/client/runtime").GetResult<{
            id: string;
            userId: string;
            userAgent: string;
            login: string;
            password: string;
            clientId: string;
            clientSecret: string;
        }, unknown, never> & {};
        createdPosts: (import("@prisma/client/runtime").GetResult<{
            id: string;
            url: string;
            postId: string;
            created_at: Date;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {}>;
    delete(id: string, userFromReq: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {}>;
    create(createPostDto: CreatePostDto, userFromReq: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {}>;
    update(updateDto: UpdatePostDto, userFromReq: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {}>;
    stop(id: string, userFromReq: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        subbreditNames: string[];
        title: string;
        imageUrl: string;
        text: string;
        isNSFW: boolean;
        postInSeconds: number;
        send_at: Date;
        isSent: boolean;
        accountId: string;
        created_at: Date;
    }, unknown, never> & {}>;
    private _getPostUrl;
    sendPost(): Promise<void>;
}
