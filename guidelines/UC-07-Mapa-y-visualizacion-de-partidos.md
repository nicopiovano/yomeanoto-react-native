# CU_07 - Mapa y visualización de partidos cercanos

## Objetivo

Mostrar en un mapa los partidos cercanos usando una solución web embebida (Leaflet + WebView) que no depende de builds nativas, y permitir navegar desde el mapa a la lista detallada de partidos.

## Actores

- **Actor primario**: Jugador.
- **Actores secundarios**:
  - Pantalla **Mapa** (`/(tabs)/map.tsx`).
  - `matchLocations` (mock de ubicaciones).

## Precondiciones

- El usuario está autenticado.
- El dispositivo tiene conexión a internet (para cargar tiles del mapa).
- Existen ubicaciones en `matchLocations` (`mocks/matches.ts`).

## Flujo principal

1. El usuario abre la pestaña **Mapa**.
2. El sistema renderiza un `WebView` que carga un HTML con Leaflet:
   - Fondo oscuro de CartoDB (`dark_all`).
   - Centro en coordenadas de Buenos Aires aprox.
   - Por cada `matchLocations` se crea un marker con popup que muestra:
     - Nombre de la cancha.
     - Cantidad de jugadores necesarios.
3. Sobre el mapa:
   - Header con título “Mapa” y botón de filtros (placeholder visual).
4. En la parte inferior:
   - Tarjeta con contador “Partidos cerca de ti”.
   - Botón “Ver lista” que navega a **Explorar partidos** (`/explore-matches`).
5. Botón flotante `+` abre la pantalla de **Crear partido** (`/create-match`).

## Flujos alternativos

- **F1 - Sin ubicaciones**  
  - Si `matchLocations` está vacío, el mapa se muestra sin markers; el contador mostraría 0. El flujo sigue siendo válido.

- **F2 - Error en WebView / sin internet**  
  - Si los tiles no cargan, el mapa puede verse vacío o con error visual; el resto de la UI (header, botón “Ver lista”, FAB) sigue operativa.

## Postcondiciones

- **Éxito**:
  - El usuario obtiene una vista geográfica de la oferta de partidos.
  - Puede saltar directamente a la lista de partidos o a la creación de uno nuevo.

- **Fracaso**:
  - Si el mapa no carga, la app sigue siendo usable; no afecta al resto de módulos.

## Notas de implementación / Backend Laravel

- Las coordenadas de `matchLocations` deberían generarse en backend:
  - Cada partido podría tener `lat`/`lng` persistidos.
  - Endpoint sugerido: `GET /matches/locations` (ya previsto en `matchService.getMatchLocations()`).
- A futuro, el mapa podría migrarse a `react-native-maps` + claves de Google Maps configuradas en `app.json` cuando se use un build nativo en lugar de Expo Go.***
