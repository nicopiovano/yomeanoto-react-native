import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import {
  Shield,
  Users,
  Calendar,
  Trophy,
  Minus as MinusIcon,
  X,
} from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components/Header";
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerDetailModal } from "@/components/PlayerDetailModal";
import { usePlayerLists } from "@/contexts/PlayerListsContext";
import type { Player } from "@/mocks/players";

export default function TeamDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { teams, removePlayerFromTeam } = usePlayerLists();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const team = teams.find((t) => t.id === Number(id));

  if (!team) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-gray-400">Equipo no encontrado</Text>
      </View>
    );
  }

  const totalMatches = team.wins + team.draws + team.losses;

  const handleRemovePlayer = (player: Player) => {
    Alert.alert(
      "Quitar jugador",
      `¿Querés quitar a ${player.name} de ${team.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Quitar",
          style: "destructive",
          onPress: () => removePlayerFromTeam(team.id, player.id),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-black">
      <Header title={team.name} showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-5 pb-6"
      >
        <View className="items-center gap-3">
          <View className="w-20 h-20 bg-blue-500/10 rounded-full items-center justify-center">
            <Shield color="#3b82f6" size={36} />
          </View>
          <Text className="text-white text-2xl font-medium">{team.name}</Text>
          <View className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800">
            <Text className="text-gray-300 text-sm">{team.role}</Text>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 bg-green-500/10 border border-green-500/20 rounded-xl p-3 items-center">
            <Trophy color="#4ade80" size={18} />
            <Text className="text-xl text-white mt-1">{team.wins}</Text>
            <Text className="text-xs text-green-400">Victorias</Text>
          </View>
          <View className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 items-center">
            <View className="w-3 h-3 bg-yellow-400 rounded-full" />
            <Text className="text-xl text-white mt-1">{team.draws}</Text>
            <Text className="text-xs text-yellow-400">Empates</Text>
          </View>
          <View className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-3 items-center">
            <View
              className="w-3 h-3 bg-red-400 rounded-sm"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
            <Text className="text-xl text-white mt-1">{team.losses}</Text>
            <Text className="text-xs text-red-400">Derrotas</Text>
          </View>
        </View>

        {totalMatches > 0 && (
          <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
            <Text className="text-gray-500 text-xs mb-2">
              RENDIMIENTO EN TORNEOS
            </Text>
            <Text className="text-white text-sm">
              {totalMatches} partidos jugados
            </Text>
            <View className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden mt-2 flex-row">
              {team.wins > 0 && (
                <View
                  className="h-full bg-green-500"
                  style={{ width: `${(team.wins / totalMatches) * 100}%` }}
                />
              )}
              {team.draws > 0 && (
                <View
                  className="h-full bg-yellow-500"
                  style={{ width: `${(team.draws / totalMatches) * 100}%` }}
                />
              )}
              {team.losses > 0 && (
                <View
                  className="h-full bg-red-500"
                  style={{ width: `${(team.losses / totalMatches) * 100}%` }}
                />
              )}
            </View>
          </View>
        )}

        {team.nextMatch && (
          <View className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex-row items-center gap-3">
            <Calendar color="#4ade80" size={18} />
            <View>
              <Text className="text-white font-medium">Próximo partido</Text>
              <Text className="text-green-400 text-sm">{team.nextMatch}</Text>
            </View>
          </View>
        )}

        <View>
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Users color="#9ca3af" size={18} />
              <Text className="text-white font-medium">
                Jugadores ({team.members.length})
              </Text>
            </View>
          </View>

          <View className="gap-2">
            {team.members.map((player) => (
              <View key={player.id} className="relative">
                <PlayerCard
                  {...player}
                  mode="details"
                  onPress={() => setSelectedPlayer(player)}
                />
                {team.role === "Capitán" && (
                  <Pressable
                    onPress={() => handleRemovePlayer(player)}
                    className="absolute top-3 right-3 w-7 h-7 bg-red-500/20 rounded-full items-center justify-center"
                  >
                    <X color="#ef4444" size={14} />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <PlayerDetailModal
        player={selectedPlayer}
        visible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </View>
  );
}
