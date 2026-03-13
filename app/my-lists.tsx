import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { Plus, Users, Trash2, User } from "lucide-react-native";
import { Header } from "@/components/Header";

interface PlayerList {
  id: number;
  name: string;
  players: string[];
}

const initialLists: PlayerList[] = [
  { id: 1, name: "Amigos de futsal", players: ["Tomás Herrera", "Lucas García", "Sofía Méndez", "Valentina López", "Matías Rodríguez"] },
  { id: 2, name: "Compañeros de trabajo", players: ["Diego Fernández", "Ana Martínez", "Pablo Torres"] },
  { id: 3, name: "Equipo del barrio", players: ["Nicolás Pérez", "Santiago Ruiz", "Julieta Gómez", "Carlos Molina"] },
];

export default function MyListsScreen() {
  const [lists, setLists] = useState<PlayerList[]>(initialLists);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleDeleteList = (id: number) => {
    Alert.alert("Eliminar lista", "¿Seguro que querés eliminar esta lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => setLists((prev) => prev.filter((l) => l.id !== id)),
      },
    ]);
  };

  const handleCreateList = () => {
    Alert.prompt
      ? Alert.prompt("Nueva lista", "Nombre de la lista:", (name) => {
          if (name?.trim()) {
            setLists((prev) => [
              ...prev,
              { id: Date.now(), name: name.trim(), players: [] },
            ]);
          }
        })
      : Alert.alert("Nueva lista", "Funcionalidad disponible próximamente en Android.");
  };

  return (
    <View className="flex-1 bg-black">
      <Header
        title="Mis listas"
        showBack
        rightAction={
          <Pressable onPress={handleCreateList} className="p-1">
            <Plus color="#ffffff" size={22} />
          </Pressable>
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
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
                <View>
                  <Text className="text-white font-medium">{list.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {list.players.length} jugadores
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => handleDeleteList(list.id)} className="p-2">
                <Trash2 color="#ef4444" size={18} />
              </Pressable>
            </Pressable>

            {expandedId === list.id && (
              <View className="border-t border-gray-800 px-4 py-3 gap-2">
                {list.players.length > 0 ? (
                  list.players.map((player, i) => (
                    <View key={i} className="flex-row items-center gap-3 py-1">
                      <User color="#9ca3af" size={14} />
                      <Text className="text-gray-300 text-sm">{player}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-500 text-sm py-2">
                    No hay jugadores en esta lista
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}

        {lists.length === 0 && (
          <View className="items-center py-12">
            <Users color="#374151" size={40} />
            <Text className="text-gray-500 mt-4">No tenés listas creadas</Text>
            <Pressable
              onPress={handleCreateList}
              className="mt-4 bg-white px-6 py-2 rounded-lg"
            >
              <Text className="text-black font-medium">Crear lista</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
