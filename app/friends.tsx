import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, Linking } from "react-native";
import { Header } from "@/components/Header";
import { PlayerCard } from "@/components/PlayerCard";
import { useNotifications } from "@/contexts/NotificationContext";
import { friends as mockFriends, nearbyPlayers } from "@/mocks/players";
import { getFriends, getFriendSuggestions, addFriend, removeFriend } from "@/services/friendService";

export default function FriendsScreen() {
  const [friends, setFriends] = useState(mockFriends);
  const [suggestions, setSuggestions] = useState(nearbyPlayers);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Preparado para backend: si USE_MOCKS = false, getFriends/getFriendSuggestions
    getFriends().then(setFriends).catch(() => {});
    getFriendSuggestions().then(setSuggestions).catch(() => {});
  }, []);

  const handleChatWhatsApp = (name: string) => {
    const phone = "5491100000000"; // placeholder; vendrá del backend
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hola ${name}! Te escribo desde FAP para organizar un partido ⚽`
    )}`;
    Linking.openURL(url);
  };

  const handleRemoveFriend = (playerId: number, name: string) => {
    Alert.alert(
      "Eliminar amigo",
      `¿Querés eliminar a ${name} de tus amigos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setFriends((prev) => prev.filter((f) => f.id !== playerId));
            await removeFriend(playerId);
            addNotification({
              type: "system",
              title: "Amigo eliminado",
              message: `Eliminaste a ${name} de tus amigos`,
              read: true,
            });
          },
        },
      ]
    );
  };

  const handleAddFriend = async (playerId: number, name: string) => {
    if (friends.some((f) => f.id === playerId)) return;
    const player = suggestions.find((p) => p.id === playerId);
    if (!player) return;

    setFriends((prev) => [...prev, player]);
    await addFriend(playerId);
    addNotification({
      type: "player_invite",
      title: "Nuevo amigo",
      message: `Ahora sos amigo de ${name}`,
      read: true,
      data: { playerId },
    });
  };

  const handleInviteToMatch = (playerId: number, name: string) => {
    addNotification({
      type: "match_invite",
      title: "Invitación enviada",
      message: `Invitaste a ${name} a un partido desde tus amigos`,
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
                <View key={friend.id} className="gap-2">
                  <PlayerCard
                    {...friend}
                    invited={false}
                    onInvite={() => handleInviteToMatch(friend.id, friend.name)}
                    mode="invite"
                  />
                  <View className="flex-row gap-2 mb-1">
                    <Pressable
                      onPress={() => handleChatWhatsApp(friend.name)}
                      className="flex-1 py-2 rounded-xl bg-green-500/20 border border-green-500/30 items-center"
                    >
                      <Text className="text-green-400 text-sm font-medium">
                        Chatear por WhatsApp
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleRemoveFriend(friend.id, friend.name)}
                      className="flex-1 py-2 rounded-xl bg-red-500/10 border border-red-500/30 items-center"
                    >
                      <Text className="text-red-400 text-sm font-medium">
                        Eliminar vínculo
                      </Text>
                    </Pressable>
                  </View>
                </View>
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
            {suggestions.map((player) => (
              <View key={player.id} className="gap-2">
                <PlayerCard
                  {...player}
                  invited={friends.some((f) => f.id === player.id)}
                  onInvite={() => handleAddFriend(player.id, player.name)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

