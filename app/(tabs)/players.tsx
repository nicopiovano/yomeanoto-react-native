import { View, Text, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { Search } from "lucide-react-native";
import { useState, useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlayerCard } from "@/components/PlayerCard";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  nearbyPlayers,
  friends as initialFriends,
  playerRequests as initialRequests,
} from "@/mocks/players";
import type { Player } from "@/mocks/players";

const tabs = ["Cercanos", "Amigos", "Solicitudes"];

export default function PlayersScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [invitedIds, setInvitedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState<Player[]>(initialFriends);
  const [requestsList, setRequestsList] = useState<Player[]>(initialRequests);
  const insets = useSafeAreaInsets();
  const { addNotification } = useNotifications();

  const getPlayers = (): Player[] => {
    switch (activeTab) {
      case 0:
        return nearbyPlayers;
      case 1:
        return friendsList;
      case 2:
        return requestsList;
      default:
        return nearbyPlayers;
    }
  };

  const filteredPlayers = useMemo(() => {
    const players = getPlayers();
    if (!searchQuery.trim()) return players;
    const query = searchQuery.toLowerCase();
    return players.filter((p) => p.name.toLowerCase().includes(query));
  }, [activeTab, searchQuery, friendsList, requestsList]);

  const handleInvite = useCallback(
    (playerId: number, playerName: string) => {
      setInvitedIds((prev) => new Set(prev).add(playerId));

      if (activeTab === 1) {
        addNotification({
          type: "match_invite",
          title: "Invitación enviada",
          message: `Invitaste a ${playerName} a un partido`,
          read: true,
          data: { playerId },
        });
      } else {
        addNotification({
          type: "player_invite",
          title: "Solicitud de conexión enviada",
          message: `Enviaste una solicitud de conexión a ${playerName}`,
          read: true,
          data: { playerId },
        });
      }
    },
    [addNotification, activeTab]
  );

  const handleAcceptRequest = useCallback(
    (player: Player) => {
      setRequestsList((prev) => prev.filter((p) => p.id !== player.id));
      setFriendsList((prev) => [...prev, player]);
      addNotification({
        type: "player_invite",
        title: "Solicitud aceptada",
        message: `${player.name} ahora es tu amigo`,
        read: true,
        data: { playerId: player.id },
      });
      Alert.alert("Amigo agregado", `${player.name} ahora es tu amigo.`);
    },
    [addNotification]
  );

  const handleRejectRequest = useCallback(
    (player: Player) => {
      setRequestsList((prev) => prev.filter((p) => p.id !== player.id));
      addNotification({
        type: "player_invite",
        title: "Solicitud rechazada",
        message: `Rechazaste la solicitud de ${player.name}`,
        read: true,
        data: { playerId: player.id },
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
        <Text className="text-white text-2xl font-medium mb-3">Jugadores</Text>

        <View className="flex-row items-center bg-[#1a1a1a] border border-gray-800 rounded-xl px-3 h-10">
          <Search color="#6b7280" size={18} />
          <TextInput
            className="flex-1 ml-2 text-white text-sm"
            placeholder="Buscar por nombre..."
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
      </View>

      <View className="flex-row gap-2 px-4 pt-4 pb-2 bg-black">
        {tabs.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => {
              setActiveTab(index);
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === index
                ? "bg-white"
                : "bg-[#1a1a1a] border border-gray-800"
            }`}
          >
            <View className="flex-row items-center">
              <Text
                className={`text-sm ${
                  activeTab === index
                    ? "text-black font-medium"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </Text>
              {index === 2 && requestsList.length > 0 && (
                <View className="ml-2 px-2 py-0.5 bg-red-500 rounded-full">
                  <Text className="text-white text-xs">
                    {requestsList.length}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pt-4 gap-3 pb-6"
      >
        {filteredPlayers.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500 text-sm">
              {searchQuery.trim()
                ? "No se encontraron jugadores"
                : "No hay jugadores en esta sección"}
            </Text>
          </View>
        )}
        {filteredPlayers.map((player) =>
          activeTab === 2 ? (
            <PlayerCard
              key={player.id}
              {...player}
              mode="request"
              onAccept={() => handleAcceptRequest(player)}
              onReject={() => handleRejectRequest(player)}
            />
          ) : (
            <PlayerCard
              key={player.id}
              {...player}
              invited={invitedIds.has(player.id)}
              mode={activeTab === 1 ? "invite" : "connect"}
              onInvite={() => handleInvite(player.id, player.name)}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}
