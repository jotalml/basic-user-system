import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { User } from "../entity/user";

export class PagedResponse{
  @ApiProperty()
  page: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  totalElements: number;

  @ApiProperty()
  totalPages: number;

  @ApiResponseProperty({
    type : () => [User]
  })
  content: User[];

}