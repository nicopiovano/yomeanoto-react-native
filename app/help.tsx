import { useState } from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { ChevronDown, ChevronUp, Mail, MessageCircle } from "lucide-react-native";
import { Header } from "@/components/Header";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "¿Cómo creo un partido?",
    answer: "Tocá el botón \"+\" en la pantalla principal o en el mapa. Completá los datos del partido: tipo, fecha, hora, ubicación y cantidad de jugadores. Una vez publicado, otros jugadores podrán verlo y anotarse.",
  },
  {
    id: 2,
    question: "¿Cómo invito jugadores a un partido?",
    answer: "Desde la pestaña \"Jugadores\", podés buscar jugadores cercanos y tocar \"Invitar\" en su tarjeta. El jugador recibirá una notificación con los detalles del partido.",
  },
  {
    id: 3,
    question: "¿Puedo cancelar mi participación en un partido?",
    answer: "Sí, entrá al detalle del partido desde \"Mis partidos\" y tocá \"Salir del partido\". Te pedimos que avises con al menos 2 horas de anticipación.",
  },
  {
    id: 4,
    question: "¿Cómo funciona el sistema de calificaciones?",
    answer: "Después de cada partido, podés calificar a los demás jugadores del 1 al 5. La calificación promedio aparece en el perfil de cada jugador y ayuda a mantener la comunidad confiable.",
  },
  {
    id: 5,
    question: "¿Cómo me uno a un equipo?",
    answer: "Desde la pestaña \"Comunidad\", podés ver equipos cercanos y solicitar unirte. El administrador del equipo aprobará tu solicitud.",
  },
  {
    id: 6,
    question: "¿Cómo inscribo a mi equipo en un torneo?",
    answer: "En la sección \"Comunidad\", tocá \"Ver detalles\" en un torneo. Revisá la información y tocá \"Inscribir mi equipo\". Recibirás una confirmación.",
  },
  {
    id: 7,
    question: "¿La app funciona sin internet?",
    answer: "Necesitás conexión a internet para buscar partidos, recibir notificaciones e interactuar con otros jugadores. Algunas funciones como ver tu perfil funcionan offline.",
  },
];

export default function HelpScreen() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <View className="flex-1 bg-black">
      <Header title="Ayuda" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 gap-3 pb-6"
      >
        <Text className="text-gray-400 text-sm mb-2">Preguntas frecuentes</Text>

        {faqItems.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setExpandedId(expanded ? null : item.id)}
              className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden"
            >
              <View className="flex-row items-center justify-between p-4">
                <Text className="text-white font-medium flex-1 pr-4">
                  {item.question}
                </Text>
                {expanded ? (
                  <ChevronUp color="#9ca3af" size={18} />
                ) : (
                  <ChevronDown color="#9ca3af" size={18} />
                )}
              </View>
              {expanded && (
                <View className="px-4 pb-4 pt-0">
                  <Text className="text-gray-400 text-sm leading-5">
                    {item.answer}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}

        <View className="mt-4">
          <Text className="text-gray-400 text-sm mb-3">¿No encontraste lo que buscabas?</Text>
          <View className="gap-3">
            <Pressable
              onPress={() => Linking.openURL("mailto:soporte@fap.com")}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 flex-row items-center gap-3"
            >
              <View className="w-10 h-10 bg-blue-500/10 rounded-full items-center justify-center">
                <Mail color="#3b82f6" size={18} />
              </View>
              <View>
                <Text className="text-white font-medium">Escribinos por email</Text>
                <Text className="text-sm text-gray-500">soporte@fap.com</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL("https://wa.me/5491100000000")}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 flex-row items-center gap-3"
            >
              <View className="w-10 h-10 bg-green-500/10 rounded-full items-center justify-center">
                <MessageCircle color="#4ade80" size={18} />
              </View>
              <View>
                <Text className="text-white font-medium">WhatsApp</Text>
                <Text className="text-sm text-gray-500">+54 9 11 0000-0000</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
