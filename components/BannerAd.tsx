import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface BannerAdProps {
  title: string;
  description: string;
  colors?: [string, string, ...string[]];
}

export function BannerAd({
  title,
  description,
  colors = ["#2563eb", "#9333ea"],
}: BannerAdProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="rounded-2xl p-6 items-center"
    >
      <Text className="text-white text-lg font-medium mb-2">{title}</Text>
      <Text className="text-white text-sm opacity-90 text-center">
        {description}
      </Text>
    </LinearGradient>
  );
}
