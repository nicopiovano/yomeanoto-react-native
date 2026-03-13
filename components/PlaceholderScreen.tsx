import { View, Text } from "react-native";
import { Header } from "./Header";

interface PlaceholderScreenProps {
  title: string;
}

export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <View className="flex-1 bg-black">
      <Header title={title} showBack />

      <View className="flex-1 px-4 py-12 items-center">
        <View className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 items-center w-full">
          <View className="w-16 h-16 bg-gray-800 rounded-full items-center justify-center mb-4">
            <Text className="text-2xl">🚧</Text>
          </View>
          <Text className="text-white text-xl font-medium mb-2">
            Próximamente
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Esta sección está en desarrollo y estará disponible pronto.
          </Text>
        </View>
      </View>
    </View>
  );
}
