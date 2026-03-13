import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, TextInput, Modal, Image } from "react-native";
import { Plus, Users, Trash2, ChevronDown, ChevronUp, X, Check, UserPlus } from "lucide-react-native";
import { Header } from "@/components/Header";
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerDetailModal } from "@/components/PlayerDetailModal";
import { usePlayerLists } from "@/contexts/PlayerListsContext";
import { friends as mockFriends } from "@/mocks/players";
import type { Player } from "@/mocks/players";

export default function MyListsScreen() {
  const { lists, createList, deleteList, addPlayerToList, removePlayerFromList, isPlayerInList } = usePlayerLists();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [addToListId, setAddToListId] = useState<number | null>(null);

  const handleDeleteList = (id: number) => {
    Alert.alert("Eliminar lista", "¿Seguro que querés eliminar esta lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteList(id),
      },
    ]);
  };

  const handleConfirmCreateList = () => {
    const name = newListName.trim();
    if (!name) {
      Alert.alert("Nombre vacío", "Poné un nombre para la lista.");
      return;
    }
    createList(name);
    setNewListName("");
    setIsCreating(false);
  };

  const handleRemovePlayer = (listId: number, player: Player) => {
    Alert.alert(
      "Quitar jugador",
      `¿Querés quitar a ${player.name} de esta lista?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Quitar",
          style: "destructive",
          onPress: () => removePlayerFromList(listId, player.id),
        },
      ]
    );
  };

  const handleAddFriendToList = (friend: Player) => {
    if (addToListId === null) return;
    if (isPlayerInList(addToListId, friend.id)) {
      Alert.alert("Ya agregado", `${friend.name} ya está en esta lista.`);
      return;
    }
    addPlayerToList(addToListId, friend);
  };

  return (
    <View className="flex-1 bg-black">
      <Header
        title="Mis listas"
        showBack
        rightAction={
          <Pressable onPress={() => setIsCreating(true)} className="p-1">
            <Plus color="#ffffff" size={22} />
          </Pressable>
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        {isCreating && (
          <View className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-4">
            <Text className="text-white font-medium mb-2">Nueva lista</Text>
            <TextInput
              value={newListName}
              onChangeText={setNewListName}
              placeholder="Nombre de la lista (ej. Equipo del trabajo)"
              placeholderTextColor="#6b7280"
              className="text-white text-sm border border-gray-700 rounded-xl px-3 py-2 bg-[#020617]"
            />
            <View className="flex-row gap-2 mt-3">
              <Pressable
                onPress={() => { setNewListName(""); setIsCreating(false); }}
                className="flex-1 py-2.5 rounded-xl bg-[#0a0a0a] border border-gray-700 items-center"
              >
                <Text className="text-gray-300 text-sm font-medium">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmCreateList}
                className="flex-1 py-2.5 rounded-xl bg-white items-center"
              >
                <Text className="text-black text-sm font-medium">Crear</Text>
              </Pressable>
            </View>
          </View>
        )}
        {lists.map((list) => (
          <View
            key={list.id}
            className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden"
          >
            <Pressable
              onPress={() => setExpandedId(expandedId === list.id ? null : list.id)}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 bg-blue-500/10 rounded-full items-center justify-center">
                  <Users color="#3b82f6" size={18} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">{list.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {list.players.length} jugadores
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => handleDeleteList(list.id)} className="p-2">
                  <Trash2 color="#ef4444" size={18} />
                </Pressable>
                {expandedId === list.id ? (
                  <ChevronUp color="#9ca3af" size={18} />
                ) : (
                  <ChevronDown color="#9ca3af" size={18} />
                )}
              </View>
            </Pressable>

            {expandedId === list.id && (
              <View className="border-t border-gray-800 px-3 py-3 gap-2">
                {list.players.length > 0 ? (
                  list.players.map((player) => (
                    <View key={player.id} className="relative">
                      <PlayerCard
                        {...player}
                        mode="details"
                        onPress={() => setSelectedPlayer(player)}
                      />
                      <Pressable
                        onPress={() => handleRemovePlayer(list.id, player)}
                        className="absolute top-3 right-3 w-7 h-7 bg-red-500/20 rounded-full items-center justify-center"
                      >
                        <X color="#ef4444" size={14} />
                      </Pressable>
                    </View>
                  ))
                ) : (
                  <View className="items-center py-3">
                    <Text className="text-gray-500 text-sm text-center">
                      No hay jugadores en esta lista
                    </Text>
                  </View>
                )}
                <Pressable
                  onPress={() => setAddToListId(list.id)}
                  className="mt-1 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex-row items-center justify-center gap-2"
                >
                  <UserPlus color="#3b82f6" size={16} />
                  <Text className="text-blue-400 text-sm font-medium">
                    Agregar amigos
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}

        {lists.length === 0 && (
          <View className="items-center py-12">
            <Users color="#374151" size={40} />
            <Text className="text-gray-500 mt-4">No tenés listas creadas</Text>
            <Pressable
              onPress={() => setIsCreating(true)}
              className="mt-4 bg-white px-6 py-2 rounded-lg"
            >
              <Text className="text-black font-medium">Crear lista</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <PlayerDetailModal
        player={selectedPlayer}
        visible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      <Modal
        visible={addToListId !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setAddToListId(null)}
      >
        <View className="flex-1 bg-black/80 justify-end">
          <View className="bg-[#111111] rounded-t-3xl max-h-[70%] border-t border-gray-800">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
              <Text className="text-white text-lg font-medium">
                Agregar amigos a la lista
              </Text>
              <Pressable onPress={() => setAddToListId(null)} className="p-1">
                <X color="#9ca3af" size={22} />
              </Pressable>
            </View>
            <ScrollView contentContainerClassName="px-4 py-4 gap-2 pb-8">
              {mockFriends.length === 0 ? (
                <Text className="text-gray-500 text-sm text-center py-6">
                  No tenés amigos todavía
                </Text>
              ) : (
                mockFriends.map((friend) => {
                  const alreadyIn = addToListId !== null && isPlayerInList(addToListId, friend.id);
                  return (
                    <Pressable
                      key={friend.id}
                      onPress={() => !alreadyIn && handleAddFriendToList(friend)}
                      className={`flex-row items-center justify-between p-3 rounded-xl border ${
                        alreadyIn
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-[#1a1a1a] border-gray-800"
                      }`}
                    >
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
                          {friend.photoUrl ? (
                            <Image
                              source={{ uri: friend.photoUrl }}
                              className="w-full h-full"
                              resizeMode="cover"
                            />
                          ) : (
                            <Text className="text-white">{friend.name.charAt(0)}</Text>
                          )}
                        </View>
                        <View>
                          <Text className="text-white text-sm font-medium">{friend.name}</Text>
                          <Text className="text-gray-500 text-xs">
                            {friend.position} • {friend.level}
                          </Text>
                        </View>
                      </View>
                      {alreadyIn ? (
                        <View className="flex-row items-center gap-1">
                          <Check color="#4ade80" size={16} />
                          <Text className="text-green-400 text-xs">En lista</Text>
                        </View>
                      ) : (
                        <View className="px-3 py-1.5 bg-white rounded-lg">
                          <Text className="text-black text-xs font-medium">Agregar</Text>
                        </View>
                      )}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
