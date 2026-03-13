import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Player } from "@/mocks/players";
import { friends as mockFriends } from "@/mocks/players";

export interface PlayerList {
  id: number;
  name: string;
  players: Player[];
}

export interface MyTeam {
  id: number;
  name: string;
  role: string;
  members: Player[];
  nextMatch: string | null;
  wins: number;
  draws: number;
  losses: number;
}

interface PlayerListsContextValue {
  lists: PlayerList[];
  teams: MyTeam[];
  createList: (name: string) => void;
  deleteList: (id: number) => void;
  addPlayerToList: (listId: number, player: Player) => void;
  removePlayerFromList: (listId: number, playerId: number) => void;
  addPlayerToTeam: (teamId: number, player: Player) => void;
  removePlayerFromTeam: (teamId: number, playerId: number) => void;
  isPlayerInList: (listId: number, playerId: number) => boolean;
  isPlayerInTeam: (teamId: number, playerId: number) => boolean;
}

const PlayerListsContext = createContext<PlayerListsContextValue | null>(null);

const byId = (id: number) => mockFriends.find((f) => f.id === id)!;

const initialLists: PlayerList[] = [
  { id: 1, name: "Amigos de futsal", players: [byId(101), byId(102), byId(103), byId(104), byId(105)] },
  { id: 2, name: "Compañeros de trabajo", players: [byId(106), byId(107), byId(108)] },
  { id: 3, name: "Equipo del barrio", players: [byId(109), byId(110), byId(111), byId(112)] },
];

const initialTeams: MyTeam[] = [
  {
    id: 1,
    name: "Los Leones FC",
    role: "Capitán",
    members: [byId(101), byId(102), byId(103), byId(109), byId(6), byId(7), byId(110)],
    nextMatch: "Sábado 22 Mar • 18:00",
    wins: 8,
    draws: 2,
    losses: 3,
  },
  {
    id: 2,
    name: "Equipo del Trabajo",
    role: "Jugador",
    members: [byId(106), byId(107), byId(108), byId(104), byId(105), byId(111), byId(112)],
    nextMatch: "Domingo 23 Mar • 16:00",
    wins: 5,
    draws: 3,
    losses: 5,
  },
  {
    id: 3,
    name: "FC Barrio Norte",
    role: "Jugador",
    members: [byId(109), byId(110), byId(111), byId(112), byId(101), byId(102), byId(103), byId(104), byId(105), byId(6)],
    nextMatch: null,
    wins: 12,
    draws: 1,
    losses: 2,
  },
];

export function PlayerListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<PlayerList[]>(initialLists);
  const [teams, setTeams] = useState<MyTeam[]>(initialTeams);

  const createList = useCallback((name: string) => {
    setLists((prev) => [...prev, { id: Date.now(), name, players: [] }]);
  }, []);

  const deleteList = useCallback((id: number) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const addPlayerToList = useCallback((listId: number, player: Player) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        if (list.players.some((p) => p.id === player.id)) return list;
        return { ...list, players: [...list.players, player] };
      })
    );
  }, []);

  const removePlayerFromList = useCallback((listId: number, playerId: number) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        return { ...list, players: list.players.filter((p) => p.id !== playerId) };
      })
    );
  }, []);

  const addPlayerToTeam = useCallback((teamId: number, player: Player) => {
    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== teamId) return team;
        if (team.members.some((p) => p.id === player.id)) return team;
        return { ...team, members: [...team.members, player] };
      })
    );
  }, []);

  const removePlayerFromTeam = useCallback((teamId: number, playerId: number) => {
    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== teamId) return team;
        return { ...team, members: team.members.filter((p) => p.id !== playerId) };
      })
    );
  }, []);

  const isPlayerInList = useCallback(
    (listId: number, playerId: number) => {
      const list = lists.find((l) => l.id === listId);
      return list?.players.some((p) => p.id === playerId) ?? false;
    },
    [lists]
  );

  const isPlayerInTeam = useCallback(
    (teamId: number, playerId: number) => {
      const team = teams.find((t) => t.id === teamId);
      return team?.members.some((p) => p.id === playerId) ?? false;
    },
    [teams]
  );

  return (
    <PlayerListsContext.Provider
      value={{
        lists,
        teams,
        createList,
        deleteList,
        addPlayerToList,
        removePlayerFromList,
        addPlayerToTeam,
        removePlayerFromTeam,
        isPlayerInList,
        isPlayerInTeam,
      }}
    >
      {children}
    </PlayerListsContext.Provider>
  );
}

export function usePlayerLists() {
  const ctx = useContext(PlayerListsContext);
  if (!ctx) throw new Error("usePlayerLists must be used within PlayerListsProvider");
  return ctx;
}
