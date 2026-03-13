import { View, Text, ScrollView } from "react-native";
import { Sparkles, Megaphone, Zap, Gift } from "lucide-react-native";
import { Header } from "@/components/Header";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "feature" | "announcement" | "update" | "promo";
}

const iconMap = {
  feature: Sparkles,
  announcement: Megaphone,
  update: Zap,
  promo: Gift,
};

const colorMap = {
  feature: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "#a855f7" },
  announcement: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "#3b82f6" },
  update: { bg: "bg-green-500/10", border: "border-green-500/20", icon: "#4ade80" },
  promo: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: "#eab308" },
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Nuevo sistema de calificaciones",
    description: "Ahora podés calificar a los jugadores después de cada partido. Tu calificación se mostrará en tu perfil.",
    date: "13 Mar 2026",
    type: "feature",
  },
  {
    id: 2,
    title: "Torneos oficiales de la app",
    description: "Estamos lanzando torneos organizados por la plataforma. Inscribí a tu equipo desde la pestaña Comunidad.",
    date: "10 Mar 2026",
    type: "announcement",
  },
  {
    id: 3,
    title: "Mejoras en el mapa",
    description: "Actualizamos la vista de mapa con filtros por tipo de partido, distancia y horario.",
    date: "7 Mar 2026",
    type: "update",
  },
  {
    id: 4,
    title: "Invitá amigos y ganá premios",
    description: "Por cada amigo que invites y juegue su primer partido, ambos reciben un descuento en la próxima reserva.",
    date: "3 Mar 2026",
    type: "promo",
  },
  {
    id: 5,
    title: "Chat grupal de partido",
    description: "Ahora cada partido tiene un chat grupal donde podés coordinar con los otros jugadores antes del encuentro.",
    date: "28 Feb 2026",
    type: "feature",
  },
];

export default function NewsScreen() {
  return (
    <View className="flex-1 bg-black">
      <Header title="Novedades" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        {newsItems.map((item) => {
          const Icon = iconMap[item.type];
          const colors = colorMap[item.type];
          return (
            <View
              key={item.id}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
            >
              <View className="flex-row items-start gap-3">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${colors.bg} border ${colors.border}`}
                >
                  <Icon color={colors.icon} size={18} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium mb-1">
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-sm leading-5 mb-2">
                    {item.description}
                  </Text>
                  <Text className="text-gray-600 text-xs">{item.date}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
