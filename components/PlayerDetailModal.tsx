import { View, Text, Pressable, Modal, ScrollView, Image, Alert, Linking } from "react-native";
import {
  X,
  MapPin,
  Users,
  Shield,
  ListPlus,
  Check,
  MessageCircle,
  UserPlus,
  UserMinus,
  Minus,
} from "lucide-react-native";
import { usePlayerLists } from "@/contexts/PlayerListsContext";
import { useNotifications } from "@/contexts/NotificationContext";
import type { Player } from "@/mocks/players";
import { friends as mockFriends } from "@/mocks/players";

interface PlayerDetailModalProps {
  player: Player | null;
  visible: boolean;
  onClose: () => void;
  onRemoveFriend?: (playerId: number) => void;
}

export function PlayerDetailModal({
  player,
  visible,
  onClose,
  onRemoveFriend,
}: PlayerDetailModalProps) {
  const { lists, teams, addPlayerToList, removePlayerFromList, addPlayerToTeam, removePlayerFromTeam, isPlayerInList, isPlayerInTeam } =
    usePlayerLists();
  const { addNotification } = useNotifications();

  if (!player) return null;

  const isFriend = mockFriends.some((f) => f.id === player.id);

  const handleChatWhatsApp = () => {
    const phone = "5491100000000";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hola ${player.name}! Te escribo desde FAP para organizar un partido ⚽`
    )}`;
    Linking.openURL(url);
  };

  const handleSendFriendRequest = () => {
    addNotification({
      type: "player_invite",
      title: "Solicitud de amistad enviada",
      message: `Enviaste una solicitud de amistad a ${player.name}`,
      read: true,
      data: { playerId: player.id },
    });
    Alert.alert(
      "Solicitud enviada",
      `Le enviamos a ${player.name} tu solicitud de amistad. Te notificamos cuando acepte.`
    );
  };

  const handleRemoveFriend = () => {
    Alert.alert(
      "Eliminar amigo",
      `¿Querés eliminar a ${player.name} de tus amigos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            onRemoveFriend?.(player.id);
            onClose();
          },
        },
      ]
    );
  };

  const handleToggleList = (listId: number, listName: string) => {
    if (isPlayerInList(listId, player.id)) {
      removePlayerFromList(listId, player.id);
      return;
    }
    addPlayerToList(listId, player);
    Alert.alert("Agregado", `${player.name} fue agregado a "${listName}".`);
  };

  const handleToggleTeam = (teamId: number, teamName: string, role: string) => {
    if (isPlayerInTeam(teamId, player.id)) {
      if (role !== "Capitán") {
        Alert.alert("Sin permisos", "Solo el creador del equipo puede quitar jugadores.");
        return;
      }
      removePlayerFromTeam(teamId, player.id);
      return;
    }
    addPlayerToTeam(teamId, player);
    Alert.alert("Agregado", `${player.name} fue agregado a "${teamName}".`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View className="bg-[#111111] rounded-t-3xl max-h-[85%] border-t border-gray-800">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
            <Text className="text-white text-lg font-medium">
              Detalle del jugador
            </Text>
            <Pressable onPress={onClose} className="p-1">
              <X color="#9ca3af" size={22} />
            </Pressable>
          </View>

          <ScrollView contentContainerClassName="px-4 py-5 gap-5 pb-10">
            <View className="items-center gap-3">
              <View className="w-20 h-20 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
                {player.photoUrl ? (
                  <Image
                    source={{ uri: player.photoUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-3xl text-white">
                    {player.name.charAt(0)}
                  </Text>
                )}
              </View>
              <Text className="text-white text-xl font-medium">
                {player.name}
              </Text>
              <View className="flex-row items-center gap-3">
                <View className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800">
                  <Text className="text-gray-300 text-sm">
                    {player.position}
                  </Text>
                </View>
                <View className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800">
                  <Text className="text-gray-300 text-sm">{player.level}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <MapPin color="#6b7280" size={14} />
                <Text className="text-gray-500 text-sm">{player.distance}</Text>
              </View>

              {isFriend ? (
                <View className="flex-row gap-2 mt-3 w-full">
                  <Pressable
                    onPress={handleChatWhatsApp}
                    className="flex-1 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 flex-row items-center justify-center gap-2"
                  >
                    <MessageCircle color="#4ade80" size={18} />
                    <Text className="text-green-400 text-sm font-medium">
                      WhatsApp
                    </Text>
                  </Pressable>
                  {onRemoveFriend && (
                    <Pressable
                      onPress={handleRemoveFriend}
                      className="py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/30 flex-row items-center justify-center gap-2"
                    >
                      <UserMinus color="#ef4444" size={16} />
                    </Pressable>
                  )}
                </View>
              ) : (
                <View className="w-full mt-3">
                  <Pressable
                    onPress={handleSendFriendRequest}
                    className="w-full py-2.5 rounded-xl bg-white flex-row items-center justify-center gap-2"
                  >
                    <UserPlus color="#000000" size={18} />
                    <Text className="text-black text-sm font-medium">
                      Agregar amigo
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>

            {isFriend ? (
              <>
                <View className="gap-2">
                  <View className="flex-row items-center gap-2 mb-1">
                    <ListPlus color="#3b82f6" size={18} />
                    <Text className="text-white font-medium">
                      Agregar a Mis Listas
                    </Text>
                  </View>
                  {lists.length === 0 ? (
                    <Text className="text-gray-500 text-sm pl-6">
                      No tenés listas creadas
                    </Text>
                  ) : (
                    lists.map((list) => {
                      const alreadyIn = isPlayerInList(list.id, player.id);
                      return (
                        <Pressable
                          key={list.id}
                          onPress={() => handleToggleList(list.id, list.name)}
                          className={`flex-row items-center justify-between p-3 rounded-xl border ${
                            alreadyIn
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-[#1a1a1a] border-gray-800"
                          }`}
                        >
                          <View className="flex-row items-center gap-3">
                            <Users color={alreadyIn ? "#4ade80" : "#9ca3af"} size={16} />
                            <View>
                              <Text className="text-white text-sm">{list.name}</Text>
                              <Text className="text-gray-500 text-xs">
                                {list.players.length} jugadores
                              </Text>
                            </View>
                          </View>
                          {alreadyIn ? (
                            <View className="flex-row items-center gap-1">
                              <Minus color="#ef4444" size={16} />
                              <Text className="text-red-400 text-xs">Quitar</Text>
                            </View>
                          ) : (
                            <UserPlus color="#9ca3af" size={16} />
                          )}
                        </Pressable>
                      );
                    })
                  )}
                </View>

                <View className="gap-2">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Shield color="#8b5cf6" size={18} />
                    <Text className="text-white font-medium">
                      Agregar a Mis Equipos
                    </Text>
                  </View>
                  {teams.length === 0 ? (
                    <Text className="text-gray-500 text-sm pl-6">
                      No tenés equipos
                    </Text>
                  ) : (
                    teams.map((team) => {
                      const alreadyIn = isPlayerInTeam(team.id, player.id);
                      const isCreator = team.role === "Capitán";
                      return (
                        <Pressable
                          key={team.id}
                          onPress={() => handleToggleTeam(team.id, team.name, team.role)}
                          className={`flex-row items-center justify-between p-3 rounded-xl border ${
                            alreadyIn
                              ? "bg-purple-500/10 border-purple-500/30"
                              : "bg-[#1a1a1a] border-gray-800"
                          }`}
                        >
                          <View className="flex-row items-center gap-3">
                            <Shield color={alreadyIn ? "#8b5cf6" : "#9ca3af"} size={16} />
                            <View>
                              <Text className="text-white text-sm">{team.name}</Text>
                              <Text className="text-gray-500 text-xs">
                                {team.members.length} miembros • {team.role}
                              </Text>
                            </View>
                          </View>
                          {alreadyIn ? (
                            isCreator ? (
                              <View className="flex-row items-center gap-1">
                                <Minus color="#ef4444" size={16} />
                                <Text className="text-red-400 text-xs">Quitar</Text>
                              </View>
                            ) : (
                              <Check color="#8b5cf6" size={18} />
                            )
                          ) : (
                            <UserPlus color="#9ca3af" size={16} />
                          )}
                        </Pressable>
                      );
                    })
                  )}
                </View>
              </>
            ) : (
              <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
                <Text className="text-gray-400 text-sm text-center">
                  Para agregar a un equipo o lista, debe ser tu amigo.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
