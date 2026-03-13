import { Text, Pressable, type ViewStyle } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  style?: ViewStyle;
}

const variantClasses = {
  primary: "bg-white",
  secondary: "bg-[#1a1a1a] border border-gray-800",
  danger: "bg-red-500/10 border border-red-500/20",
} as const;

const textClasses = {
  primary: "text-black",
  secondary: "text-white",
  danger: "text-red-500",
} as const;

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  fullWidth = false,
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`${fullWidth ? "w-full" : ""} ${variantClasses[variant]} py-3 px-5 rounded-xl items-center justify-center`}
      style={style}
    >
      <Text className={`font-medium ${textClasses[variant]}`}>{label}</Text>
    </Pressable>
  );
}
