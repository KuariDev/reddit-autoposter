import { Role } from "@prisma/client";
export interface IAccessTokenPayload {
    id: string;
    role: keyof typeof Role;
}
