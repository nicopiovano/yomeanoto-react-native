import { useState } from "react";
import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import {
  Edit,
  MapPin,
  Activity,
  Trophy,
  Clock,
  Camera,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Header } from "@/components/Header";
import { StarRating } from "@/components/StarRating";

const stats = [
  { icon: Trophy, label: "Partidos", value: "47" },
  { icon: Clock, label: "Horas", value: "94" },
];

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const rating = 4.2;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Necesitamos acceso a tu galería para cambiar la foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Perfil" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6 pb-6"
      >
        <View className="items-center">
          <Pressable onPress={pickImage} className="relative mb-4">
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center">
                <Text className="text-4xl text-white">M</Text>
              </View>
            )}
            <View className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full items-center justify-center border-2 border-black">
              <Camera color="#000000" size={14} />
            </View>
          </Pressable>

          <Text className="text-white text-xl font-medium mb-1">
            Martín López
          </Text>
          <View className="flex-row items-center gap-2 mb-2">
            <MapPin color="#9ca3af" size={16} />
            <Text className="text-sm text-gray-400">
              Buenos Aires, Argentina
            </Text>
          </View>

          <View className="my-2">
            <StarRating rating={rating} size={20} />
          </View>

          <Pressable className="mt-3 px-6 py-2 bg-white rounded-lg flex-row items-center gap-2">
            <Edit color="#000000" size={16} />
            <Text className="text-black font-medium">Editar perfil</Text>
          </Pressable>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
            <Text className="text-gray-400 text-sm mb-1">
              Posición favorita
            </Text>
            <Text className="text-white">Delantero</Text>
          </View>
          <View className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
            <Text className="text-gray-400 text-sm mb-1">Nivel</Text>
            <View className="flex-row items-center gap-1">
              <Activity color="#4ade80" size={16} />
              <Text className="text-white">Avanzado</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-white text-lg font-medium mb-4">
            Estadísticas
          </Text>
          <View className="flex-row gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <View
                  key={index}
                  className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 items-center"
                >
                  <Icon color="#9ca3af" size={24} />
                  <Text className="text-2xl text-white my-1">{stat.value}</Text>
                  <Text className="text-xs text-gray-400">{stat.label}</Text>
                </View>
              );
            })}
            <View className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 items-center">
              <StarRating rating={rating} maxStars={1} size={24} showValue={false} />
              <Text className="text-2xl text-white my-1">{rating.toFixed(1)}</Text>
              <Text className="text-xs text-gray-400">Calificación</Text>
            </View>
          </View>
        </View>

        <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
          <Text className="text-white text-lg font-medium mb-3">Sobre mí</Text>
          <Text className="text-gray-400 text-sm leading-6">
            Jugador apasionado con 10 años de experiencia. Me especializo en
            posiciones ofensivas y disfruto del juego en equipo. Disponible para
            partidos amateur los fines de semana.
          </Text>
        </View>

        <View>
          <Text className="text-white text-lg font-medium mb-4">Logros</Text>
          <View className="gap-3">
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-yellow-500/10 rounded-full items-center justify-center">
                <Trophy color="#eab308" size={24} />
              </View>
              <View>
                <Text className="text-white font-medium">Jugador del mes</Text>
                <Text className="text-sm text-gray-400">Febrero 2026</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
