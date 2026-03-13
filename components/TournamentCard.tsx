import { View, Text, Pressable } from "react-native";
import { MapPin, Calendar, Users, Check } from "lucide-react-native";

interface TournamentCardProps {
  name: string;
  location: string;
  date: string;
  teams: number;
  enrolled?: boolean;
  onPress?: () => void;
}

export function TournamentCard({
  name,
  location,
  date,
  teams,
  enrolled = false,
  onPress,
}: TournamentCardProps) {
  return (
    <View className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
      <Text className="text-white text-lg font-medium mb-3">{name}</Text>

      <View className="gap-2 mb-3">
        <View className="flex-row items-center gap-2">
          <MapPin color="#9ca3af" size={16} />
          <Text className="text-sm text-gray-400">{location}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Calendar color="#9ca3af" size={16} />
          <Text className="text-sm text-gray-400">{date}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Users color="#9ca3af" size={16} />
          <Text className="text-sm text-gray-400">{teams} equipos</Text>
        </View>
      </View>

      <Pressable
        onPress={enrolled ? undefined : onPress}
        className={`w-full py-2 rounded-lg items-center flex-row justify-center gap-2 ${
          enrolled
            ? "bg-green-500/20 border border-green-500/30"
            : "bg-white"
        }`}
      >
        {enrolled ? (
          <>
            <Check color="#22c55e" size={16} />
            <Text className="text-sm text-green-400 font-medium">
              Inscripto
            </Text>
          </>
        ) : (
          <Text className="text-sm text-black font-medium">Ver detalles</Text>
        )}
      </Pressable>
    </View>
  );
}
