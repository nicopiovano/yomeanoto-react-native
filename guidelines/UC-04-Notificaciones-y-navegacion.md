# CU_04 - Notificaciones y navegación contextual

## Objetivo

Centralizar la comunicación con el jugador a través de un panel de notificaciones que indique recordatorios, invitaciones, cambios de estado y solicitudes, y que al tocar cada item lleve directamente al módulo correspondiente (detalle de partido, comunidad, etc.).

## Actores

- **Actor primario**: Jugador (organizador o participante).
- **Actores secundarios**:
  - `NotificationContext` (estado global).
  - `NotificationPanel` (UI de modal).
  - Distintas pantallas de destino: `match-detail`, `community`, `friends` (futuro).

## Precondiciones

- `NotificationProvider` está envolviendo al árbol de navegación en `_layout.tsx`.
- Existen notificaciones (mock) definidas en `mocks/notifications.ts`.
- El ícono de campana en Home se muestra y abre el panel (`NotificationPanel`).

## Flujo principal

1. El jugador está en Home y toca el ícono de **campana**.
2. El sistema abre `NotificationPanel` como modal tipo bottom-sheet.
3. El panel muestra:
   - Lista de notificaciones en orden descendente por `createdAt`.
   - Icono y color según tipo (`match_reminder`, `player_invite`, `team_request`, `enrollment_*`, `system`).
   - Distinción visual entre leídas y no leídas.
4. El jugador toca una notificación:
   - El sistema llama `handlePressNotification(id, type, data)`:
     1. Marca la notificación como leída (`markAsRead`).
     2. Evalúa `type` y `data`:
        - Si `data.matchId` existe → `router.push("/match-detail?id={matchId}")`.
        - Si `type === "team_request"` → `router.push("/community")`.
        - Otros tipos sin `matchId` por ahora solo marcan leído (quedan listos para rutas futuras).
     3. Cierra el panel (`onClose`) si hay navegación.

## Flujos alternativos

- **F1 - Leer todas**  
  1. El usuario toca “Leer todas”.  
  2. El sistema ejecuta `markAllAsRead()` en el contexto.  
  3. Se actualiza el badge de no leídas en la campana y el estilo en el panel.

- **F2 - Sin notificaciones**  
  1. `notifications` está vacío.  
  2. El panel muestra mensaje “No tenés notificaciones”.

## Postcondiciones

- **Éxito**:
  - El usuario siempre tiene un acceso centralizado a eventos relevantes.
  - Cada tipo de notificación lo lleva al contexto adecuado (partido, comunidad).
  - El contador de no leídas en el header se mantiene consistente con lo visto en el panel.

- **Fracaso**:
  - Si por alguna razón `router.push` falla, la notificación igual queda marcada como leída; el sistema debería manejar errores de navegación (no implementado aún).

## Notas de implementación / Backend Laravel

- `notificationService.ts` define contratos para:
  - `getNotifications`, `markNotificationAsRead`, `markAllNotificationsAsRead`, `sendPlayerInvite`, `registerPushToken`.
- En producción:
  - Las notificaciones deberían venir del backend (`GET /notifications`).
  - Marcar leído debería invocar `PATCH /notifications/{id}`.
  - `data.matchId`, `data.teamId`, `data.playerId` deben alinear IDs con la base real (matches, teams, users) para que la navegación sea coherente.***
