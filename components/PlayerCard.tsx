import { View, Text, Pressable, Image } from "react-native";
import { MapPin, UserPlus, Check, Link2, UserCheck, X } from "lucide-react-native";

interface PlayerCardProps {
  name: string;
  position: string;
  level: string;
  distance: string;
  photoUrl?: string;
  invited?: boolean;
  onInvite?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  mode?: "invite" | "connect" | "request";
}

export function PlayerCard({
  name,
  position,
  level,
  distance,
  photoUrl,
  invited = false,
  onInvite,
  onAccept,
  onReject,
  mode = "invite",
}: PlayerCardProps) {
  if (mode === "request") {
    return (
      <View className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
        <View className="flex-row items-center gap-4 mb-3">
          <View className="w-14 h-14 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
            {photoUrl ? (
              <Image
                source={{ uri: photoUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-xl text-white">{name.charAt(0)}</Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-white font-medium mb-1">{name}</Text>
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-sm text-gray-400">{position}</Text>
              <View className="px-2 py-0.5 bg-[#0a0a0a] rounded-full border border-gray-800">
                <Text className="text-xs text-gray-300">{level}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1">
              <MapPin color="#6b7280" size={12} />
              <Text className="text-sm text-gray-500">{distance}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2">
          <Pressable
            onPress={onAccept}
            className="flex-1 py-2.5 rounded-lg bg-green-500 flex-row items-center justify-center gap-2"
          >
            <UserCheck color="#ffffff" size={16} />
            <Text className="text-sm text-white font-medium">Aceptar</Text>
          </Pressable>
          <Pressable
            onPress={onReject}
            className="flex-1 py-2.5 rounded-lg bg-[#0a0a0a] border border-gray-700 flex-row items-center justify-center gap-2"
          >
            <X color="#ef4444" size={16} />
            <Text className="text-sm text-red-400 font-medium">Rechazar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const isConnect = mode === "connect";
  const idleLabel = isConnect ? "Conectar" : "Invitar";
  const invitedLabel = isConnect ? "Pendiente" : "Enviado";

  return (
    <View className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex-row items-center gap-4">
      <View className="w-14 h-14 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-xl text-white">{name.charAt(0)}</Text>
        )}
      </View>

      <View className="flex-1">
        <Text className="text-white font-medium mb-1">{name}</Text>
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-sm text-gray-400">{position}</Text>
          <View className="px-2 py-0.5 bg-[#0a0a0a] rounded-full border border-gray-800">
            <Text className="text-xs text-gray-300">{level}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <MapPin color="#6b7280" size={12} />
          <Text className="text-sm text-gray-500">{distance}</Text>
        </View>
      </View>

      <Pressable
        onPress={invited ? undefined : onInvite}
        className={`px-4 py-2 rounded-lg flex-row items-center gap-2 ${
          invited ? "bg-green-500/20 border border-green-500/30" : "bg-white"
        }`}
      >
        {invited ? (
          <>
            <Check color="#22c55e" size={16} />
            <Text className="text-sm text-green-400 font-medium">
              {invitedLabel}
            </Text>
          </>
        ) : (
          <>
            {isConnect ? (
              <Link2 color="#000000" size={16} />
            ) : (
              <UserPlus color="#000000" size={16} />
            )}
            <Text className="text-sm text-black font-medium">
              {idleLabel}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
