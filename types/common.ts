export interface ApiResponse {
  message: string;
  data?: any;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}