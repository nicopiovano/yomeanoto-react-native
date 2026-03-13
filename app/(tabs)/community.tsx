import { useState, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/SectionHeader";
import { TournamentCard } from "@/components/TournamentCard";
import { TournamentDetailModal } from "@/components/TournamentDetailModal";
import { TeamCard } from "@/components/TeamCard";
import { useNotifications } from "@/contexts/NotificationContext";
import { tournaments } from "@/mocks/tournaments";
import { teams } from "@/mocks/teams";
import type { Tournament } from "@/mocks/tournaments";

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const { addNotification } = useNotifications();
  const [joinedTeamIds, setJoinedTeamIds] = useState<Set<number>>(new Set());
  const [enrolledTournamentIds, setEnrolledTournamentIds] = useState<Set<number>>(new Set());
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const handleEnroll = useCallback(
    (tournament: Tournament) => {
      setEnrolledTournamentIds((prev) => new Set(prev).add(tournament.id));
      setSelectedTournament(null);

      addNotification({
        type: "system",
        title: "Inscripción confirmada",
        message: `Tu equipo fue inscripto en ${tournament.name}`,
        read: false,
      });

      Alert.alert("¡Inscripción enviada!", "Te vamos a notificar cuando se confirme tu lugar.");
    },
    [addNotification]
  );

  const handleTeamJoin = useCallback(
    (teamId: number, teamName: string) => {
      setJoinedTeamIds((prev) => new Set(prev).add(teamId));

      addNotification({
        type: "team_request",
        title: "Solicitud enviada",
        message: `Solicitaste unirte a ${teamName}`,
        read: true,
        data: { teamId },
      });
    },
    [addNotification]
  );

  return (
    <View className="flex-1 bg-black">
      <View
        className="bg-[#0a0a0a] border-b border-gray-800 px-4 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Text className="text-white text-2xl font-medium">Comunidad</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-8 pb-6"
      >
        <View>
          <SectionHeader title="Torneos cercanos" actionLabel="Ver todos" />
          <View className="gap-3">
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                {...tournament}
                enrolled={enrolledTournamentIds.has(tournament.id)}
                onPress={() => setSelectedTournament(tournament)}
              />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Equipos cercanos" actionLabel="Ver todos" />
          <View className="gap-3">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                {...team}
                joined={joinedTeamIds.has(team.id)}
                onPress={() => handleTeamJoin(team.id, team.name)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <TournamentDetailModal
        tournament={selectedTournament}
        visible={!!selectedTournament}
        onClose={() => setSelectedTournament(null)}
        onEnroll={handleEnroll}
      />
    </View>
  );
}
