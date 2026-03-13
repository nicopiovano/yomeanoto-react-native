import { View, Text, ScrollView, Pressable } from "react-native";
import { Users, Shield, Calendar, ChevronRight, Trophy } from "lucide-react-native";
import { router } from "expo-router";
import { Header } from "@/components/Header";
import { usePlayerLists } from "@/contexts/PlayerListsContext";

export default function MyTeamsScreen() {
  const { teams } = usePlayerLists();

  return (
    <View className="flex-1 bg-black">
      <Header title="Mis equipos" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        {teams.map((team) => {
          const totalMatches = team.wins + team.draws + team.losses;
          return (
            <Pressable
              key={team.id}
              onPress={() => router.push(`/team-detail?id=${team.id}`)}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-blue-500/10 rounded-full items-center justify-center">
                    <Shield color="#3b82f6" size={22} />
                  </View>
                  <View>
                    <Text className="text-white font-medium text-lg">{team.name}</Text>
                    <Text className="text-sm text-gray-500">{team.role}</Text>
                  </View>
                </View>
                <ChevronRight color="#9ca3af" size={20} />
              </View>

              <View className="flex-row gap-4 mb-3">
                <View className="flex-row items-center gap-2">
                  <Users color="#9ca3af" size={14} />
                  <Text className="text-sm text-gray-400">{team.members.length} miembros</Text>
                </View>
                {totalMatches > 0 && (
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm text-green-400">{team.wins}V</Text>
                    <Text className="text-sm text-gray-600"> / </Text>
                    <Text className="text-sm text-yellow-400">{team.draws}E</Text>
                    <Text className="text-sm text-gray-600"> / </Text>
                    <Text className="text-sm text-red-400">{team.losses}D</Text>
                  </View>
                )}
              </View>

              {team.nextMatch ? (
                <View className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex-row items-center gap-2">
                  <Calendar color="#4ade80" size={14} />
                  <Text className="text-green-400 text-sm">{team.nextMatch}</Text>
                </View>
              ) : (
                <View className="bg-gray-800/50 rounded-lg p-3">
                  <Text className="text-gray-500 text-sm">Sin próximo partido</Text>
                </View>
              )}
            </Pressable>
          );
        })}

        {teams.length === 0 && (
          <View className="items-center py-12">
            <Shield color="#374151" size={40} />
            <Text className="text-gray-500 mt-4">No tenés equipos</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
