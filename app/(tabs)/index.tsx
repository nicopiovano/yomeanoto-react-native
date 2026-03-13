import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Bell, Plus, Search } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusDropdown } from "@/components/StatusDropdown";
import { MatchCard } from "@/components/MatchCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BannerAd } from "@/components/BannerAd";
import { NotificationPanel } from "@/components/NotificationPanel";
import { useNotifications } from "@/contexts/NotificationContext";
import { useMatchEnrollment } from "@/contexts/MatchEnrollmentContext";
import { upcomingMatches, nearbyMatches } from "@/mocks/matches";

const CARD_GAP = 12;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { unreadCount } = useNotifications();
  const { getStatus, isCreator, pendingRequestCount } = useMatchEnrollment();
  const [showNotifications, setShowNotifications] = useState(false);

  const cardWidth = width - 64;

  return (
    <View className="flex-1 bg-black">
      <View
        className="bg-[#0a0a0a] border-b border-gray-800 px-4 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
              <Text className="text-lg text-white">M</Text>
            </View>
            <View>
              <Text className="text-white font-medium">Hola Martín</Text>
              <StatusDropdown />
            </View>
          </View>
          <Pressable
            onPress={() => setShowNotifications(true)}
            className="relative p-2 rounded-lg"
          >
            <Bell color="#ffffff" size={24} />
            {unreadCount > 0 && (
              <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full items-center justify-center px-1">
                <Text className="text-white text-[10px] font-bold">
                  {unreadCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="py-6 gap-6 pb-6"
      >
        <View className="px-4 flex-row gap-3">
          <Pressable
            onPress={() => router.push("/create-match")}
            className="flex-1 bg-white p-4 rounded-2xl items-center gap-2"
          >
            <View className="w-12 h-12 bg-black rounded-full items-center justify-center">
              <Plus color="#ffffff" size={24} />
            </View>
            <Text className="text-black font-medium">Crear partido</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/explore-matches")}
            className="flex-1 bg-[#1a1a1a] p-4 rounded-2xl items-center gap-2 border border-gray-800"
          >
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
              <Search color="#000000" size={24} />
            </View>
            <Text className="text-white font-medium">Explorar partidos</Text>
          </Pressable>
        </View>

        <View className="px-4">
          <BannerAd
            title="¡Nuevo!"
            description="Ahora puedes organizar torneos con tus amigos"
          />
        </View>

        <View>
          <View className="px-4">
            <SectionHeader
              title="Próximos partidos"
              actionLabel="Ver todos"
              onAction={() => router.push("/my-matches")}
            />
          </View>
          <FlatList
            data={upcomingMatches}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + CARD_GAP}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 16, gap: CARD_GAP }}
            renderItem={({ item }) => (
              <View style={{ width: cardWidth }}>
                <MatchCard
                  {...item}
                  enrollmentStatus={getStatus(item.id)}
                  isCreator={isCreator(item.id)}
                  pendingRequests={pendingRequestCount(item.id)}
                />
              </View>
            )}
          />
          {upcomingMatches.length > 1 && (
            <View className="flex-row justify-center gap-1.5 mt-3">
              {upcomingMatches.map((_, i) => (
                <View
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-700"
                />
              ))}
            </View>
          )}
        </View>

        <View className="px-4">
          <SectionHeader
            title="Partidos cerca"
            actionLabel="Ver mapa"
            onAction={() => router.navigate("/map" as any)}
          />
          <View className="gap-3">
            {nearbyMatches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </View>
        </View>
      </ScrollView>

      <NotificationPanel
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </View>
  );
}
