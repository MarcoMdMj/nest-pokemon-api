import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  readonly limit?: number;

  @IsOptional()
  @IsPositive()
  readonly offset?: number;
}