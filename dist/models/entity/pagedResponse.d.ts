import { User } from "./user";
export declare class PagedResponse {
    page: number;
    count: number;
    totalElements: number;
    totalPages: number;
    content: User[];
}
