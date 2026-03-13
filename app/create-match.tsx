import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Header } from "@/components/Header";
import { Calendar, Clock, MapPin, Users, DollarSign, Navigation } from "lucide-react-native";
import { useNotifications } from "@/contexts/NotificationContext";
import { createMatch } from "@/services/matchService";

const types = ["Fútbol 5", "Fútbol 7", "Fútbol 8", "Fútbol 11"];
const genders = ["Mixto", "Varones", "Mujeres"];
const intensities = ["Baja", "Media", "Alta"];
const matchLevels = ["Amistoso", "Competitivo"];

function OptionPill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3 py-1.5 rounded-full mr-2 mb-2 border ${
        selected
          ? "bg-white border-white"
          : "bg-[#111827] border-gray-700"
      }`}
    >
      <Text
        className={`text-xs font-medium ${
          selected ? "text-black" : "text-gray-300"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function CreateMatchScreen() {
  const { addNotification } = useNotifications();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("15 Mar");
  const [time, setTime] = useState("20:00");
  const [playersNeeded, setPlayersNeeded] = useState("4");
  const [price, setPrice] = useState("150");
  const [type, setType] = useState("Fútbol 5");
  const [gender, setGender] = useState("Mixto");
  const [intensity, setIntensity] = useState("Media");
  const [address, setAddress] = useState("");
  const [matchLevel, setMatchLevel] = useState("Amistoso");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !location.trim()) {
      Alert.alert(
        "Datos incompletos",
        "Completá al menos el nombre de la cancha y la ubicación."
      );
      return;
    }

    setSubmitting(true);
    try {
      await createMatch({
        title: title.trim(),
        location: location.trim(),
        address: address.trim(),
        matchLevel,
        date,
        time,
        playersNeeded: Number(playersNeeded) || 0,
        price,
        type,
        gender,
        intensity,
      });

      addNotification({
        type: "match_update",
        title: "Partido creado",
        message: `Tu partido en ${title.trim()} fue creado. Los jugadores ya pueden postularse.`,
        read: false,
      });

      Alert.alert(
        "Partido creado",
        "El partido se creó en modo mock. Cuando conectes el backend se guardará en el servidor."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Crear partido" showBack />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-5 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-3">
          <Text className="text-white font-medium">Datos básicos</Text>

          <View className="bg-[#111827] rounded-2xl border border-gray-800 p-4 gap-3">
            <View className="gap-1">
              <Text className="text-gray-400 text-xs mb-1">Nombre de la cancha</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Cancha Los Pinos"
                placeholderTextColor="#6b7280"
                className="text-white text-sm"
              />
            </View>

            <View className="h-px bg-gray-800" />

            <View className="gap-1">
              <Text className="text-gray-400 text-xs mb-1">Ubicación (barrio)</Text>
              <View className="flex-row items-center gap-2">
                <MapPin color="#9ca3af" size={16} />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Barrio o zona"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>

            <View className="h-px bg-gray-800" />

            <View className="gap-1">
              <Text className="text-gray-400 text-xs mb-1">Dirección de la cancha</Text>
              <View className="flex-row items-center gap-2">
                <Navigation color="#9ca3af" size={16} />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Av. Ejemplo 1234"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-[#111827] rounded-2xl border border-gray-800 p-4 gap-3">
          <Text className="text-white font-medium mb-1">Fecha y horario</Text>

          <View className="flex-row gap-3">
            <View className="flex-1 gap-1">
              <Text className="text-gray-400 text-xs mb-1">Fecha</Text>
              <View className="flex-row items-center gap-2 bg-[#020617] rounded-xl px-3 py-2 border border-gray-800">
                <Calendar color="#9ca3af" size={16} />
                <TextInput
                  value={date}
                  onChangeText={setDate}
                  placeholder="15 Mar"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>

            <View className="flex-1 gap-1">
              <Text className="text-gray-400 text-xs mb-1">Hora</Text>
              <View className="flex-row items-center gap-2 bg-[#020617] rounded-xl px-3 py-2 border border-gray-800">
                <Clock color="#9ca3af" size={16} />
                <TextInput
                  value={time}
                  onChangeText={setTime}
                  placeholder="20:00"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-[#111827] rounded-2xl border border-gray-800 p-4 gap-3">
          <Text className="text-white font-medium mb-1">Detalles del partido</Text>

          <View className="gap-2">
            <Text className="text-gray-400 text-xs mb-1">Tipo de cancha</Text>
            <View className="flex-row flex-wrap">
              {types.map((t) => (
                <OptionPill
                  key={t}
                  label={t}
                  selected={type === t}
                  onPress={() => setType(t)}
                />
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-gray-400 text-xs mb-1">Género</Text>
            <View className="flex-row flex-wrap">
              {genders.map((g) => (
                <OptionPill
                  key={g}
                  label={g}
                  selected={gender === g}
                  onPress={() => setGender(g)}
                />
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-gray-400 text-xs mb-1">Intensidad</Text>
            <View className="flex-row flex-wrap">
              {intensities.map((i) => (
                <OptionPill
                  key={i}
                  label={i}
                  selected={intensity === i}
                  onPress={() => setIntensity(i)}
                />
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-gray-400 text-xs mb-1">Nivel del partido</Text>
            <View className="flex-row flex-wrap">
              {matchLevels.map((ml) => (
                <OptionPill
                  key={ml}
                  label={ml}
                  selected={matchLevel === ml}
                  onPress={() => setMatchLevel(ml)}
                />
              ))}
            </View>
          </View>

          <View className="flex-row gap-3 mt-1">
            <View className="flex-1 gap-1">
              <Text className="text-gray-400 text-xs mb-1">Jugadores faltantes</Text>
              <View className="flex-row items-center gap-2 bg-[#020617] rounded-xl px-3 py-2 border border-gray-800">
                <Users color="#9ca3af" size={16} />
                <TextInput
                  value={playersNeeded}
                  onChangeText={setPlayersNeeded}
                  keyboardType="number-pad"
                  placeholder="4"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>

            <View className="flex-1 gap-1">
              <Text className="text-gray-400 text-xs mb-1">Precio aprox. por jugador</Text>
              <View className="flex-row items-center gap-2 bg-[#020617] rounded-xl px-3 py-2 border border-gray-800">
                <DollarSign color="#4ade80" size={16} />
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="number-pad"
                  placeholder="150"
                  placeholderTextColor="#6b7280"
                  className="text-white text-sm flex-1"
                />
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={submitting}
          className={`w-full py-4 rounded-2xl flex-row items-center justify-center ${
            submitting ? "bg-gray-500" : "bg-white"
          }`}
        >
          <Text className={submitting ? "text-gray-200 font-medium" : "text-black font-medium"}>
            {submitting ? "Creando..." : "Publicar partido"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

