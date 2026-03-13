import { View, Text, Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, showBack = false, rightAction }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-[#0a0a0a] border-b border-gray-800 px-4 pb-4"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          {showBack && (
            <Pressable onPress={() => router.back()} className="p-2 rounded-lg">
              <ArrowLeft color="#ffffff" size={24} />
            </Pressable>
          )}
          <Text className="text-white text-2xl font-medium">{title}</Text>
        </View>
        {rightAction}
      </View>
    </View>
  );
}
