import { View, Text } from "react-native";
import { CheckCircle, Clock, XCircle, Crown } from "lucide-react-native";
import type { EnrollmentStatus } from "@/contexts/MatchEnrollmentContext";

interface MatchStatusBadgeProps {
  status: EnrollmentStatus;
  isCreator?: boolean;
}

const config = {
  confirmed: {
    icon: CheckCircle,
    label: "Confirmado",
    color: "#22c55e",
    bg: "bg-green-500/15",
    border: "border-green-500/30",
    text: "text-green-400",
  },
  pending: {
    icon: Clock,
    label: "Esperando confirmación",
    color: "#eab308",
    bg: "bg-yellow-500/15",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
  },
  rejected: {
    icon: XCircle,
    label: "No aceptado",
    color: "#ef4444",
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    text: "text-red-400",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelado",
    color: "#ef4444",
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    text: "text-red-400",
  },
  none: null,
};

export function MatchStatusBadge({ status, isCreator }: MatchStatusBadgeProps) {
  if (isCreator) {
    return (
      <View className="flex-row items-center gap-1.5 bg-blue-500/15 border border-blue-500/30 rounded-full px-3 py-1">
        <Crown color="#3b82f6" size={12} />
        <Text className="text-blue-400 text-xs font-medium">Organizador</Text>
      </View>
    );
  }

  const cfg = config[status];
  if (!cfg) return null;

  const Icon = cfg.icon;
  return (
    <View
      className={`flex-row items-center gap-1.5 ${cfg.bg} border ${cfg.border} rounded-full px-3 py-1`}
    >
      <Icon color={cfg.color} size={12} />
      <Text className={`${cfg.text} text-xs font-medium`}>{cfg.label}</Text>
    </View>
  );
}
