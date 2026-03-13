import { useState, useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SlidersHorizontal, X } from "lucide-react-native";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { upcomingMatches, nearbyMatches } from "@/mocks/matches";
import { useMatchEnrollment } from "@/contexts/MatchEnrollmentContext";

const allMatches = [...upcomingMatches, ...nearbyMatches];

const types = ["Todos", "Fútbol 5", "Fútbol 7", "Fútbol 8", "Fútbol 11"];
const genders = ["Todos", "Mixto", "Varones", "Mujeres"];
const intensities = ["Todos", "Baja", "Media", "Alta"];

type FilterKey = "type" | "gender" | "intensity";

interface Filters {
  type: string;
  gender: string;
  intensity: string;
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 ${
        active
          ? "bg-white"
          : "bg-[#1a1a1a] border border-gray-800"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          active ? "text-black" : "text-gray-400"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function ExploreMatchesScreen() {
  const [filters, setFilters] = useState<Filters>({
    type: "Todos",
    gender: "Todos",
    intensity: "Todos",
  });
  const [showFilters, setShowFilters] = useState(false);
  const { getStatus, isCreator, pendingRequestCount } = useMatchEnrollment();

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "Todos"
  ).length;

  const filteredMatches = useMemo(() => {
    return allMatches.filter((match) => {
      if (filters.type !== "Todos" && match.type !== filters.type) return false;
      if (filters.gender !== "Todos" && match.gender !== filters.gender)
        return false;
      if (filters.intensity !== "Todos" && match.intensity !== filters.intensity)
        return false;
      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({ type: "Todos", gender: "Todos", intensity: "Todos" });
  };

  return (
    <View className="flex-1 bg-black">
      <Header
        title="Explorar partidos"
        showBack
        rightAction={
          <Pressable
            onPress={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg relative"
          >
            <SlidersHorizontal color="#ffffff" size={22} />
            {activeFilterCount > 0 && (
              <View className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white rounded-full items-center justify-center">
                <Text className="text-[10px] text-black font-bold">
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </Pressable>
        }
      />

      {showFilters && (
        <View className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-4 gap-4">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-400 text-sm">Filtros</Text>
            {activeFilterCount > 0 && (
              <Pressable
                onPress={clearFilters}
                className="flex-row items-center gap-1"
              >
                <X color="#9ca3af" size={14} />
                <Text className="text-gray-400 text-sm">Limpiar</Text>
              </Pressable>
            )}
          </View>

          <View>
            <Text className="text-gray-500 text-xs mb-2">TIPO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {types.map((t) => (
                <FilterChip
                  key={t}
                  label={t}
                  active={filters.type === t}
                  onPress={() => setFilter("type", t)}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            <Text className="text-gray-500 text-xs mb-2">GÉNERO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {genders.map((g) => (
                <FilterChip
                  key={g}
                  label={g}
                  active={filters.gender === g}
                  onPress={() => setFilter("gender", g)}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            <Text className="text-gray-500 text-xs mb-2">INTENSIDAD</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {intensities.map((i) => (
                <FilterChip
                  key={i}
                  label={i}
                  active={filters.intensity === i}
                  onPress={() => setFilter("intensity", i)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        <Text className="text-gray-500 text-sm mb-1">
          {filteredMatches.length} partido{filteredMatches.length !== 1 && "s"}{" "}
          disponible{filteredMatches.length !== 1 && "s"}
        </Text>

        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
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
            <Text className="text-gray-500 text-center">
              No hay partidos con estos filtros.{"\n"}Probá cambiando los
              criterios de búsqueda.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
