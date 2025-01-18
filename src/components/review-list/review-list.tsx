import Review from '@/components/review/review.tsx';
import {Comment} from '@/types/api.ts';
import {compareComments} from '@/utils/utils.ts';
import {MAX_REVIEWS_COUNT} from '@/constants/settings.ts';
import {memo} from 'react';

interface ReviewListProps {
  comments: Comment[];
}

function ReviewList({comments}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {comments
        .toSorted(compareComments)
        .slice(0, MAX_REVIEWS_COUNT)
        .map((comment) => (
          <li className="reviews__item" key={comment.id}>
            <Review comment={comment}/>
          </li>))}
    </ul>
  );
}

const MemoizedReviewList = memo(ReviewList, (prevProps, nextProps) =>
  prevProps.comments.map((comment) => comment.id).join() === nextProps.comments.map((comment) => (comment.id)).join());
export default MemoizedReviewList;
