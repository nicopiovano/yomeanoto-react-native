import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { MatchEnrollmentProvider } from "@/contexts/MatchEnrollmentContext";

export default function RootLayout() {
  return (
    <NotificationProvider>
      <MatchEnrollmentProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="match-detail" />
          <Stack.Screen name="explore-matches" />
          <Stack.Screen name="create-match" />
          <Stack.Screen name="friends" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="match-history" />
          <Stack.Screen name="my-matches" />
          <Stack.Screen name="my-lists" />
          <Stack.Screen name="my-teams" />
          <Stack.Screen name="news" />
          <Stack.Screen name="how-it-works" />
          <Stack.Screen name="help" />
          <Stack.Screen name="suggestions" />
          <Stack.Screen name="settings" />
        </Stack>
      </MatchEnrollmentProvider>
    </NotificationProvider>
  );
}
