import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { Send, Star, Bug, Lightbulb } from "lucide-react-native";
import { Header } from "@/components/Header";

const categories = [
  { id: "feature", label: "Nueva función", icon: Lightbulb, color: "#eab308" },
  { id: "bug", label: "Reportar error", icon: Bug, color: "#ef4444" },
  { id: "improvement", label: "Mejora", icon: Star, color: "#3b82f6" },
];

export default function SuggestionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert("Categoría requerida", "Seleccioná una categoría para tu sugerencia.");
      return;
    }
    if (!title.trim()) {
      Alert.alert("Título requerido", "Escribí un título para tu sugerencia.");
      return;
    }

    Alert.alert(
      "¡Gracias!",
      "Tu sugerencia fue enviada. La vamos a revisar lo antes posible.",
      [{ text: "OK", onPress: () => { setTitle(""); setDescription(""); setSelectedCategory(null); } }]
    );
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Sugerencias" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6 pb-6"
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text className="text-white font-medium mb-3">Categoría</Text>
          <View className="flex-row gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = selectedCategory === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`flex-1 py-3 rounded-xl items-center gap-2 border ${
                    active
                      ? "bg-white/10 border-white/20"
                      : "bg-[#1a1a1a] border-gray-800"
                  }`}
                >
                  <Icon color={active ? "#ffffff" : cat.color} size={20} />
                  <Text
                    className={`text-xs font-medium ${
                      active ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text className="text-white font-medium mb-3">Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Resumí tu idea en una frase"
            placeholderTextColor="#6b7280"
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white"
          />
        </View>

        <View>
          <Text className="text-white font-medium mb-3">Descripción</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Contanos más detalles..."
            placeholderTextColor="#6b7280"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white min-h-[120px]"
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          className="w-full bg-white py-4 rounded-2xl flex-row items-center justify-center gap-2"
        >
          <Send color="#000000" size={18} />
          <Text className="text-black font-medium text-lg">Enviar sugerencia</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
