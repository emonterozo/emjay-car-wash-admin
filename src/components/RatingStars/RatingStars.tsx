import React from 'react';
import { StarIcon, StarHalfFillIcon } from '@app/icons';

type RatingStarsProps = {
  rating: number;
};

const RatingStars = ({ rating }: RatingStarsProps) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<StarIcon key={i} />);
    } else if (rating >= i - 0.5) {
      // Half-filled star
      stars.push(<StarHalfFillIcon key={i} />);
    } else {
      // Empty star
      stars.push(<StarIcon key={i} fill="#888888" />);
    }
  }
  return <>{stars}</>;
};

export default RatingStars;
