# CU_06 - Gestión de jugadores cercanos y amigos

## Objetivo

Permitir que el usuario descubra jugadores cercanos, los invite a partidos, acepte o rechace solicitudes, y gestione una lista de amigos con posibilidad de chatear via WhatsApp.

## Actores

- **Actor primario**: Jugador autenticado.
- **Actores secundarios**:
  - Pantalla **Jugadores** (`/(tabs)/players.tsx`).
  - Pantalla **Amigos** (`/friends.tsx`).
  - `friendService`, `NotificationContext`.

## Precondiciones

- El usuario está autenticado.
- Existen datos mock en `mocks/players.ts`:
  - `nearbyPlayers`, `friends`, `playerRequests`.
- En modo backend existirán endpoints de amigos y jugadores (ver más abajo).

## Flujo principal A - Explorar jugadores e invitarlos

1. El usuario abre la pestaña **Jugadores**.
2. El sistema muestra tabs:
   - “Cercanos”: `nearbyPlayers`.
   - “Amigos”: `friends`.
   - “Solicitudes”: `playerRequests`.
3. Cada `PlayerCard` muestra botón **“Invitar”** (o “Enviado” si ya se invitó).
4. Al tocar “Invitar”:
   - `handleInvite` añade el id del jugador a `invitedIds`.
   - Envía notificación `player_invite`:
     - Título: “Invitación enviada”.
     - Mensaje: `Invitaste a {playerName} a unirse a un partido`.

## Flujo principal B - Gestionar amigos

1. Desde la pestaña “Más”, el usuario entra en **Amigos** (`/friends`).
2. La pantalla solicita:
   - `getFriends()` → lista de amigos actuales.
   - `getFriendSuggestions()` → sugerencias basadas en cercanía (mock: `nearbyPlayers`).
3. En sección **Tus amigos**:
   - Cada amigo se muestra con `PlayerCard` y dos botones:
     - **Chatear por WhatsApp**:
       - Construye una URL `https://wa.me/{phone}?text=...` (phone mock, luego real).
     - **Eliminar vínculo**:
       - Muestra alerta de confirmación.
       - Si se confirma:
         - Llama a `removeFriend(playerId)` (mock/backend).
         - Remueve el amigo del estado local.
         - Envía notificación `system` “Amigo eliminado”.
4. En sección **Jugadores que quizá conozcas**:
   - Lista de `suggestions`.
   - Botón “Invitar” reutilizado como **“Agregar amigo”**:
     - Llama a `addFriend(playerId)`.
     - Agrega el jugador a `friends`.
     - Envía notificación `player_invite` “Nuevo amigo”.

## Flujos alternativos

- **F1 - Duplicar amistad**  
  - Si el jugador ya está en `friends`, el handler de agregar amigo corta y no duplica la entrada.

## Postcondiciones

- **Éxito**:
  - El usuario mantiene su red de amigos actualizada.
  - Se pueden iniciar conversaciones por WhatsApp con un toque.
  - Las invitaciones y cambios de amistad quedan reflejados como notificaciones.

- **Fracaso**:
  - Si el backend falla, la lógica actual sigue siendo local; en producción habrá que sincronizar el estado real del servidor con el contexto local (re-cargar `getFriends()` tras operaciones).

## Notas de implementación / Backend Laravel

- Endpoints recomendados:
  - `GET /players/nearby` → para `nearbyPlayers`.
  - `GET /friends` → `getFriends`.
  - `GET /friends/suggestions` → `getFriendSuggestions`.
  - `POST /friends` (body `{ playerId }`) → `addFriend`.
  - `DELETE /friends/{playerId}` → `removeFriend`.
- Los teléfonos de los usuarios para WhatsApp deben ser provistos por el backend (atributo adicional en el modelo de usuario o jugador).***
