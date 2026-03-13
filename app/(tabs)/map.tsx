import { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Plus, SlidersHorizontal, MapPin } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { router } from "expo-router";
import { matchLocations } from "@/mocks/matches";

const center = { lat: -34.56, lng: -58.44 };

function generateMapHTML() {
  const markers = matchLocations
    .map(
      (l) =>
        `L.marker([${l.lat},${l.lng}]).addTo(map).bindPopup('<b>${l.name}</b><br>${l.players} jugador${l.players !== 1 ? "es" : ""} necesario${l.players !== 1 ? "s" : ""}');`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  *{margin:0;padding:0}
  html,body,#map{width:100%;height:100%}
  .leaflet-popup-content-wrapper{background:#1a1a1a;color:#fff;border:1px solid #333;border-radius:12px}
  .leaflet-popup-tip{background:#1a1a1a}
  .leaflet-popup-content b{color:#4ade80}
</style>
</head><body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:false}).setView([${center.lat},${center.lng}],12);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; OpenStreetMap &copy; CARTO',
    maxZoom:19
  }).addTo(map);
  ${markers}
</script>
</body></html>`;
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const webviewRef = useRef<WebView>(null);

  return (
    <View className="flex-1 bg-black">
      <WebView
        ref={webviewRef}
        source={{ html: generateMapHTML() }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        scrollEnabled={false}
      />

      <View
        className="absolute top-0 left-0 right-0 px-4 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-medium">Mapa</Text>
          <Pressable className="p-2 bg-white/10 rounded-lg border border-white/20">
            <SlidersHorizontal color="#ffffff" size={24} />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/create-match")}
        className="absolute bottom-36 right-4 w-14 h-14 bg-white rounded-full items-center justify-center z-10"
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

      <View className="absolute bottom-6 left-0 right-0 px-4">
        <View className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-400 text-sm mb-1">
                Partidos cerca de ti
              </Text>
              <View className="flex-row items-center gap-2">
                <MapPin color="#4ade80" size={16} />
                <Text className="text-white text-2xl font-medium">
                  {matchLocations.length}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push("/explore-matches")}
              className="px-4 py-2 bg-white rounded-lg"
            >
              <Text className="text-sm text-black font-medium">Ver lista</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
