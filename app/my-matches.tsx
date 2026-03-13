import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { upcomingMatches, nearbyMatches } from "@/mocks/matches";
import { useMatchEnrollment } from "@/contexts/MatchEnrollmentContext";

const tabs = ["Próximos", "Finalizados"];

export default function MyMatchesScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { getStatus, isCreator, pendingRequestCount } = useMatchEnrollment();

  return (
    <View className="flex-1 bg-black">
      <Header title="Mis partidos" showBack />

      <View className="flex-row px-4 py-3 gap-2">
        {tabs.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(index)}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === index ? "bg-white" : "bg-[#1a1a1a] border border-gray-800"
            }`}
          >
            <Text
              className={`font-medium ${
                activeTab === index ? "text-black" : "text-gray-400"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        {activeTab === 0 ? (
          upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <MatchCard
                key={match.id}
                {...match}
                enrollmentStatus={getStatus(match.id)}
                isCreator={isCreator(match.id)}
                pendingRequests={pendingRequestCount(match.id)}
              />
            ))
          ) : (
            <View className="items-center py-12">
              <Text className="text-gray-500">No tenés partidos próximos</Text>
            </View>
          )
        ) : (
          nearbyMatches.slice(0, 2).map((match) => (
            <View key={match.id} className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white font-medium">{match.title}</Text>
                <View className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  <Text className="text-green-400 text-xs">Finalizado</Text>
                </View>
              </View>
              <Text className="text-gray-400 text-sm">{match.date} • {match.time}</Text>
              <Text className="text-gray-500 text-sm mt-1">{match.location}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
