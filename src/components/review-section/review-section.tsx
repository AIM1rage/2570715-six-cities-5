import ReviewList from '@/components/review-list/review-list.tsx';
import {Comment} from '@/types/api.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import ReviewForm from '@/components/review-form/review-form.tsx';
import {memo} from 'react';
import {getAuthorizationStatus} from '@/store/app-user/selectors.ts';

interface ReviewSectionProps {
  comments: Comment[];
}

function ReviewSection({comments}: ReviewSectionProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ReviewList comments={comments}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm/>}
    </section>
  );
}

const MemoizedReviewSection = memo(ReviewSection, (prevProps, nextProps) =>
  prevProps.comments.map((comment) => comment.id).join() === nextProps.comments.map((comment) => (comment.id)).join());
export default MemoizedReviewSection;
