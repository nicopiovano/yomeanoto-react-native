export type NotificationType =
  | "match_invite"
  | "match_reminder"
  | "match_update"
  | "match_cancelled"
  | "player_invite"
  | "team_request"
  | "enrollment_request"
  | "enrollment_accepted"
  | "enrollment_rejected"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: {
    matchId?: number;
    playerId?: number;
    teamId?: number;
    enrollmentId?: string;
    [key: string]: any;
  };
}

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "match_reminder",
    title: "Partido en 2 horas",
    message: "Tu partido en Cancha Los Pinos comienza a las 18:00",
    read: false,
    createdAt: "2026-03-13T14:00:00Z",
    data: { matchId: 1 },
  },
  {
    id: "n2",
    type: "player_invite",
    title: "Nueva invitación recibida",
    message: "Juan Pérez te invitó a un partido el 16 Mar",
    read: false,
    createdAt: "2026-03-13T10:30:00Z",
    data: { matchId: 2, playerId: 1 },
  },
  {
    id: "n_enroll_1",
    type: "enrollment_request",
    title: "Quieren unirse a tu partido",
    message: "Diego Fernández quiere unirse a Cancha Sintética Sur",
    read: false,
    createdAt: "2026-03-13T12:00:00Z",
    data: { matchId: 6, playerId: 20, enrollmentId: "er_1" },
  },
  {
    id: "n_enroll_2",
    type: "enrollment_request",
    title: "Quieren unirse a tu partido",
    message: "Ana Martínez quiere unirse a Cancha Sintética Sur",
    read: false,
    createdAt: "2026-03-13T11:30:00Z",
    data: { matchId: 6, playerId: 21, enrollmentId: "er_2" },
  },
  {
    id: "n3",
    type: "match_update",
    title: "Partido actualizado",
    message: "Se agregó un jugador a tu partido en Complejo Norte",
    read: true,
    createdAt: "2026-03-12T18:00:00Z",
    data: { matchId: 2 },
  },
  {
    id: "n4",
    type: "player_invite",
    title: "Solicitud aceptada",
    message: "María González aceptó tu invitación para el partido",
    read: false,
    createdAt: "2026-03-13T08:00:00Z",
    data: { playerId: 2 },
  },
  {
    id: "n5",
    type: "match_invite",
    title: "Te invitaron a un partido",
    message: "Carlos Ruiz te sumó al partido en Arena Sports Center",
    read: true,
    createdAt: "2026-03-11T15:00:00Z",
    data: { matchId: 4, playerId: 3 },
  },
  {
    id: "n6",
    type: "system",
    title: "Bienvenido a FAP",
    message: "Tu cuenta fue creada exitosamente. ¡Empezá a jugar!",
    read: true,
    createdAt: "2026-03-10T09:00:00Z",
  },
];
