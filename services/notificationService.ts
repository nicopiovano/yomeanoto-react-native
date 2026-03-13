import { USE_MOCKS, API_URL } from "@/config/env";
import { mockNotifications } from "@/mocks/notifications";
import type { AppNotification } from "@/mocks/notifications";

export async function getNotifications(): Promise<AppNotification[]> {
  if (USE_MOCKS) return mockNotifications;
  const res = await fetch(`${API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return res.json();
}

export async function markNotificationAsRead(id: string): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/notifications/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
}

export async function markAllNotificationsAsRead(): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/notifications/read-all`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
}

export async function sendPlayerInvite(
  playerId: number,
  matchId?: number
): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({ playerId, matchId }),
  });
}

export async function registerPushToken(token: string): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/devices/push-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({ token, platform: "android" }),
  });
}

async function getToken(): Promise<string> {
  // TODO: Retrieve Sanctum token from secure storage (expo-secure-store)
  return "";
}
