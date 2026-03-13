import { View, Text, ScrollView, Pressable } from "react-native";
import {
  User,
  History,
  Trophy,
  List,
  Users,
  UserPlus,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Settings,
  LogOut,
  ChevronRight,
  Info,
} from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ListRow } from "@/components/ListRow";

const menuItems = [
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: History, label: "Historial de partidos", path: "/match-history" },
  { icon: Trophy, label: "Torneos cercanos", path: "/community" },
  { icon: UserPlus, label: "Amigos", path: "/friends" },
  { icon: List, label: "Mis listas", path: "/my-lists" },
  { icon: Users, label: "Mis equipos", path: "/my-teams" },
  { icon: Sparkles, label: "Novedades", path: "/news" },
  { icon: Info, label: "Cómo funciona", path: "/how-it-works" },
  { icon: HelpCircle, label: "Ayuda", path: "/help" },
  { icon: Lightbulb, label: "Sugerencias", path: "/suggestions" },
  { icon: Settings, label: "Configuración", path: "/settings" },
] as const;

export default function MoreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      <View
        className="bg-[#0a0a0a] border-b border-gray-800 px-4 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Text className="text-white text-2xl font-medium">Más</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 pb-6"
      >
        <Pressable
          onPress={() => router.push("/profile")}
          className="bg-[#1a1a1a] rounded-2xl p-4 mb-6 border border-gray-800 flex-row items-center gap-4"
        >
          <View className="w-16 h-16 rounded-full bg-gray-700 items-center justify-center">
            <Text className="text-2xl text-white">M</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white font-medium mb-1">Martín López</Text>
            <Text className="text-sm text-gray-400">
              Delantero • Nivel Avanzado
            </Text>
          </View>
          <ChevronRight color="#9ca3af" size={20} />
        </Pressable>

        <View className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden">
          {menuItems.map((item, index) => (
            <ListRow
              key={item.path}
              icon={item.icon}
              label={item.label}
              onPress={() => router.push(item.path as any)}
              showBorder={index !== menuItems.length - 1}
            />
          ))}
        </View>

        <Pressable className="w-full mt-6 bg-red-500/10 border border-red-500/20 py-4 rounded-2xl flex-row items-center justify-center gap-2">
          <LogOut color="#ef4444" size={20} />
          <Text className="text-red-500 font-medium">Cerrar sesión</Text>
        </Pressable>

        <Text className="text-center text-gray-600 text-sm mt-6">
          Versión 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
