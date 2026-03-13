# CU_05 - Comunidad: torneos y equipos cercanos

## Objetivo

Permitir que los jugadores descubran torneos y equipos cercanos, se inscriban con su equipo a un torneo y soliciten unirse a equipos, dejando trazabilidad a través de notificaciones.

## Actores

- **Actor primario A**: Capitán / representante de equipo (para torneos).
- **Actor primario B**: Jugador individual (para equipos cercanos).
- **Actores secundarios**:
  - `CommunityScreen` (`/(tabs)/community.tsx`).
  - `TournamentDetailModal`, `TournamentCard`, `TeamCard`.
  - `NotificationContext`.

## Precondiciones

- El usuario está autenticado.
- Existen datos mock:
  - Torneos en `mocks/tournaments.ts`.
  - Equipos en `mocks/teams.ts`.
- En modo backend existirán endpoints equivalentes (no implementados aún en services).

## Flujo principal A - Inscribirse a un torneo

1. El jugador abre la pestaña **Comunidad**.
2. El sistema muestra sección **Torneos cercanos** con `TournamentCard`.
3. El jugador toca “Ver detalles” en un torneo:
   - Se abre `TournamentDetailModal` con:
     - Datos básicos (nombre, ubicación, fecha, equipos).
     - Descripción, formato, inscripción, premio.
4. El jugador toca **“Inscribir mi equipo”**.
5. El sistema:
   - Marca el torneo como `enrolled` (estado local, `enrolledTournamentIds`).
   - Envía notificación `system` con título “Inscripción confirmada”.
   - Muestra alerta “Inscripción enviada”.

## Flujo principal B - Solicitar unirse a un equipo

1. En la misma pantalla, el usuario ve la sección **Equipos cercanos**.
2. Cada `TeamCard` muestra botón:
   - “Solicitar unirse” si aún no se solicitó.
   - “Solicitado” si el id está en `joinedTeamIds`.
3. Al tocar “Solicitar unirse”:
   - El sistema agrega el id del equipo a `joinedTeamIds`.
   - Envía notificación `team_request`:
     - Título: “Solicitud enviada”.
     - Mensaje: `Solicitaste unirte a {teamName}`.
   - (A futuro, esta notificación debería llegar al administrador del equipo vía backend).

## Flujos alternativos

- **F1 - Repetir solicitud a mismo equipo**  
  - Si el usuario vuelve a tocar sobre un equipo ya solicitado, el botón está deshabilitado (`joined = true`), evitando duplicar solicitudes.

## Postcondiciones

- **Éxito**:
  - El torneo queda marcado visualmente como inscripto.
  - El jugador tiene feedback en la UI y en el panel de notificaciones.
  - Las solicitudes a equipos quedan reflejadas como “Solicitado”.

- **Fracaso**:
  - En un escenario con backend, si el servidor rechaza la inscripción o solicitud, habría que revertir el estado local y mostrar un mensaje (no implementado aún).

## Notas de implementación / Backend Laravel

- Se recomienda modelar:
  - `TournamentRegistration` (team_id, tournament_id, status).
  - `TeamJoinRequest` (user_id, team_id, status).
- Posibles endpoints:
  - `POST /tournaments/{id}/register`.
  - `POST /teams/{id}/join-requests`.
  - `GET /tournaments`, `GET /teams` para alimentar las secciones.***
