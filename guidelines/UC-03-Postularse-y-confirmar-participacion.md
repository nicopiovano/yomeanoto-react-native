# CU_03 - Postularse y confirmar participación en un partido

## Objetivo

Gestionar el flujo completo en el que un jugador se postula a un partido y el organizador acepta o rechaza esa postulación, incluyendo el reflejo visual en las cards y las notificaciones asociadas.

## Actores

- **Actor primario A**: Jugador que quiere unirse a un partido.
- **Actor primario B**: Organizador del partido.
- **Actores secundarios**:
  - Contexto `MatchEnrollmentContext`.
  - Servicio de partidos (`matchService`, para integración futura).
  - Contexto de notificaciones (`NotificationContext`).

## Precondiciones

- El usuario está autenticado.
- Existen partidos configurados en `mocks/matches.ts` con:
  - `createdBy` asignado (para distinguir organizador).
  - `maxPlayers`, `currentPlayers`.
- `MatchEnrollmentProvider` está montado en `_layout.tsx` alrededor del árbol de navegación.

## Flujo principal A - Jugador se postula a un partido

1. El jugador abre el **detalle de un partido** (`/match-detail?id={id}`).
2. El sistema obtiene el estado de inscripción vía `useMatchEnrollment().getStatus(id)`:
   - Inicialmente suele ser `"none"`.
3. El jugador toca el botón **“Postularme”**.
4. El sistema ejecuta `requestEnrollment(matchId)`:
   - Actualiza el estado interno de `enrollments[matchId]` a `"pending"`.
   - Envía dos notificaciones:
     - Para el propio jugador: “Postulación enviada” (read: true).
     - Para el organizador: “Nueva postulación” (read: false, con `matchId`).
5. El detalle del partido actualiza la UI:
   - El botón pasa a mostrar “Esperando confirmación”.
   - Las cards (`MatchCard`) muestran el estado “Esperando confirmación” en home, explorar y mis partidos.

## Flujo principal B - Organizador acepta o rechaza

1. El organizador abre el detalle del partido que organizó.
2. El sistema:
   - Detecta que es creador vía `isCreator(matchId)`.
   - Obtiene cantidad de solicitudes pendientes con `pendingRequestCount(matchId)`.
3. El organizador toca **“Solicitudes (N)”**:
   - Se abre `EnrollmentRequestsModal` con la lista de `EnrollmentRequest`.
4. Para cada solicitud:
   - Puede tocar **“Aceptar”**:
     - `acceptRequest(requestId)` marca la solicitud como `accepted`.
     - Envía 2 notificaciones:
       - Para el organizador: “Jugador aceptado”.
       - Para el postulante: “¡Te aceptaron!” (`enrollment_accepted` con `matchId`).
   - O tocar **“Rechazar”**:
     - `rejectRequest(requestId)` la marca como `rejected`.
     - Envía 2 notificaciones:
       - Para el organizador: “Jugador rechazado”.
       - Para el postulante: “Postulación rechazada” (`enrollment_rejected`).
5. El estado de las cards y del botón en el detalle se actualiza según el nuevo `EnrollmentStatus`:
   - `"confirmed"` → badge y botón verde **Confirmado**.
   - `"rejected"` → mensaje **No aceptado**.

## Flujos alternativos

- **F1 - Usuario intenta postularse dos veces**  
  1. El estado ya es `"pending"` o `"confirmed"`.  
  2. `requestEnrollment` no debería volver a generar solicitudes (actualmente controlado por UI, que deshabilita el botón cuando no está en `"none"`).

- **F2 - Notificaciones no disponibles (backend)**  
  - Si el backend de notificaciones está caído, el contexto podría seguir almacenando notificaciones locales y, cuando se reconecte, sincronizar con el servidor.

## Postcondiciones

- **Éxito**:
  - El jugador tiene un estado claro (pendiente, confirmado, rechazado) visible en:
    - Botón del detalle de partido.
    - Badges y textos en las `MatchCard`.
  - El organizador ve y gestiona solicitudes desde un solo lugar.
  - Las notificaciones quedan registradas en el contexto para ambos actores.

- **Fracaso**:
  - Si el backend falla al aplicar la decisión, el estado local podría no coincidir; para producción será necesario:
    - Persistir estados en Laravel.
    - Leer siempre el estado real del servidor al entrar al detalle.

## Notas de implementación / Backend Laravel

- Se recomienda modelar en backend:
  - Entidad `MatchEnrollment` (match_id, user_id, status, created_at, updated_at).
  - Endpoints:
    - `POST /matches/{id}/enroll` (postulación).
    - `POST /enrollments/{id}/respond` (aceptar/rechazar).
  - El contexto `MatchEnrollmentContext` debería, en modo producción, delegar estas operaciones a `matchService` (`requestMatchEnrollment`, `respondToEnrollment`) en lugar de solo modificar estado en memoria.***
