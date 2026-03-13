import { useState } from "react";
import { View, Text, ScrollView, Switch, Pressable, Alert } from "react-native";
import { Bell, MapPin, Moon, Volume2, Globe, Trash2 } from "lucide-react-native";
import { Header } from "@/components/Header";

interface SettingToggle {
  id: string;
  icon: typeof Bell;
  label: string;
  description: string;
  color: string;
  defaultValue: boolean;
}

const toggleSettings: SettingToggle[] = [
  {
    id: "push",
    icon: Bell,
    label: "Notificaciones push",
    description: "Recibí alertas de partidos, invitaciones y mensajes",
    color: "#3b82f6",
    defaultValue: true,
  },
  {
    id: "location",
    icon: MapPin,
    label: "Ubicación",
    description: "Permitir acceso a tu ubicación para partidos cercanos",
    color: "#4ade80",
    defaultValue: true,
  },
  {
    id: "sounds",
    icon: Volume2,
    label: "Sonidos",
    description: "Sonidos de notificación dentro de la app",
    color: "#eab308",
    defaultValue: false,
  },
  {
    id: "darkMode",
    icon: Moon,
    label: "Modo oscuro",
    description: "Siempre activo en esta versión",
    color: "#a855f7",
    defaultValue: true,
  },
];

export default function SettingsScreen() {
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(toggleSettings.map((s) => [s.id, s.defaultValue]))
  );

  const toggle = (id: string) => {
    if (id === "darkMode") return;
    setValues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro? Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => Alert.alert("Cuenta eliminada", "Tu cuenta fue eliminada.") },
      ]
    );
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Configuración" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-6 pb-6"
      >
        <View className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden">
          {toggleSettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <View
                key={setting.id}
                className={`flex-row items-center justify-between p-4 ${
                  index < toggleSettings.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
              >
                <View className="flex-row items-center gap-3 flex-1 pr-4">
                  <Icon color={setting.color} size={20} />
                  <View className="flex-1">
                    <Text className="text-white font-medium">{setting.label}</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">
                      {setting.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={values[setting.id]}
                  onValueChange={() => toggle(setting.id)}
                  trackColor={{ false: "#374151", true: "#4ade80" }}
                  thumbColor="#ffffff"
                  disabled={setting.id === "darkMode"}
                />
              </View>
            );
          })}
        </View>

        <View>
          <Text className="text-gray-400 text-sm mb-3">Idioma</Text>
          <View className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-4 flex-row items-center gap-3">
            <Globe color="#9ca3af" size={20} />
            <Text className="text-white flex-1">Español (Argentina)</Text>
            <Text className="text-gray-500 text-sm">Cambiar</Text>
          </View>
        </View>

        <View>
          <Text className="text-gray-400 text-sm mb-3">Cuenta</Text>
          <Pressable
            onPress={handleDeleteAccount}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex-row items-center gap-3"
          >
            <Trash2 color="#ef4444" size={20} />
            <View>
              <Text className="text-red-400 font-medium">Eliminar cuenta</Text>
              <Text className="text-xs text-red-400/60 mt-0.5">
                Se borrarán todos tus datos permanentemente
              </Text>
            </View>
          </Pressable>
        </View>

        <Text className="text-center text-gray-600 text-sm mt-2">
          Versión 1.0.0 • Build 1
        </Text>
      </ScrollView>
    </View>
  );
}
