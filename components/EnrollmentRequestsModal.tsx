import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { X, Check, XCircle, User, Clock } from "lucide-react-native";
import { useMatchEnrollment } from "@/contexts/MatchEnrollmentContext";
import type { EnrollmentRequest } from "@/contexts/MatchEnrollmentContext";

interface EnrollmentRequestsModalProps {
  matchId: number;
  matchTitle: string;
  visible: boolean;
  onClose: () => void;
}

const statusConfig = {
  pending: { label: "Pendiente", color: "#eab308", bg: "bg-yellow-500/15", border: "border-yellow-500/30" },
  accepted: { label: "Aceptado", color: "#22c55e", bg: "bg-green-500/15", border: "border-green-500/30" },
  rejected: { label: "Rechazado", color: "#ef4444", bg: "bg-red-500/15", border: "border-red-500/30" },
};

export function EnrollmentRequestsModal({
  matchId,
  matchTitle,
  visible,
  onClose,
}: EnrollmentRequestsModalProps) {
  const { getRequestsForMatch, acceptRequest, rejectRequest } =
    useMatchEnrollment();

  const requests = getRequestsForMatch(matchId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-[#0a0a0a] rounded-t-3xl border-t border-gray-800 max-h-[80%]">
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 bg-gray-700 rounded-full" />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-4">
              <Text className="text-white text-lg font-medium">
                Solicitudes
              </Text>
              <Text className="text-gray-500 text-sm">{matchTitle}</Text>
            </View>
            <Pressable onPress={onClose} className="p-1">
              <X color="#9ca3af" size={22} />
            </Pressable>
          </View>

          <ScrollView contentContainerClassName="px-4 pb-8 gap-3">
            {requests.length === 0 ? (
              <View className="items-center py-8">
                <Clock color="#374151" size={32} />
                <Text className="text-gray-500 mt-3">
                  No hay solicitudes pendientes
                </Text>
              </View>
            ) : (
              requests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  onAccept={() => acceptRequest(req.id)}
                  onReject={() => rejectRequest(req.id)}
                />
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function RequestCard({
  request,
  onAccept,
  onReject,
}: {
  request: EnrollmentRequest;
  onAccept: () => void;
  onReject: () => void;
}) {
  const cfg = statusConfig[request.status];

  return (
    <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center">
          <User color="#ffffff" size={18} />
        </View>
        <View className="flex-1">
          <Text className="text-white font-medium">{request.userName}</Text>
          <Text className="text-gray-500 text-sm">
            Posición: {request.position}
          </Text>
        </View>
        <View
          className={`px-2.5 py-1 rounded-full ${cfg.bg} border ${cfg.border}`}
        >
          <Text style={{ color: cfg.color }} className="text-xs font-medium">
            {cfg.label}
          </Text>
        </View>
      </View>

      {request.status === "pending" && (
        <View className="flex-row gap-2">
          <Pressable
            onPress={onReject}
            className="flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20"
          >
            <XCircle color="#ef4444" size={16} />
            <Text className="text-red-400 font-medium">Rechazar</Text>
          </Pressable>
          <Pressable
            onPress={onAccept}
            className="flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl bg-white"
          >
            <Check color="#000000" size={16} />
            <Text className="text-black font-medium">Aceptar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
