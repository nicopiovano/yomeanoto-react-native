export interface MatchCreator {
  id: number;
  name: string;
  username: string;
  photoUrl?: string;
}

export type MatchLevel = "Amistoso" | "Competitivo";

export interface Match {
  id: number;
  title: string;
  date: string;
  time: string;
  playersNeeded: number;
  positions: string[];
  type: string;
  price: string;
  gender: string;
  intensity: string;
  location?: string;
  address?: string;
  matchLevel?: MatchLevel;
  description?: string;
  createdBy?: MatchCreator;
  lat?: number;
  lng?: number;
  maxPlayers?: number;
  currentPlayers?: number;
}

export interface MatchLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  players: number;
}

export interface MatchHistoryItem {
  id: number;
  date: string;
  field: string;
  result: string;
  position: string;
  goals: number;
  assists: number;
  resultType: "win" | "draw" | "loss";
  isTournament: boolean;
}

export const upcomingMatches: Match[] = [
  {
    id: 1,
    title: "Cancha Los Pinos",
    date: "15 Mar",
    time: "18:00",
    playersNeeded: 2,
    positions: ["Defensor", "Delantero"],
    type: "Fútbol 7",
    price: "150",
    gender: "Mixto",
    intensity: "Media",
    location: "San Isidro",
    address: "Av. Centenario 1250, San Isidro",
    matchLevel: "Amistoso",
    description: "Partido semanal entre amigos. Cancha de césped sintético con vestuarios. Traer pechera clara y oscura.",
    createdBy: { id: 10, name: "Tomás Herrera", username: "@tomasH" },
    lat: -34.4705,
    lng: -58.5107,
    maxPlayers: 14,
    currentPlayers: 12,
  },
  {
    id: 5,
    title: "Club Atlético Social",
    date: "15 Mar",
    time: "20:30",
    playersNeeded: 3,
    positions: ["Mediocampista", "Delantero", "Defensor"],
    type: "Fútbol 5",
    price: "100",
    gender: "Varones",
    intensity: "Alta",
    location: "Núñez",
    address: "Av. del Libertador 7800, Núñez",
    matchLevel: "Competitivo",
    description: "Fútbol rápido en cancha techada. Nivel competitivo, puntualidad estricta.",
    createdBy: { id: 11, name: "Lucas García", username: "@lucasg" },
    lat: -34.5405,
    lng: -58.4607,
    maxPlayers: 10,
    currentPlayers: 7,
  },
  {
    id: 6,
    title: "Cancha Sintética Sur",
    date: "16 Mar",
    time: "16:00",
    playersNeeded: 5,
    positions: ["Arquero", "Defensor", "Mediocampista"],
    type: "Fútbol 8",
    price: "160",
    gender: "Mixto",
    intensity: "Media",
    location: "Avellaneda",
    address: "Calle Mitre 450, Avellaneda",
    matchLevel: "Amistoso",
    description: "Partido recreativo abierto. Todos los niveles bienvenidos. Hay agua y estacionamiento.",
    createdBy: { id: 1, name: "Martín López", username: "@martinl" },
    lat: -34.6605,
    lng: -58.3707,
    maxPlayers: 16,
    currentPlayers: 11,
  },
];

export const nearbyMatches: Match[] = [
  {
    id: 2,
    title: "Complejo Deportivo Norte",
    date: "16 Mar",
    time: "19:30",
    playersNeeded: 4,
    positions: ["Arquero", "Mediocampista", "Delantero"],
    type: "Fútbol 11",
    price: "200",
    gender: "Varones",
    intensity: "Alta",
    location: "Belgrano",
    address: "Av. Cabildo 3200, Belgrano",
    matchLevel: "Competitivo",
    description: "Partido 11 contra 11 en cancha de césped natural. Nivel avanzado.",
    createdBy: { id: 13, name: "Matías Rodríguez", username: "@matirod" },
    lat: -34.5605,
    lng: -58.4507,
    maxPlayers: 22,
    currentPlayers: 18,
  },
  {
    id: 3,
    title: "Cancha El Gol",
    date: "17 Mar",
    time: "20:00",
    playersNeeded: 3,
    positions: ["Defensor", "Mediocampista"],
    type: "Fútbol 8",
    price: "180",
    gender: "Mixto",
    intensity: "Media",
    location: "Palermo",
    address: "Honduras 5600, Palermo",
    matchLevel: "Amistoso",
    description: "Fútbol mixto recreativo. Ambiente copado, después del partido vamos por unas birras.",
    createdBy: { id: 14, name: "Valentina López", username: "@valelo" },
    lat: -34.5805,
    lng: -58.4307,
    maxPlayers: 16,
    currentPlayers: 13,
  },
  {
    id: 4,
    title: "Arena Sports Center",
    date: "18 Mar",
    time: "17:00",
    playersNeeded: 1,
    positions: ["Arquero"],
    type: "Fútbol 5",
    price: "120",
    gender: "Mujeres",
    intensity: "Baja",
    location: "Recoleta",
    address: "Junín 1930, Recoleta",
    matchLevel: "Amistoso",
    description: "Partido femenino para principiantes. Cancha techada con césped sintético nuevo.",
    createdBy: { id: 15, name: "Camila Torres", username: "@camitorres" },
    lat: -34.5905,
    lng: -58.3907,
    maxPlayers: 10,
    currentPlayers: 9,
  },
];

export const matchLocations: MatchLocation[] = [
  { id: 1, name: "Cancha Los Pinos", lat: -34.4705, lng: -58.5107, players: 2 },
  { id: 2, name: "Complejo Norte", lat: -34.5605, lng: -58.4507, players: 4 },
  { id: 3, name: "El Gol", lat: -34.5805, lng: -58.4307, players: 3 },
  { id: 4, name: "Arena Sports", lat: -34.5905, lng: -58.3907, players: 1 },
];

export const matchHistory: MatchHistoryItem[] = [
  { id: 1, date: "10 Mar 2026", field: "Cancha Los Pinos", result: "Victoria 5-3", position: "Delantero", goals: 2, assists: 1, resultType: "win", isTournament: false },
  { id: 2, date: "5 Mar 2026", field: "Complejo Norte", result: "Empate 2-2", position: "Delantero", goals: 1, assists: 0, resultType: "draw", isTournament: true },
  { id: 3, date: "28 Feb 2026", field: "Arena Sports", result: "Derrota 1-4", position: "Mediocampista", goals: 0, assists: 1, resultType: "loss", isTournament: true },
  { id: 4, date: "22 Feb 2026", field: "El Gol", result: "Victoria 6-2", position: "Delantero", goals: 3, assists: 2, resultType: "win", isTournament: true },
  { id: 5, date: "15 Feb 2026", field: "Cancha Municipal", result: "Victoria 4-1", position: "Delantero", goals: 1, assists: 1, resultType: "win", isTournament: false },
  { id: 6, date: "8 Feb 2026", field: "Polideportivo Sur", result: "Empate 3-3", position: "Delantero", goals: 2, assists: 0, resultType: "draw", isTournament: false },
];
