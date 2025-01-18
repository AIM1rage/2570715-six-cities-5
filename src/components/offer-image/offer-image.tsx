import {memo} from 'react';

interface OfferImageProps {
  src: string;
}

function OfferImage({src}: OfferImageProps) {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={src}
        alt="Photo studio"
      />
    </div>
  );
}

const MemoizedOfferImage = memo(OfferImage);
export default MemoizedOfferImage;
