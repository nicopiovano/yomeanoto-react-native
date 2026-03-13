import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import {
  X,
  Calendar,
  Clock,
  RefreshCw,
  UserPlus,
  Users,
  Info,
  CheckCheck,
  Ban,
} from "lucide-react-native";
import { router } from "expo-router";
import { useNotifications } from "@/contexts/NotificationContext";
import type { NotificationType } from "@/mocks/notifications";

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
}

const iconMap: Record<NotificationType, any> = {
  match_invite: Calendar,
  match_reminder: Clock,
  match_update: RefreshCw,
  match_cancelled: Ban,
  player_invite: UserPlus,
  team_request: Users,
  enrollment_request: UserPlus,
  enrollment_accepted: CheckCheck,
  enrollment_rejected: X,
  system: Info,
};

const colorMap: Record<NotificationType, string> = {
  match_invite: "#3b82f6",
  match_reminder: "#f59e0b",
  match_update: "#8b5cf6",
  match_cancelled: "#ef4444",
  player_invite: "#22c55e",
  team_request: "#06b6d4",
  enrollment_request: "#f59e0b",
  enrollment_accepted: "#22c55e",
  enrollment_rejected: "#ef4444",
  system: "#6b7280",
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

export function NotificationPanel({ visible, onClose }: NotificationPanelProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const handlePressNotification = (id: string, type: NotificationType, data?: any) => {
    markAsRead(id);

    // Navegación según tipo
    if (data?.matchId) {
      // Cualquier notificación con matchId lleva al detalle del partido
      router.push(`/match-detail?id=${data.matchId}`);
      onClose();
      return;
    }

    if (type === "team_request") {
      router.push("/community");
      onClose();
      return;
    }

    // player_invite sin matchId: en el futuro podría ir a pantalla de amigos
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60">
        <Pressable className="h-20" onPress={onClose} />

        <View className="flex-1 bg-[#0a0a0a] rounded-t-3xl border-t border-gray-800">
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 bg-gray-700 rounded-full" />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-xl font-medium">
                Notificaciones
              </Text>
              {unreadCount > 0 && (
                <View className="px-2 py-0.5 bg-red-500 rounded-full">
                  <Text className="text-white text-xs font-medium">
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row items-center gap-3">
              {unreadCount > 0 && (
                <Pressable
                  onPress={markAllAsRead}
                  className="flex-row items-center gap-1"
                >
                  <CheckCheck color="#9ca3af" size={16} />
                  <Text className="text-gray-400 text-xs">Leer todas</Text>
                </Pressable>
              )}
              <Pressable onPress={onClose} className="p-1">
                <X color="#9ca3af" size={22} />
              </Pressable>
            </View>
          </View>

          <ScrollView className="flex-1" contentContainerClassName="px-4 pb-8">
            {notifications.length === 0 ? (
              <View className="items-center py-12">
                <Text className="text-gray-500">
                  No tenés notificaciones
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {notifications.map((notification, index) => {
                  const Icon = iconMap[notification.type] || Info;
                  const accent = colorMap[notification.type] || "#6b7280";

                  return (
                    <Pressable
                      key={`${notification.id}-${index}`}
                      onPress={() =>
                        handlePressNotification(
                          notification.id,
                          notification.type,
                          notification.data
                        )
                      }
                      className={`flex-row gap-3 p-3 rounded-xl ${
                        notification.read
                          ? "bg-[#1a1a1a]"
                          : "bg-[#1a1a2e] border border-blue-900/30"
                      }`}
                    >
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${accent}20` }}
                      >
                        <Icon color={accent} size={20} />
                      </View>

                      <View className="flex-1">
                        <View className="flex-row items-center justify-between mb-0.5">
                          <Text
                            className={`text-sm font-medium ${
                              notification.read
                                ? "text-gray-300"
                                : "text-white"
                            }`}
                          >
                            {notification.title}
                          </Text>
                          {!notification.read && (
                            <View className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </View>
                        <Text className="text-gray-400 text-xs mb-1">
                          {notification.message}
                        </Text>
                        <Text className="text-gray-600 text-xs">
                          {timeAgo(notification.createdAt)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
