import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { ChevronDown, Check } from "lucide-react-native";

const statuses = [
  { id: "ready", label: "Listo para jugar", color: "#22c55e" },
  { id: "unavailable", label: "No disponible", color: "#6b7280" },
  { id: "injured", label: "Lesionado", color: "#ef4444" },
];

export function StatusDropdown() {
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg"
      >
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: selectedStatus.color }}
        />
        <Text className="text-sm text-white">{selectedStatus.label}</Text>
        <ChevronDown color="#9ca3af" size={16} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setIsOpen(false)}
        >
          <View className="w-48 bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
            {statuses.map((status) => (
              <Pressable
                key={status.id}
                onPress={() => {
                  setSelectedStatus(status);
                  setIsOpen(false);
                }}
                className="flex-row items-center justify-between gap-2 px-3 py-3"
              >
                <View className="flex-row items-center gap-2">
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <Text className="text-sm text-white">{status.label}</Text>
                </View>
                {selectedStatus.id === status.id && (
                  <Check color="#4ade80" size={16} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
