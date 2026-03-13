import { View, Text, ScrollView, Pressable } from "react-native";
import { Users, Shield, Calendar, ChevronRight } from "lucide-react-native";
import { Header } from "@/components/Header";

interface MyTeam {
  id: number;
  name: string;
  role: string;
  members: number;
  nextMatch: string | null;
  wins: number;
  losses: number;
}

const myTeams: MyTeam[] = [
  {
    id: 1,
    name: "Los Leones FC",
    role: "Capitán",
    members: 12,
    nextMatch: "Sábado 22 Mar • 18:00",
    wins: 8,
    losses: 3,
  },
  {
    id: 2,
    name: "Equipo del Trabajo",
    role: "Jugador",
    members: 10,
    nextMatch: "Domingo 23 Mar • 16:00",
    wins: 5,
    losses: 5,
  },
  {
    id: 3,
    name: "FC Barrio Norte",
    role: "Jugador",
    members: 15,
    nextMatch: null,
    wins: 12,
    losses: 2,
  },
];

export default function MyTeamsScreen() {
  return (
    <View className="flex-1 bg-black">
      <Header title="Mis equipos" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        {myTeams.map((team) => (
          <Pressable
            key={team.id}
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
                <Text className="text-sm text-gray-400">{team.members} miembros</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-green-400">{team.wins}V</Text>
                <Text className="text-sm text-gray-600"> / </Text>
                <Text className="text-sm text-red-400">{team.losses}D</Text>
              </View>
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
        ))}
      </ScrollView>
    </View>
  );
}
