import { View, Text, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

interface ListRowProps {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
  showBorder?: boolean;
}

export function ListRow({
  icon: Icon,
  label,
  onPress,
  showBorder = true,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-4 ${
        showBorder ? "border-b border-gray-800" : ""
      }`}
    >
      <View className="flex-row items-center gap-3">
        <Icon color="#9ca3af" size={20} />
        <Text className="text-white">{label}</Text>
      </View>
      <ChevronRight color="#9ca3af" size={20} />
    </Pressable>
  );
}
