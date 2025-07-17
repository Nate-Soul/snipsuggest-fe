import type { Pagination } from './common';

// Interfaces for comments and pagination
export interface CommentResponse {
  id: number;
  user: { username: string; };
  content: string;
  timestamp: string;
  parent_id: number | null;
  replies: CommentResponse[];
}

// export interface CommentResponse {
//   data: Comment[];
//   pagination: Pagination;
//   message: string;
// }