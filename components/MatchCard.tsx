import { View, Text, Pressable } from "react-native";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  User,
  Inbox,
  Ban,
} from "lucide-react-native";
import { router } from "expo-router";
import { FieldIcon } from "./FieldIcon";
import { MatchStatusBadge } from "./MatchStatusBadge";
import type { EnrollmentStatus } from "@/contexts/MatchEnrollmentContext";
import type { MatchCreator, MatchLevel } from "@/mocks/matches";

interface MatchCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  playersNeeded: number;
  positions: string[];
  type: string;
  price: string;
  gender: string;
  intensity: string;
  location?: string;
  matchLevel?: MatchLevel;
  enrollmentStatus?: EnrollmentStatus;
  isCreator?: boolean;
  pendingRequests?: number;
  createdBy?: MatchCreator;
  onPress?: () => void;
}

export function MatchCard({
  id,
  title,
  date,
  time,
  playersNeeded,
  positions,
  type,
  price,
  gender,
  intensity,
  location,
  matchLevel,
  enrollmentStatus,
  isCreator,
  pendingRequests,
  createdBy,
  onPress,
}: MatchCardProps) {
  const handlePress =
    onPress ?? (() => router.push(`/match-detail?id=${id}`));

  const isCancelled = enrollmentStatus === "cancelled";

  const showBadge =
    isCreator || (enrollmentStatus && enrollmentStatus !== "none");

  const containerClasses = [
    "rounded-2xl",
    "p-4",
    "w-full",
    "border",
    isCancelled
      ? "bg-[#1a1a1a] border-red-500/40 opacity-75"
      : isCreator
        ? "bg-[#020617] border-blue-500/40"
        : "bg-[#1a1a1a] border-gray-800",
  ].join(" ");

  return (
    <Pressable
      onPress={handlePress}
      className={containerClasses}
    >
      {showBadge && (
        <View className="flex-row mb-3">
          <MatchStatusBadge
            status={enrollmentStatus ?? "none"}
            isCreator={isCreator && !isCancelled}
          />
        </View>
      )}

      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 pr-2">
          <Text className={`text-lg font-medium ${isCancelled ? "text-gray-500 line-through" : "text-white"}`}>
            {title}
          </Text>
          {matchLevel && (
            <View className="flex-row mt-1">
              <View className={`px-2 py-0.5 rounded-full border ${
                matchLevel === "Competitivo"
                  ? "bg-orange-500/10 border-orange-500/30"
                  : "bg-cyan-500/10 border-cyan-500/30"
              }`}>
                <Text className={`text-[10px] font-medium ${
                  matchLevel === "Competitivo" ? "text-orange-400" : "text-cyan-400"
                }`}>
                  {matchLevel}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View className="bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-gray-800">
          <View className="flex-row items-center gap-1">
            <Calendar color="#d1d5db" size={12} />
            <Text className="text-xs text-gray-300">{date}</Text>
          </View>
          <Text className="text-xs text-gray-300 text-center mt-0.5">
            {time}
          </Text>
        </View>
      </View>

      {isCreator && !isCancelled && (
        <Text className="text-[11px] text-blue-400 mb-1">
          Organizás Vos
        </Text>
      )}
      {isCreator && isCancelled && (
        <Text className="text-[11px] text-red-400 mb-1">
          Cancelaste este partido
        </Text>
      )}
      {!isCreator && createdBy && (
        <Text className="text-[11px] text-gray-500 mb-1">
          Organiza {createdBy.name}
        </Text>
      )}

      {location && (
        <View className="flex-row items-center gap-1.5 mb-3">
          <MapPin color="#9ca3af" size={16} />
          <Text className="text-gray-400 text-sm">{location}</Text>
        </View>
      )}

      <View className="mb-3">
        <View className="flex-row items-center gap-2 mb-2">
          <Users color="#9ca3af" size={16} />
          <Text className="text-white">
            Faltan{" "}
            <Text className="text-green-400">{playersNeeded}</Text>{" "}
            jugadores
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {positions.map((position, index) => (
            <View
              key={index}
              className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800"
            >
              <Text className="text-gray-300 text-xs">{position}</Text>
            </View>
          ))}
        </View>
      </View>

      {isCancelled && (
        <View className="mb-3">
          <View className="self-stretch h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex-row items-center justify-center gap-2">
            <Ban color="#ef4444" size={14} />
            <Text className="text-red-400 text-xs font-medium">
              Partido cancelado
            </Text>
          </View>
        </View>
      )}

      {!isCancelled && !isCreator && (
        <View className="mb-3">
          {enrollmentStatus === "confirmed" && (
            <Pressable
              onPress={handlePress}
              className="self-stretch h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex-row items-center justify-center"
            >
              <Text className="text-red-400 text-xs font-medium">
                Cancelar confirmación
              </Text>
            </Pressable>
          )}
          {enrollmentStatus === "pending" && (
            <Pressable
              onPress={handlePress}
              className="self-stretch h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex-row items-center justify-center"
            >
              <Text className="text-red-400 text-xs font-medium">
                Cancelar solicitud
              </Text>
            </Pressable>
          )}
          {(!enrollmentStatus || enrollmentStatus === "none") && (
            <Pressable
              onPress={handlePress}
              className="self-stretch h-9 rounded-xl bg-white flex-row items-center justify-center"
            >
              <Text className="text-black text-xs font-medium">
                Postularme
              </Text>
            </Pressable>
          )}
          {enrollmentStatus === "rejected" && (
            <Pressable
              onPress={handlePress}
              className="self-stretch h-9 rounded-xl bg-white flex-row items-center justify-center"
            >
              <Text className="text-black text-xs font-medium">
                Postularme de nuevo
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {!isCancelled && isCreator && (
        <View className="mb-3">
          <Pressable
            onPress={handlePress}
            className="self-stretch h-9 rounded-xl bg-blue-500/15 border border-blue-500/40 flex-row items-center justify-center gap-2"
          >
            <Inbox color="#3b82f6" size={14} />
            <Text className="text-blue-400 text-xs font-medium">
              Ver solicitudes
              {typeof pendingRequests === "number" && pendingRequests > 0
                ? ` (${pendingRequests})`
                : ""}
            </Text>
          </Pressable>
        </View>
      )}

      <View className="flex-row justify-between items-center pt-3 border-t border-gray-800">
        <View className="gap-1 items-center">
          <Text className="text-xs text-gray-500">Tipo</Text>
          <FieldIcon type={type} />
        </View>
        <View className="gap-1 items-center">
          <Text className="text-xs text-gray-500">Precio</Text>
          <View className="flex-row items-center gap-1">
            <DollarSign color="#4ade80" size={12} />
            <Text className="text-sm text-white">{price}</Text>
          </View>
        </View>
        <View className="gap-1 items-center">
          <Text className="text-xs text-gray-500">Género</Text>
          <View className="flex-row items-center gap-1">
            <User color="#9ca3af" size={12} />
            <Text className="text-sm text-white">{gender}</Text>
          </View>
        </View>
        <View className="gap-1 items-end">
          <Text className="text-xs text-gray-500">Nivel</Text>
          <Text className="text-sm text-white">{intensity}</Text>
        </View>
      </View>
    </Pressable>
  );
}
