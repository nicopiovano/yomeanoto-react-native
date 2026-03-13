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
  { id: 101, name: "Tomás Herrera", position: "Delantero", level: "Avanzado", distance: "3.2 km" },
  { id: 102, name: "Lucas García", position: "Mediocampista", level: "Intermedio", distance: "2.1 km" },
  { id: 103, name: "Sofía Méndez", position: "Defensor", level: "Avanzado", distance: "4.5 km" },
  { id: 104, name: "Valentina López", position: "Arquero", level: "Intermedio", distance: "1.8 km" },
  { id: 105, name: "Matías Rodríguez", position: "Delantero", level: "Avanzado", distance: "5.0 km" },
  { id: 106, name: "Diego Fernández", position: "Mediocampista", level: "Principiante", distance: "6.3 km" },
  { id: 107, name: "Ana M. Torres", position: "Defensor", level: "Intermedio", distance: "3.5 km" },
  { id: 108, name: "Pablo Torres", position: "Delantero", level: "Intermedio", distance: "2.8 km" },
  { id: 109, name: "Nicolás Pérez", position: "Arquero", level: "Avanzado", distance: "1.2 km" },
  { id: 110, name: "Santiago Ruiz", position: "Defensor", level: "Intermedio", distance: "2.4 km" },
  { id: 111, name: "Julieta Gómez", position: "Mediocampista", level: "Avanzado", distance: "0.8 km" },
  { id: 112, name: "Carlos Molina", position: "Delantero", level: "Principiante", distance: "3.1 km" },
];

export const playerRequests: Player[] = [
  { id: 8, name: "Roberto Torres", position: "Delantero", level: "Principiante", distance: "2.1 km" },
];
