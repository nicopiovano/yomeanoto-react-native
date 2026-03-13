import { View, Text, ScrollView } from "react-native";
import { Calendar, MapPin, Trophy, Swords } from "lucide-react-native";
import { Header } from "@/components/Header";
import { matchHistory } from "@/mocks/matches";

const getResultColor = (type: string) => {
  switch (type) {
    case "win":
      return {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-400",
      };
    case "loss":
      return {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400",
      };
    case "draw":
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-400",
      };
    default:
      return {
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        text: "text-gray-400",
      };
  }
};

export default function MatchHistoryScreen() {
  const tournamentMatches = matchHistory.filter((m) => m.isTournament);
  const wins = tournamentMatches.filter((m) => m.resultType === "win").length;
  const draws = tournamentMatches.filter((m) => m.resultType === "draw").length;
  const losses = tournamentMatches.filter((m) => m.resultType === "loss").length;

  return (
    <View className="flex-1 bg-black">
      <Header title="Historial de partidos" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 pb-6"
      >
        <Text className="text-gray-500 text-xs mb-2 uppercase">
          Estadísticas de torneos
        </Text>
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-green-500/10 border border-green-500/20 rounded-xl p-4 items-center">
            <Trophy color="#4ade80" size={20} />
            <Text className="text-2xl text-white my-1">{wins}</Text>
            <Text className="text-xs text-green-400">Victorias</Text>
          </View>
          <View className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 items-center">
            <View className="w-3 h-3 bg-yellow-400 rounded-full my-0.5" />
            <Text className="text-2xl text-white my-1">{draws}</Text>
            <Text className="text-xs text-yellow-400">Empates</Text>
          </View>
          <View className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-4 items-center">
            <View
              className="w-3 h-3 bg-red-400 rounded-sm my-0.5"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
            <Text className="text-2xl text-white my-1">{losses}</Text>
            <Text className="text-xs text-red-400">Derrotas</Text>
          </View>
        </View>

        <Text className="text-gray-500 text-xs mb-3 uppercase">
          Todos los partidos
        </Text>
        <View className="gap-3">
          {matchHistory.map((match) => {
            const colors = getResultColor(match.resultType);
            return (
              <View
                key={match.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center gap-2">
                    <Calendar color="#9ca3af" size={16} />
                    <Text className="text-sm text-gray-400">{match.date}</Text>
                    {match.isTournament ? (
                      <View className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
                        <Text className="text-[10px] text-purple-400">Torneo</Text>
                      </View>
                    ) : (
                      <View className="px-2 py-0.5 bg-gray-500/10 border border-gray-700 rounded-full">
                        <Text className="text-[10px] text-gray-400">Amistoso</Text>
                      </View>
                    )}
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full border ${colors.bg} ${colors.border}`}
                  >
                    <Text className={`text-xs ${colors.text}`}>
                      {match.result}
                    </Text>
                  </View>
                </View>

                <Text className="text-white font-medium mb-2">
                  {match.field}
                </Text>

                <View className="flex-row items-center gap-2 mb-3">
                  <MapPin color="#9ca3af" size={16} />
                  <Text className="text-sm text-gray-400">
                    Jugaste como {match.position}
                  </Text>
                </View>

                <View className="flex-row gap-4 pt-3 border-t border-gray-800">
                  <View>
                    <Text className="text-xs text-gray-500 mb-1">Goles</Text>
                    <Text className="text-lg text-white">{match.goals}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500 mb-1">
                      Asistencias
                    </Text>
                    <Text className="text-lg text-white">{match.assists}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
