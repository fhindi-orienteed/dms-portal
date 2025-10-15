interface RatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  showNumber = true,
  size = "md",
  className = ""
}) => {
  const getStarSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-sm";
      case "lg":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  const getNumberSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-xs";
      case "lg":
        return "text-sm";
      default:
        return "text-xs";
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ☆
        </span>
      );
    }
    
    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">
          ☆
        </span>
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className={`flex items-center gap-0.5 ${getStarSize()}`}>
        {renderStars()}
      </div>
      {showNumber && (
        <span className={`text-gray-500 dark:text-gray-400 ${getNumberSize()}`}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default Rating;
