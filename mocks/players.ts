export interface Player {
  id: number;
  name: string;
  position: string;
  level: string;
  distance: string;
  photoUrl?: string;
}

export const nearbyPlayers: Player[] = [
  { id: 1, name: "Juan Pérez", position: "Delantero", level: "Avanzado", distance: "2.5 km" },
  { id: 2, name: "María González", position: "Mediocampista", level: "Intermedio", distance: "3.1 km" },
  { id: 3, name: "Carlos Ruiz", position: "Defensor", level: "Avanzado", distance: "4.2 km" },
  { id: 4, name: "Ana Martínez", position: "Arquero", level: "Principiante", distance: "1.8 km" },
  { id: 5, name: "Diego López", position: "Delantero", level: "Intermedio", distance: "5.0 km" },
];

export const friends: Player[] = [
  { id: 6, name: "Pablo Fernández", position: "Mediocampista", level: "Avanzado", distance: "6.3 km" },
  { id: 7, name: "Laura Sánchez", position: "Defensor", level: "Intermedio", distance: "3.5 km" },
];

export const playerRequests: Player[] = [
  { id: 8, name: "Roberto Torres", position: "Delantero", level: "Principiante", distance: "2.1 km" },
];
