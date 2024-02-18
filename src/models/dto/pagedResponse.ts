import { User } from "../entity/user";

export class PagedResponse{
  page: number;
  count: number;
  totalElements: number;
  totalPages: number;
  content: User[];

}