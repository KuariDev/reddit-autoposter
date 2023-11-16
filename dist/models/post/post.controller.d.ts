import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getByUser(user: IAccessTokenPayload): Promise<(import("@prisma/client/runtime").GetResult<{
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
    getById(user: IAccessTokenPayload, id: string): Promise<{
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
    create(createPostDto: CreatePostDto, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
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
    update(updatePostDto: UpdatePostDto, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
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
    stop(id: string, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
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
}
