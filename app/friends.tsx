import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Header } from "@/components/Header";
import { PlayerCard } from "@/components/PlayerCard";
import { useNotifications } from "@/contexts/NotificationContext";
import { friends as mockFriends, nearbyPlayers } from "@/mocks/players";
import { getFriends, getFriendSuggestions, removeFriend } from "@/services/friendService";
import { PlayerDetailModal } from "@/components/PlayerDetailModal";
import type { Player } from "@/mocks/players";

export default function FriendsScreen() {
  const [friends, setFriends] = useState(mockFriends);
  const [suggestions, setSuggestions] = useState(nearbyPlayers);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const { addNotification } = useNotifications();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    getFriends().then(setFriends).catch(() => {});
    getFriendSuggestions().then(setSuggestions).catch(() => {});
  }, []);

  const handleRemoveFriend = async (playerId: number) => {
    const name = friends.find((f) => f.id === playerId)?.name ?? "";
    setFriends((prev) => prev.filter((f) => f.id !== playerId));
    await removeFriend(playerId);
    addNotification({
      type: "system",
      title: "Amigo eliminado",
      message: `Eliminaste a ${name} de tus amigos`,
      read: true,
    });
  };

  const handleSendRequest = (playerId: number, name: string) => {
    setPendingIds((prev) => new Set(prev).add(playerId));
    addNotification({
      type: "player_invite",
      title: "Solicitud de amistad enviada",
      message: `Enviaste una solicitud de amistad a ${name}. Te notificamos cuando acepte.`,
      read: true,
      data: { playerId },
    });
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Amigos" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-6 pb-10"
      >
        <View>
          <Text className="text-white text-lg font-medium mb-2">
            Tus amigos
          </Text>
          {friends.length === 0 ? (
            <Text className="text-gray-500 text-sm">
              Todavía no agregaste amigos desde tus partidos.
            </Text>
          ) : (
            <View className="gap-3">
              {friends.map((friend) => (
                <PlayerCard
                  key={friend.id}
                  {...friend}
                  mode="details"
                  onPress={() => setSelectedPlayer(friend)}
                />
              ))}
            </View>
          )}
        </View>

        <View>
          <Text className="text-white text-lg font-medium mb-2">
            Jugadores que quizá conozcas
          </Text>
          <Text className="text-gray-500 text-xs mb-3">
            Basado en jugadores cercanos. En el futuro se conectará con tu
            historial de partidos.
          </Text>
          <View className="gap-3">
            {suggestions.map((player) => {
              const isAlreadyFriend = friends.some((f) => f.id === player.id);
              if (isAlreadyFriend) return null;
              return (
                <PlayerCard
                  key={player.id}
                  {...player}
                  invited={pendingIds.has(player.id)}
                  mode="connect"
                  onInvite={() => handleSendRequest(player.id, player.name)}
                  onPress={() => setSelectedPlayer(player)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <PlayerDetailModal
        player={selectedPlayer}
        visible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onRemoveFriend={handleRemoveFriend}
      />
    </View>
  );
}
