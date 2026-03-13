import { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, Alert } from "react-native";
import {
  X,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Trophy,
  Zap,
  Shield,
  Check,
} from "lucide-react-native";
import { router } from "expo-router";
import { usePlayerLists } from "@/contexts/PlayerListsContext";
import type { Tournament } from "@/mocks/tournaments";

interface TournamentDetailModalProps {
  tournament: Tournament | null;
  visible: boolean;
  onClose: () => void;
  onEnroll: (tournament: Tournament, teamId: number) => void;
}

export function TournamentDetailModal({
  tournament,
  visible,
  onClose,
  onEnroll,
}: TournamentDetailModalProps) {
  const { teams } = usePlayerLists();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  if (!tournament) return null;

  const hasTeams = teams.length > 0;

  const handleEnroll = () => {
    if (!selectedTeamId) {
      Alert.alert("Seleccioná un equipo", "Elegí con qué equipo querés inscribirte.");
      return;
    }
    onEnroll(tournament, selectedTeamId);
    setSelectedTeamId(null);
  };

  const handleCreateTeam = () => {
    onClose();
    router.push("/my-teams");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-[#0a0a0a] rounded-t-3xl border-t border-gray-800 max-h-[85%]">
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 bg-gray-700 rounded-full" />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <Text className="text-white text-xl font-medium flex-1 pr-4">
              {tournament.name}
            </Text>
            <Pressable onPress={onClose} className="p-1">
              <X color="#9ca3af" size={22} />
            </Pressable>
          </View>

          <ScrollView contentContainerClassName="px-4 pb-8 gap-4">
            <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 gap-3">
              <View className="flex-row items-center gap-3">
                <MapPin color="#9ca3af" size={18} />
                <Text className="text-white">{tournament.location}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Calendar color="#9ca3af" size={18} />
                <Text className="text-white">{tournament.date}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Users color="#9ca3af" size={18} />
                <Text className="text-white">{tournament.teams} equipos</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Zap color="#9ca3af" size={18} />
                <Text className="text-white">{tournament.format}</Text>
              </View>
            </View>

            <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
              <Text className="text-gray-400 text-sm leading-6">
                {tournament.description}
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 items-center">
                <DollarSign color="#4ade80" size={20} />
                <Text className="text-white font-medium mt-1">
                  ${tournament.entryFee}
                </Text>
                <Text className="text-xs text-gray-400 mt-0.5">
                  Inscripción
                </Text>
              </View>
              <View className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 items-center">
                <Trophy color="#eab308" size={20} />
                <Text className="text-white font-medium mt-1 text-center">
                  {tournament.prize}
                </Text>
                <Text className="text-xs text-gray-400 mt-0.5">Premio</Text>
              </View>
            </View>

            {hasTeams ? (
              <View className="gap-3">
                <Text className="text-white font-medium">
                  Elegí tu equipo para inscribir
                </Text>
                {teams.map((team) => {
                  const isSelected = selectedTeamId === team.id;
                  return (
                    <Pressable
                      key={team.id}
                      onPress={() => setSelectedTeamId(team.id)}
                      className={`flex-row items-center justify-between p-4 rounded-xl border ${
                        isSelected
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-[#1a1a1a] border-gray-800"
                      }`}
                    >
                      <View className="flex-row items-center gap-3">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${
                          isSelected ? "bg-blue-500/20" : "bg-gray-700"
                        }`}>
                          <Shield
                            color={isSelected ? "#3b82f6" : "#9ca3af"}
                            size={18}
                          />
                        </View>
                        <View>
                          <Text className="text-white font-medium">
                            {team.name}
                          </Text>
                          <Text className="text-gray-500 text-xs">
                            {team.members.length} miembros • {team.role}
                          </Text>
                        </View>
                      </View>
                      {isSelected && <Check color="#3b82f6" size={20} />}
                    </Pressable>
                  );
                })}

                <Pressable
                  onPress={handleEnroll}
                  className={`w-full py-4 rounded-2xl items-center mt-2 ${
                    selectedTeamId ? "bg-white" : "bg-gray-700"
                  }`}
                  disabled={!selectedTeamId}
                >
                  <Text
                    className={`font-medium text-lg ${
                      selectedTeamId ? "text-black" : "text-gray-500"
                    }`}
                  >
                    Inscribir mi equipo
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 items-center gap-3">
                <Shield color="#eab308" size={32} />
                <Text className="text-white font-medium text-center">
                  Necesitás un equipo para participar
                </Text>
                <Text className="text-gray-400 text-sm text-center">
                  Formá un equipo con tus amigos y volvé a inscribirte.
                </Text>
                <Pressable
                  onPress={handleCreateTeam}
                  className="bg-white py-3 px-6 rounded-xl mt-1"
                >
                  <Text className="text-black font-medium">
                    Formar equipo
                  </Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
