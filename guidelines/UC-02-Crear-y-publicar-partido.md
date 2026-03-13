# CU_02 - Crear y publicar partido

## Objetivo

Permitir que un jugador organice un nuevo partido, definiendo datos básicos (cancha, fecha, hora, tipo, nivel, género, precio) y lo deje disponible para que otros usuarios se postulen.

## Actores

- **Actor primario**: Organizador (jugador autenticado).
- **Actores secundarios**:
  - Servicio de partidos (`matchService`).
  - Sistema de notificaciones (envía notificación local de “Partido creado”).

## Precondiciones

- El usuario está autenticado.
- La app puede navegar a `/create-match` desde:
  - Botón **“Crear partido”** en Home.
  - FAB `+` en la pantalla **Mapa**.
- En modo backend:
  - Existe endpoint `POST /matches` en Laravel.

## Flujo principal

1. El jugador abre la pantalla **Crear partido** (`/create-match.tsx`).
2. El sistema muestra formulario con secciones:
   - Datos básicos: nombre de cancha, ubicación.
   - Fecha y horario: campos de texto con íconos `Calendar` y `Clock`.
   - Detalles del partido: tipo de cancha, género, intensidad, jugadores faltantes, precio por jugador.
3. El jugador completa los campos obligatorios (mínimo: nombre y ubicación).
4. El jugador toca **“Publicar partido”**.
5. El sistema valida:
   - Si faltan nombre o ubicación, muestra alerta de “Datos incompletos”.
6. Si la validación pasa:
   - llama a `createMatch(payload)` en `matchService`.
   - En modo mock (`USE_MOCKS = true`): no persiste, solo simula.
   - En modo backend: envía `POST /matches` con el payload.
7. Al completar la llamada:
   - El sistema agrega una notificación tipo `match_update` con título “Partido creado”.
   - Muestra alerta confirmando la creación.

## Flujos alternativos

- **F1 - Datos incompletos**  
  1. El usuario toca “Publicar partido” sin completar nombre o ubicación.  
  2. El sistema muestra alerta de validación y NO llama al backend.

- **F2 - Error al crear partido (backend)**  
  1. `POST /matches` responde con error.  
  2. El sistema debería (a futuro) mostrar mensaje de error y permitir reintentar; actualmente la implementación mock asume éxito.

## Postcondiciones

- **Éxito**:
  - En modo backend: se creó un nuevo registro de partido en Laravel.
  - El organizador ve confirmación y una notificación local de creación.
- **Fracaso**:
  - Si falla la validación o la red, el formulario mantiene los datos ya cargados y el sistema queda en estado estable.

## Notas de implementación / Backend Laravel

- `matchService.createMatch(payload)` mapea a `POST ${API_URL}/matches`.  
- El backend debe:
  - Asignar `createdBy` al usuario actual (id, nombre, username).
  - Inicializar `maxPlayers`, `currentPlayers` y otros campos derivados.
  - Integrarse con el sistema de notificaciones/push del servidor (los mocks actuales solo cubren la capa cliente).***
