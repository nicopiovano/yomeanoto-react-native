export interface Team {
  id: number;
  name: string;
  level: string;
  players: number;
}

export const teams: Team[] = [
  { id: 1, name: "Los Leones FC", level: "Avanzado", players: 18 },
  { id: 2, name: "United Stars", level: "Intermedio", players: 15 },
  { id: 3, name: "Águilas Doradas", level: "Principiante", players: 12 },
  { id: 4, name: "FC Rápidos", level: "Avanzado", players: 20 },
];
