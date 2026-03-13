import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { CURRENT_USER } from "@/config/user";
import { useNotifications } from "@/contexts/NotificationContext";
import { upcomingMatches, nearbyMatches } from "@/mocks/matches";

export type EnrollmentStatus = "none" | "pending" | "confirmed" | "rejected" | "cancelled";

export interface EnrollmentRequest {
  id: string;
  matchId: number;
  userId: number;
  userName: string;
  position: string;
  status: "pending" | "accepted" | "rejected";
  requestedAt: string;
}

interface MatchEnrollmentContextType {
  getStatus: (matchId: number) => EnrollmentStatus;
  isCreator: (matchId: number) => boolean;
  isMatchCancelled: (matchId: number) => boolean;
  requestEnrollment: (matchId: number) => void;
  cancelEnrollment: (matchId: number) => void;
  cancelMatch: (matchId: number) => void;
  getRequestsForMatch: (matchId: number) => EnrollmentRequest[];
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  pendingRequestCount: (matchId: number) => number;
}

const MatchEnrollmentContext = createContext<MatchEnrollmentContextType>({
  getStatus: () => "none",
  isCreator: () => false,
  isMatchCancelled: () => false,
  requestEnrollment: () => {},
  cancelEnrollment: () => {},
  cancelMatch: () => {},
  getRequestsForMatch: () => [],
  acceptRequest: () => {},
  rejectRequest: () => {},
  pendingRequestCount: () => 0,
});

const initialEnrollments: Record<number, EnrollmentStatus> = {
  1: "confirmed",
  5: "pending",
  6: "confirmed",
};

const initialRequests: EnrollmentRequest[] = [
  {
    id: "er_1",
    matchId: 6,
    userId: 20,
    userName: "Diego Fernández",
    position: "Defensor",
    status: "pending",
    requestedAt: "2026-03-13T12:00:00Z",
  },
  {
    id: "er_2",
    matchId: 6,
    userId: 21,
    userName: "Ana Martínez",
    position: "Mediocampista",
    status: "pending",
    requestedAt: "2026-03-13T11:30:00Z",
  },
];

export function MatchEnrollmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enrollments, setEnrollments] =
    useState<Record<number, EnrollmentStatus>>(initialEnrollments);
  const [requests, setRequests] =
    useState<EnrollmentRequest[]>(initialRequests);
  const [cancelledMatches, setCancelledMatches] = useState<Set<number>>(
    new Set()
  );
  const { addNotification } = useNotifications();

  const allMatches = useMemo(
    () => [...upcomingMatches, ...nearbyMatches],
    []
  );

  const getStatus = useCallback(
    (matchId: number): EnrollmentStatus => {
      if (cancelledMatches.has(matchId)) return "cancelled";
      return enrollments[matchId] ?? "none";
    },
    [enrollments, cancelledMatches]
  );

  const isCreator = useCallback(
    (matchId: number): boolean => {
      const match = allMatches.find((m) => m.id === matchId);
      return match?.createdBy?.id === CURRENT_USER.id;
    },
    [allMatches]
  );

  const isMatchCancelled = useCallback(
    (matchId: number): boolean => cancelledMatches.has(matchId),
    [cancelledMatches]
  );

  const requestEnrollment = useCallback(
    (matchId: number) => {
      if (cancelledMatches.has(matchId)) return;
      setEnrollments((prev) => ({ ...prev, [matchId]: "pending" }));

      const match = allMatches.find((m) => m.id === matchId);
      if (match?.createdBy) {
        addNotification({
          type: "enrollment_request",
          title: "Postulación enviada",
          message: `Te postulaste para ${match.title}. Esperando confirmación del organizador.`,
          read: true,
          data: { matchId },
        });

        addNotification({
          type: "enrollment_request",
          title: "Nueva postulación",
          message: `${CURRENT_USER.name} quiere unirse a ${match.title}`,
          read: false,
          data: { matchId, playerId: CURRENT_USER.id },
        });
      }
    },
    [allMatches, addNotification, cancelledMatches]
  );

  const cancelEnrollment = useCallback(
    (matchId: number) => {
      const currentStatus = enrollments[matchId] ?? "none";
      if (currentStatus === "none") return;

      const match = allMatches.find((m) => m.id === matchId);

      setEnrollments((prev) => {
        const next = { ...prev };
        delete next[matchId];
        return next;
      });

      if (!match) return;

      const commonData = { matchId };

      if (currentStatus === "pending") {
        addNotification({
          type: "enrollment_request",
          title: "Solicitud cancelada",
          message: `Cancelaste tu postulación a ${match.title}`,
          read: true,
          data: commonData,
        });
      } else if (currentStatus === "confirmed") {
        addNotification({
          type: "enrollment_update" as any,
          title: "Cancelaste tu participación",
          message: `Cancelaste tu participación en ${match.title}`,
          read: true,
          data: commonData,
        });
      }
    },
    [enrollments, allMatches, addNotification]
  );

  const cancelMatch = useCallback(
    (matchId: number) => {
      const match = allMatches.find((m) => m.id === matchId);
      if (!match) return;

      setCancelledMatches((prev) => new Set(prev).add(matchId));

      const matchRequests = requests.filter(
        (r) => r.matchId === matchId && (r.status === "pending" || r.status === "accepted")
      );
      for (const req of matchRequests) {
        addNotification({
          type: "match_cancelled",
          title: "Partido cancelado",
          message: `El partido "${match.title}" del ${match.date} a las ${match.time} fue cancelado por el organizador.`,
          read: false,
          data: { matchId, playerId: req.userId },
        });
      }

      const enrolledMatchIds = Object.entries(enrollments)
        .filter(([key]) => Number(key) === matchId)
        .map(([key]) => Number(key));

      if (enrolledMatchIds.length > 0) {
        addNotification({
          type: "match_cancelled",
          title: "Partido cancelado",
          message: `El partido "${match.title}" del ${match.date} a las ${match.time} fue cancelado por el organizador.`,
          read: false,
          data: { matchId },
        });
      }

      addNotification({
        type: "match_cancelled",
        title: "Cancelaste tu partido",
        message: `Cancelaste "${match.title}" del ${match.date} a las ${match.time}. Se notificó a todos los jugadores involucrados.`,
        read: true,
        data: { matchId },
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.matchId === matchId ? { ...r, status: "rejected" as const } : r
        )
      );
    },
    [allMatches, requests, enrollments, addNotification]
  );

  const getRequestsForMatch = useCallback(
    (matchId: number): EnrollmentRequest[] =>
      requests.filter((r) => r.matchId === matchId),
    [requests]
  );

  const acceptRequest = useCallback(
    (requestId: string) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "accepted" as const } : r
        )
      );

      const req = requests.find((r) => r.id === requestId);
      if (req) {
        const match = allMatches.find((m) => m.id === req.matchId);
        addNotification({
          type: "enrollment_accepted",
          title: "Jugador aceptado",
          message: `Aceptaste a ${req.userName} en ${match?.title ?? "tu partido"}`,
          read: true,
          data: { matchId: req.matchId, playerId: req.userId },
        });

        addNotification({
          type: "enrollment_accepted",
          title: "¡Te aceptaron!",
          message: `${CURRENT_USER.name} te aceptó en ${match?.title ?? "un partido"}`,
          read: false,
          data: { matchId: req.matchId },
        });
      }
    },
    [requests, allMatches, addNotification]
  );

  const rejectRequest = useCallback(
    (requestId: string) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "rejected" as const } : r
        )
      );

      const req = requests.find((r) => r.id === requestId);
      if (req) {
        const match = allMatches.find((m) => m.id === req.matchId);
        addNotification({
          type: "enrollment_rejected",
          title: "Jugador rechazado",
          message: `Rechazaste a ${req.userName} de ${match?.title ?? "tu partido"}`,
          read: true,
          data: { matchId: req.matchId, playerId: req.userId },
        });

        addNotification({
          type: "enrollment_rejected",
          title: "Postulación rechazada",
          message: `No fuiste aceptado en ${match?.title ?? "un partido"}`,
          read: false,
          data: { matchId: req.matchId },
        });
      }
    },
    [requests, allMatches, addNotification]
  );

  const pendingRequestCount = useCallback(
    (matchId: number): number =>
      requests.filter((r) => r.matchId === matchId && r.status === "pending")
        .length,
    [requests]
  );

  const value = useMemo(
    () => ({
      getStatus,
      isCreator,
      isMatchCancelled,
      requestEnrollment,
      cancelEnrollment,
      cancelMatch,
      getRequestsForMatch,
      acceptRequest,
      rejectRequest,
      pendingRequestCount,
    }),
    [
      getStatus,
      isCreator,
      isMatchCancelled,
      requestEnrollment,
      cancelEnrollment,
      cancelMatch,
      getRequestsForMatch,
      acceptRequest,
      rejectRequest,
      pendingRequestCount,
    ]
  );

  return (
    <MatchEnrollmentContext.Provider value={value}>
      {children}
    </MatchEnrollmentContext.Provider>
  );
}

export function useMatchEnrollment() {
  return useContext(MatchEnrollmentContext);
}
