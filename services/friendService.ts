import { USE_MOCKS, API_URL } from "@/config/env";
import { friends as mockFriends, nearbyPlayers } from "@/mocks/players";
import type { Player } from "@/mocks/players";

export async function getFriends(): Promise<Player[]> {
  if (USE_MOCKS) return mockFriends;
  const res = await fetch(`${API_URL}/friends`);
  return res.json();
}

export async function getFriendSuggestions(): Promise<Player[]> {
  if (USE_MOCKS) return nearbyPlayers;
  const res = await fetch(`${API_URL}/friends/suggestions`);
  return res.json();
}

export async function addFriend(playerId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/friends`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId }),
  });
}

export async function removeFriend(playerId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/friends/${playerId}`, {
    method: "DELETE",
  });
}

