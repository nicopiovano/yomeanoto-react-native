import { View, Text, ScrollView } from "react-native";
import { Search, UserPlus, MapPin, Trophy } from "lucide-react-native";
import { Header } from "@/components/Header";

const steps = [
  {
    icon: Search,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Buscá un partido",
    description: "Explorá partidos cerca tuyo usando el mapa o la pantalla principal. Filtrá por tipo, horario y nivel.",
  },
  {
    icon: UserPlus,
    color: "#4ade80",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Unite o creá uno",
    description: "Si encontrás uno que te guste, tocá \"Unirse\". Si no, creá tu propio partido y esperá que se sumen jugadores.",
  },
  {
    icon: MapPin,
    color: "#eab308",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Llegá a la cancha",
    description: "El día del partido vas a recibir una notificación con recordatorio. Podés abrir la ubicación en tu mapa favorito.",
  },
  {
    icon: Trophy,
    color: "#a855f7",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "¡Jugá y calificá!",
    description: "Después del partido, calificá a los otros jugadores. Así todos mejoran su reputación en la plataforma.",
  },
];

const faqs = [
  {
    q: "¿La app es gratis?",
    a: "Sí, la app es completamente gratuita. Solo pagás el alquiler de cancha si el organizador lo indica.",
  },
  {
    q: "¿Cómo funciona la calificación?",
    a: "Después de cada partido, los jugadores se califican entre sí del 1 al 5. Tu calificación promedio aparece en tu perfil.",
  },
  {
    q: "¿Puedo crear un equipo?",
    a: "Sí, desde la sección Comunidad podés crear o unirte a equipos. Los equipos pueden inscribirse en torneos.",
  },
];

export default function HowItWorksScreen() {
  return (
    <View className="flex-1 bg-black">
      <Header title="Cómo funciona" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-8 pb-6"
      >
        <View className="gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <View key={index} className="flex-row gap-4">
                <View className="items-center">
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center ${step.bg} border ${step.border}`}
                  >
                    <Icon color={step.color} size={22} />
                  </View>
                  {index < steps.length - 1 && (
                    <View className="w-0.5 flex-1 bg-gray-800 mt-2" />
                  )}
                </View>
                <View className="flex-1 pb-6">
                  <Text className="text-white font-medium text-lg mb-1">
                    {step.title}
                  </Text>
                  <Text className="text-gray-400 text-sm leading-5">
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View>
          <Text className="text-white text-lg font-medium mb-4">
            Preguntas frecuentes
          </Text>
          <View className="gap-3">
            {faqs.map((faq, index) => (
              <View
                key={index}
                className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
              >
                <Text className="text-white font-medium mb-2">{faq.q}</Text>
                <Text className="text-gray-400 text-sm leading-5">{faq.a}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
