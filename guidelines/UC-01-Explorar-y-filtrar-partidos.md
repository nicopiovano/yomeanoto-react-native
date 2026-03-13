# CU_01 - Explorar y filtrar partidos

## Objetivo

Permitir que un jugador descubra partidos disponibles (cercanos o recomendados), los recorra en lista/carrusel y los filtre por tipo de cancha, género e intensidad, como paso previo a postularse o unirse.

## Actores

- **Actor primario**: Jugador registrado.
- **Actores secundarios**: 
  - Sistema de notificaciones (solo informa sobre partidos, no participa directamente en el flujo).

## Precondiciones

- El usuario tiene sesión iniciada en la app.
- El dispositivo tiene conexión a internet (en modo backend).
- Existen partidos cargados, ya sea:
  - Mock (`USE_MOCKS = true`): `upcomingMatches`, `nearbyMatches` en `mocks/matches.ts`.
  - Backend Laravel (`USE_MOCKS = false`): endpoints de `matchService` (`getUpcomingMatches`, `getNearbyMatches`, `getAllMatches`).

## Flujo principal

1. El jugador abre la app y llega a la pantalla **Inicio** (`/(tabs)/index.tsx`).
2. El sistema muestra:
   - Carrusel de **Próximos partidos** usando `FlatList` horizontal y `MatchCard`.
   - Lista **Partidos cerca** con `MatchCard` en forma vertical.
3. El jugador puede:
   - Tocar **Explorar partidos** → navegación a `/explore-matches`.
   - Tocar **Ver mapa** → navegación a `/map`.
4. En **Explorar partidos**:
   - El sistema carga todos los partidos (`upcomingMatches + nearbyMatches` o `getAllMatches()`).
   - Muestra chips de filtros por **Tipo**, **Género** e **Intensidad**.
5. El jugador ajusta filtros; la lista se actualiza en memoria (sin llamadas extra si `USE_MOCKS = true`).
6. El jugador toca una card (`MatchCard`); el sistema navega a `/match-detail?id={id}` para ver el detalle y eventualmente postularse.

## Flujos alternativos

- **F1 - Sin resultados para los filtros**  
  1. El jugador aplica filtros muy restrictivos.  
  2. La lista queda vacía.  
  3. El sistema muestra mensaje de vacío sugeriendo relajar filtros.  
  4. El jugador puede limpiar filtros con el botón “Limpiar”.

- **F2 - Error de red (modo backend)**  
  1. `getAllMatches()` o llamados a `/matches` fallan.  
  2. El sistema debe manejar el error (toast / mensaje) y mantener la UI en estado estable (actualmente responsabilidad del consumidor del servicio, no implementado aún).

## Postcondiciones

- **Éxito**:
  - El usuario comprende la oferta de partidos y, si lo desea, ingresa al detalle de uno.
  - No se modifica nada en el backend; es un flujo solo de lectura.
- **Fracaso**:
  - Si falla la red, el usuario ve la UI sin datos o con datos cache/mocks; el sistema permanece consistente y navegable.

## Notas de implementación / Backend Laravel

- `matchService.ts` debe mapear:
  - `getUpcomingMatches()` → `GET /matches/upcoming`
  - `getNearbyMatches()` → `GET /matches/nearby`
  - `getAllMatches()` → `GET /matches`
- Los filtros en `/explore-matches` hoy se aplican **en cliente** sobre todos los partidos; más adelante se pueden llevar al backend usando query params (ej. `GET /matches?type=Fútbol+7&gender=Mixto&intensity=Media`).***
