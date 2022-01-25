export class ProductFilterKeywordRequestDto {
  sort: string;
  category: string | null;
  offset: number | null;
  limit: number | null;
}