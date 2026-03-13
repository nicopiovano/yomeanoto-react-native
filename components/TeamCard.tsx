import { View, Text, Pressable } from "react-native";
import { Users, Activity, Check } from "lucide-react-native";

interface TeamCardProps {
  name: string;
  level: string;
  players: number;
  joined?: boolean;
  onPress?: () => void;
}

export function TeamCard({
  name,
  level,
  players,
  joined = false,
  onPress,
}: TeamCardProps) {
  return (
    <View className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
          <Text className="text-lg text-white">{name.charAt(0)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-medium mb-1">{name}</Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1">
              <Activity color="#9ca3af" size={12} />
              <Text className="text-xs text-gray-400">{level}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Users color="#9ca3af" size={12} />
              <Text className="text-xs text-gray-400">
                {players} jugadores
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable
        onPress={joined ? undefined : onPress}
        className={`w-full py-2 rounded-lg items-center flex-row justify-center gap-2 ${
          joined
            ? "bg-green-500/20 border border-green-500/30"
            : "bg-white"
        }`}
      >
        {joined ? (
          <>
            <Check color="#22c55e" size={16} />
            <Text className="text-sm text-green-400 font-medium">
              Solicitado
            </Text>
          </>
        ) : (
          <Text className="text-sm text-black font-medium">
            Solicitar unirse
          </Text>
        )}
      </Pressable>
    </View>
  );
}
