import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import {
  X,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Trophy,
  Zap,
} from "lucide-react-native";
import type { Tournament } from "@/mocks/tournaments";

interface TournamentDetailModalProps {
  tournament: Tournament | null;
  visible: boolean;
  onClose: () => void;
  onEnroll: (tournament: Tournament) => void;
}

export function TournamentDetailModal({
  tournament,
  visible,
  onClose,
  onEnroll,
}: TournamentDetailModalProps) {
  if (!tournament) return null;

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

            <Pressable
              onPress={() => onEnroll(tournament)}
              className="w-full bg-white py-4 rounded-2xl items-center mt-2"
            >
              <Text className="text-black font-medium text-lg">
                Inscribir mi equipo
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
