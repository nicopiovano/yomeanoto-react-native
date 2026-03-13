import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Share,
  Linking,
  Platform,
  Alert,
} from "react-native";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Activity,
  Navigation,
  Share2,
  Inbox,
  Ban,
} from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Header } from "@/components/Header";
import { FieldIcon } from "@/components/FieldIcon";
import { MatchStatusBadge } from "@/components/MatchStatusBadge";
import { EnrollmentRequestsModal } from "@/components/EnrollmentRequestsModal";
import { useMatchEnrollment } from "@/contexts/MatchEnrollmentContext";
import { getMatchById } from "@/services/matchService";
import type { Match } from "@/mocks/matches";

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [showRequests, setShowRequests] = useState(false);
  const {
    getStatus,
    isCreator,
    isMatchCancelled,
    requestEnrollment,
    cancelEnrollment,
    cancelMatch,
    pendingRequestCount,
  } = useMatchEnrollment();

  const matchId = Number(id);

  useEffect(() => {
    if (id) {
      getMatchById(matchId).then(setMatch);
    }
  }, [id]);

  if (!match) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-gray-400">Cargando...</Text>
      </View>
    );
  }

  const enrollmentStatus = getStatus(matchId);
  const userIsCreator = isCreator(matchId);
  const matchCancelled = isMatchCancelled(matchId);
  const pendingCount = pendingRequestCount(matchId);

  const handlePostulate = () => {
    requestEnrollment(matchId);
    Alert.alert(
      "Postulación enviada",
      "El organizador va a revisar tu solicitud y te notificamos cuando decida."
    );
  };

  const handleCancelEnrollment = () => {
    const current = enrollmentStatus;
    cancelEnrollment(matchId);
    if (current === "pending") {
      Alert.alert("Solicitud cancelada", "Ya no estás postulado a este partido.");
    } else if (current === "confirmed") {
      Alert.alert("Participación cancelada", "Cancelaste tu participación en este partido.");
    }
  };

  const handleCancelMatch = () => {
    Alert.alert(
      "Cancelar partido",
      "¿Estás seguro de que querés cancelar este partido? Se notificará a todos los jugadores anotados y pendientes.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => {
            cancelMatch(matchId);
            Alert.alert(
              "Partido cancelado",
              "Se canceló el partido y se notificó a todos los jugadores involucrados.",
              [{ text: "OK", onPress: () => router.back() }]
            );
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    await Share.share({
      message: `¡Unite a mi partido!\n\n⚽ ${match.title}\n📅 ${match.date} a las ${match.time}\n📍 ${match.location}\n💰 $${match.price}\n\nFaltan ${match.playersNeeded} jugadores. ¡Bajate FAP!`,
    });
  };

  const handleOpenMap = () => {
    if (!match.lat || !match.lng) return;
    const label = encodeURIComponent(match.title);
    const url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${label}@${match.lat},${match.lng}`
        : `geo:${match.lat},${match.lng}?q=${match.lat},${match.lng}(${label})`;
    Linking.openURL(url);
  };

  const filledSpots = match.currentPlayers ?? 0;
  const totalSpots = match.maxPlayers ?? filledSpots + match.playersNeeded;
  const progressPercent = totalSpots > 0 ? (filledSpots / totalSpots) * 100 : 0;

  const renderFooterButton = () => {
    if (matchCancelled) {
      return (
        <View className="flex-1 h-14 rounded-2xl flex-row items-center justify-center gap-2 bg-red-500/10 border border-red-500/30">
          <Ban color="#ef4444" size={22} />
          <Text className="text-red-400 font-medium text-lg">
            Partido cancelado
          </Text>
        </View>
      );
    }

    if (userIsCreator) {
      return (
        <View className="flex-1 gap-2">
          <Pressable
            onPress={() => setShowRequests(true)}
            className="h-14 rounded-2xl flex-row items-center justify-center gap-2 bg-blue-500/20 border border-blue-500/30"
          >
            <Inbox color="#3b82f6" size={22} />
            <Text className="text-blue-400 font-medium text-lg">
              Solicitudes{pendingCount > 0 ? ` (${pendingCount})` : ""}
            </Text>
          </Pressable>
          <Pressable
            onPress={handleCancelMatch}
            className="h-12 rounded-2xl flex-row items-center justify-center gap-2 bg-red-500/10 border border-red-500/30"
          >
            <Ban color="#ef4444" size={18} />
            <Text className="text-red-400 font-medium">
              Cancelar partido
            </Text>
          </Pressable>
        </View>
      );
    }

    if (enrollmentStatus === "confirmed") {
      return (
        <Pressable
          onPress={handleCancelEnrollment}
          className="flex-1 h-14 rounded-2xl flex-row items-center justify-center gap-2 bg-red-500/10 border border-red-500/30"
        >
          <Text className="text-red-400 font-medium text-lg">
            Cancelar confirmación
          </Text>
        </Pressable>
      );
    }

    if (enrollmentStatus === "pending") {
      return (
        <Pressable
          onPress={handleCancelEnrollment}
          className="flex-1 h-14 rounded-2xl flex-row items-center justify-center gap-2 bg-red-500/10 border border-red-500/30"
        >
          <Text className="text-red-400 font-medium text-lg">
            Cancelar solicitud
          </Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        onPress={handlePostulate}
        className="flex-1 h-14 rounded-2xl flex-row items-center justify-center gap-2 bg-white"
      >
        <Text className="text-black font-medium text-lg">
          Postularme
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <Header title={match.title} showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-5 pb-40"
      >
        <View className="flex-row items-center gap-3 flex-wrap">
          <FieldIcon type={match.type} />
          <View className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800">
            <Text className="text-gray-300 text-sm">{match.type}</Text>
          </View>
          <View className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800">
            <Text className="text-gray-300 text-sm">{match.gender}</Text>
          </View>
          {(enrollmentStatus !== "none" || userIsCreator) && (
            <MatchStatusBadge
              status={enrollmentStatus}
              isCreator={userIsCreator && !matchCancelled}
            />
          )}
        </View>

        {matchCancelled && (
          <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
            <View className="flex-row items-center gap-3">
              <Ban color="#ef4444" size={22} />
              <View className="flex-1">
                <Text className="text-red-400 font-medium">
                  Partido cancelado
                </Text>
                <Text className="text-red-400/70 text-sm mt-1">
                  Este partido fue cancelado por el organizador. Se notificó a todos los jugadores.
                </Text>
              </View>
            </View>
          </View>
        )}

        <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 gap-3">
          <View className="flex-row items-center gap-3">
            <Calendar color="#9ca3af" size={18} />
            <Text className="text-white">{match.date}</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Clock color="#9ca3af" size={18} />
            <Text className="text-white">{match.time}</Text>
          </View>
          {match.location && (
            <View className="flex-row items-center gap-3">
              <MapPin color="#9ca3af" size={18} />
              <Text className="text-white">{match.location}</Text>
            </View>
          )}
          <View className="flex-row items-center gap-3">
            <DollarSign color="#4ade80" size={18} />
            <Text className="text-white">${match.price} por persona</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Activity color="#60a5fa" size={18} />
            <Text className="text-white">
              Intensidad {match.intensity.toLowerCase()}
            </Text>
          </View>
        </View>

        {match.description && (
          <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
            <Text className="text-gray-400 text-sm leading-6">
              {match.description}
            </Text>
          </View>
        )}

        <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Users color="#9ca3af" size={18} />
              <Text className="text-white font-medium">Jugadores</Text>
            </View>
            <Text className="text-gray-400 text-sm">
              {filledSpots}/{totalSpots}
            </Text>
          </View>

          <View className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden mb-3">
            <View
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </View>

          <Text className="text-white mb-2">
            Faltan{" "}
            <Text className="text-green-400">{match.playersNeeded}</Text>{" "}
            jugadores
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {match.positions.map((pos, i) => (
              <View
                key={i}
                className="px-3 py-1 bg-[#0a0a0a] rounded-full border border-gray-800"
              >
                <Text className="text-gray-300 text-xs">{pos}</Text>
              </View>
            ))}
          </View>
        </View>

        {userIsCreator && !matchCancelled && pendingCount > 0 && (
          <Pressable
            onPress={() => setShowRequests(true)}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-yellow-500/20 rounded-full items-center justify-center">
                <Inbox color="#eab308" size={20} />
              </View>
              <View>
                <Text className="text-white font-medium">
                  Solicitudes pendientes
                </Text>
                <Text className="text-yellow-400 text-sm">
                  {pendingCount} jugador{pendingCount !== 1 && "es"} quieren
                  unirse
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {match.createdBy && !userIsCreator && (
          <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
            <Text className="text-gray-500 text-xs mb-3">ORGANIZADO POR</Text>
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
                <Text className="text-lg text-white">
                  {match.createdBy.name.charAt(0)}
                </Text>
              </View>
              <View>
                <Text className="text-white font-medium">
                  {match.createdBy.name}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {match.createdBy.username}
                </Text>
              </View>
            </View>
          </View>
        )}

        {match.lat && match.lng && (
          <Pressable
            onPress={handleOpenMap}
            className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-500/20 rounded-full items-center justify-center">
                <Navigation color="#3b82f6" size={20} />
              </View>
              <View>
                <Text className="text-white font-medium">Ver en el mapa</Text>
                <Text className="text-gray-400 text-xs">
                  Abrir ubicación en Google Maps
                </Text>
              </View>
            </View>
            <MapPin color="#3b82f6" size={20} />
          </Pressable>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 px-4 py-4 pb-8">
        <View className="flex-row gap-3">
          {!matchCancelled && (
            <Pressable
              onPress={handleShare}
              className="w-14 h-14 bg-[#1a1a1a] border border-gray-800 rounded-2xl items-center justify-center"
            >
              <Share2 color="#ffffff" size={22} />
            </Pressable>
          )}
          {renderFooterButton()}
        </View>
      </View>

      {userIsCreator && !matchCancelled && (
        <EnrollmentRequestsModal
          matchId={matchId}
          matchTitle={match.title}
          visible={showRequests}
          onClose={() => setShowRequests(false)}
        />
      )}
    </View>
  );
}
