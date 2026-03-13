import { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, Image, Alert } from "react-native";
import { X, Check, UserPlus } from "lucide-react-native";
import { useNotifications } from "@/contexts/NotificationContext";
import { friends as mockFriends } from "@/mocks/players";

interface InviteFriendModalProps {
  visible: boolean;
  onClose: () => void;
  matchTitle: string;
  matchDate: string;
  matchTime: string;
}

export function InviteFriendModal({
  visible,
  onClose,
  matchTitle,
  matchDate,
  matchTime,
}: InviteFriendModalProps) {
  const { addNotification } = useNotifications();
  const [invitedIds, setInvitedIds] = useState<Set<number>>(new Set());

  const handleInvite = (friendId: number, friendName: string) => {
    setInvitedIds((prev) => new Set(prev).add(friendId));
    addNotification({
      type: "match_invite",
      title: "Invitación a partido enviada",
      message: `Invitaste a ${friendName} al partido en ${matchTitle} (${matchDate} ${matchTime})`,
      read: true,
      data: { playerId: friendId },
    });
    Alert.alert(
      "Invitación enviada",
      `Le avisamos a ${friendName} sobre este partido.`
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View className="bg-[#111111] rounded-t-3xl max-h-[70%] border-t border-gray-800">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
            <View>
              <Text className="text-white text-lg font-medium">
                Invitar amigo
              </Text>
              <Text className="text-gray-500 text-xs">
                {matchTitle} • {matchDate} {matchTime}
              </Text>
            </View>
            <Pressable onPress={onClose} className="p-1">
              <X color="#9ca3af" size={22} />
            </Pressable>
          </View>

          <ScrollView contentContainerClassName="px-4 py-4 gap-2 pb-8">
            {mockFriends.length === 0 ? (
              <Text className="text-gray-500 text-sm text-center py-6">
                No tenés amigos para invitar
              </Text>
            ) : (
              mockFriends.map((friend) => {
                const invited = invitedIds.has(friend.id);
                return (
                  <Pressable
                    key={friend.id}
                    onPress={() => !invited && handleInvite(friend.id, friend.name)}
                    className={`flex-row items-center justify-between p-3 rounded-xl border ${
                      invited
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-[#1a1a1a] border-gray-800"
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center overflow-hidden">
                        {friend.photoUrl ? (
                          <Image
                            source={{ uri: friend.photoUrl }}
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                        ) : (
                          <Text className="text-white">
                            {friend.name.charAt(0)}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text className="text-white text-sm font-medium">
                          {friend.name}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {friend.position} • {friend.level}
                        </Text>
                      </View>
                    </View>
                    {invited ? (
                      <View className="flex-row items-center gap-1">
                        <Check color="#4ade80" size={16} />
                        <Text className="text-green-400 text-xs">Enviado</Text>
                      </View>
                    ) : (
                      <View className="px-3 py-1.5 bg-white rounded-lg flex-row items-center gap-1">
                        <UserPlus color="#000" size={14} />
                        <Text className="text-black text-xs font-medium">Invitar</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
