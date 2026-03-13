import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  showValue = true,
}: StarRatingProps) {
  return (
    <View className="flex-row items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;

        return (
          <Star
            key={i}
            size={size}
            color={filled || half ? "#eab308" : "#374151"}
            fill={filled ? "#eab308" : half ? "#eab30880" : "transparent"}
          />
        );
      })}
      {showValue && (
        <Text className="text-white text-sm ml-1">{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}
