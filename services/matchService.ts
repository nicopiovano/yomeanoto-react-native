import { USE_MOCKS, API_URL } from "@/config/env";
import {
  upcomingMatches,
  nearbyMatches,
  matchLocations,
  matchHistory,
} from "@/mocks/matches";
import type { Match, MatchLocation, MatchHistoryItem } from "@/mocks/matches";

interface CreateMatchPayload {
  title: string;
  location: string;
  date: string;
  time: string;
  playersNeeded: number;
  price: string;
  type: string;
  gender: string;
  intensity: string;
}

export async function getUpcomingMatches(): Promise<Match[]> {
  if (USE_MOCKS) return upcomingMatches;
  const res = await fetch(`${API_URL}/matches/upcoming`);
  return res.json();
}

export async function getNearbyMatches(): Promise<Match[]> {
  if (USE_MOCKS) return nearbyMatches;
  const res = await fetch(`${API_URL}/matches/nearby`);
  return res.json();
}

export async function getAllMatches(): Promise<Match[]> {
  if (USE_MOCKS) return [...upcomingMatches, ...nearbyMatches];
  const res = await fetch(`${API_URL}/matches`);
  return res.json();
}

export async function getMatchById(id: number): Promise<Match | null> {
  if (USE_MOCKS) {
    const allMatches = [...upcomingMatches, ...nearbyMatches];
    return allMatches.find((m) => m.id === id) ?? null;
  }
  const res = await fetch(`${API_URL}/matches/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function joinMatch(matchId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/matches/${matchId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function requestMatchEnrollment(matchId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/matches/${matchId}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function respondToEnrollment(
  enrollmentId: string,
  accepted: boolean
): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/enrollments/${enrollmentId}/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accepted }),
  });
}

export async function getMatchLocations(): Promise<MatchLocation[]> {
  if (USE_MOCKS) return matchLocations;
  const res = await fetch(`${API_URL}/matches/locations`);
  return res.json();
}

export async function getMatchHistory(): Promise<MatchHistoryItem[]> {
  if (USE_MOCKS) return matchHistory;
  const res = await fetch(`${API_URL}/matches/history`);
  return res.json();
}

export async function createMatch(payload: CreateMatchPayload): Promise<void> {
  if (USE_MOCKS) {
    // En modo mock no persistimos nada, solo simulamos la llamada
    return;
  }

  await fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function cancelEnrollment(matchId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/matches/${matchId}/enroll/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function cancelMatch(matchId: number): Promise<void> {
  if (USE_MOCKS) return;
  await fetch(`${API_URL}/matches/${matchId}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}


