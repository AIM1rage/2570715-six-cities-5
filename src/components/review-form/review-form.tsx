import {CommentInfo} from '@/types/comment-info.ts';
import {ChangeEvent, FormEvent, memo, useState} from 'react';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';
import {useParams} from 'react-router-dom';
import {postCommentAction} from '@/store/api-actions.ts';
import {validateCommentInfo} from '@/utils/utils.ts';

function renderRatingRadioInput(
  rating: number,
  title: string,
  isSubmitting: boolean,
  handleCommentInfoChange: (changeEvent: ChangeEvent<HTMLInputElement>) => void,
  commentInfo: CommentInfo) {
  return (
    <>
      <input className="form__rating-input visually-hidden" disabled={isSubmitting}
        checked={commentInfo.rating === rating} onChange={handleCommentInfoChange} name="rating" value={rating}
        id={`${rating}-stars`} type="radio"
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>);
}

function ReviewForm() {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [commentInfo, setCommentInfo] = useState<CommentInfo>({
    offerId: id!,
    comment: '',
    rating: 0
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setCommentInfo({...commentInfo, [name]: name === 'rating' ? Number(value) : value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id) {
      return;
    }

    if (!validateCommentInfo(commentInfo)) {
      return;
    }

    setIsSubmitting(true);

    dispatch(postCommentAction(commentInfo))
      .unwrap()
      .then(() => setCommentInfo({...commentInfo, comment: '', rating: 0}))
      .catch(() => setErrorMessage('Failed to submit review. Please try again.'))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderRatingRadioInput(5, 'perfect', isSubmitting, handleRatingChange, commentInfo)}
        {renderRatingRadioInput(4, 'good', isSubmitting, handleRatingChange, commentInfo)}
        {renderRatingRadioInput(3, 'not bad', isSubmitting, handleRatingChange, commentInfo)}
        {renderRatingRadioInput(2, 'badly', isSubmitting, handleRatingChange, commentInfo)}
        {renderRatingRadioInput(1, 'terribly', isSubmitting, handleRatingChange, commentInfo)}
      </div>
      <textarea className="reviews__textarea form__textarea" disabled={isSubmitting} onChange={handleRatingChange}
        value={commentInfo.comment} id="review" name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit a review, please make sure to set a <span className="reviews__star">rating</span> and describe your
          stay with a text between
          <b className="reviews__text-amount"> 50 and 300
            characters.
          </b> ({commentInfo.comment.length}/300)
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || !validateCommentInfo(commentInfo)}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </form>
  );
}


const MemoizedReviewForm = memo(ReviewForm);
export default MemoizedReviewForm;
