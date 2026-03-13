export interface Tournament {
  id: number;
  name: string;
  location: string;
  date: string;
  teams: number;
  description: string;
  entryFee: string;
  prize: string;
  format: string;
}

export const tournaments: Tournament[] = [
  {
    id: 1,
    name: "Copa Primavera 2026",
    location: "Polideportivo Central",
    date: "20-25 Marzo",
    teams: 16,
    description: "Torneo eliminatorio de fútbol 7. Fase de grupos + eliminación directa. Incluye árbitro, camisetas y trofeo.",
    entryFee: "2.500",
    prize: "Trofeo + $50.000",
    format: "Fútbol 7 • Eliminación directa",
  },
  {
    id: 2,
    name: "Torneo Relámpago",
    location: "Cancha Los Pinos",
    date: "28 Marzo",
    teams: 8,
    description: "Torneo express de un solo día. Partidos de 15 minutos por tiempo. Ideal para equipos que buscan competencia rápida.",
    entryFee: "1.500",
    prize: "Medallas + $20.000",
    format: "Fútbol 5 • Todos contra todos",
  },
  {
    id: 3,
    name: "Liga Barrial Verano",
    location: "Complejo Norte",
    date: "1-30 Abril",
    teams: 12,
    description: "Liga mensual con fixture fijo. Un partido por semana, los sábados a la tarde. Tabla de posiciones online.",
    entryFee: "3.000",
    prize: "Copa + $80.000",
    format: "Fútbol 11 • Liga",
  },
];
