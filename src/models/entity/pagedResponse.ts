import { User } from "./user";

export class PagedResponse{
  page: number;
  count: number;
  totalElements: number;
  totalPages: number;
  content: User[];

}