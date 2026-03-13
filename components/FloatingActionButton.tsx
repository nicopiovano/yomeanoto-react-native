import { Pressable } from "react-native";
import { Plus } from "lucide-react-native";

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-6 right-4 w-14 h-14 bg-white rounded-full items-center justify-center z-10"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Plus color="#000000" size={24} />
    </Pressable>
  );
}
