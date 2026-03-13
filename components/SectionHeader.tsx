import { View, Text, Pressable } from "react-native";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-white text-xl font-medium">{title}</Text>
      {actionLabel && (
        <Pressable onPress={onAction}>
          <Text className="text-sm text-gray-400">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
