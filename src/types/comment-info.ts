import {Guid} from '@/types/api.ts';

export type CommentInfo = {
  offerId: Guid;
  comment: string;
  rating: number;
}
