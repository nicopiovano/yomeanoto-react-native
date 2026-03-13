import { USE_MOCKS, API_URL } from "@/config/env";
import { nearbyPlayers, friends, playerRequests } from "@/mocks/players";
import type { Player } from "@/mocks/players";

export async function getNearbyPlayers(): Promise<Player[]> {
  if (USE_MOCKS) return nearbyPlayers;
  const res = await fetch(`${API_URL}/players/nearby`);
  return res.json();
}

export async function getFriends(): Promise<Player[]> {
  if (USE_MOCKS) return friends;
  const res = await fetch(`${API_URL}/players/friends`);
  return res.json();
}

export async function getPlayerRequests(): Promise<Player[]> {
  if (USE_MOCKS) return playerRequests;
  const res = await fetch(`${API_URL}/players/requests`);
  return res.json();
}

export async function invitePlayer(playerId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/players/${playerId}/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function requestTeamJoin(teamId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/teams/${teamId}/join-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
