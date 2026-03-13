import { View, Text } from "react-native";

interface FieldIconProps {
  type: string;
}

export function FieldIcon({ type }: FieldIconProps) {
  const number = type.match(/\d+/)?.[0] ?? "";

  return (
    <View className="w-12 h-8 bg-green-800 rounded-md items-center justify-center border border-green-600 relative overflow-hidden">
      <View className="absolute top-0 bottom-0 left-1/2 w-px bg-green-600/60" />
      <View className="absolute w-3 h-3 rounded-full border border-green-600/60" />
      <Text className="text-white text-xs font-bold z-10">{number}</Text>
    </View>
  );
}
