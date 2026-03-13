# Resumen de casos de uso de FAP (mobile)

Esta carpeta documenta los principales casos de uso funcionales de la app FAP (versión mobile con Expo Router y React Native), pensados para que el backend en Laravel pueda alinearse fácilmente con los flujos existentes.

## Lista de casos de uso

- **CU_01 - Explorar y filtrar partidos**  
  Descubrir partidos desde Home, ver carrusel de próximos y lista de cercanos, navegar a Explorar y aplicar filtros por tipo, género e intensidad.

- **CU_02 - Crear y publicar partido**  
  Organizar un nuevo partido desde la app, definir sus parámetros (cancha, fecha, hora, tipo, nivel, género, precio) y dejarlo disponible para postulaciones.

- **CU_03 - Postularse y confirmar participación en un partido**  
  Gestionar el ciclo de vida de la participación: el jugador se postula, el organizador acepta o rechaza, y la UI refleja el estado (confirmado, esperando, rechazado).

- **CU_04 - Notificaciones y navegación contextual**  
  Centralizar recordatorios, invitaciones y cambios de estado en un panel de notificaciones que redirige al módulo correspondiente (detalle de partido, comunidad, etc.).

- **CU_05 - Comunidad: torneos y equipos cercanos**  
  Ver torneos y equipos cercanos, inscribir un equipo a un torneo y solicitar unirse a equipos, dejando rastro en notificaciones.

- **CU_06 - Gestión de jugadores cercanos y amigos**  
  Navegar jugadores cercanos, invitarlos a partidos, gestionar amigos (agregar, eliminar) y chatear con ellos por WhatsApp.

- **CU_07 - Mapa y visualización de partidos cercanos**  
  Ver los partidos sobre un mapa oscuro (Leaflet en WebView), con markers y acceso rápido a la lista y a la creación de nuevos partidos.

Cada archivo `UC-XX-*.md` detalla para ese flujo:

- Objetivo del caso de uso.
- Actores involucrados.
- Precondiciones.
- Flujo principal.
- Flujos alternativos relevantes.
- Postcondiciones.
- Notas de implementación pensadas para el backend Laravel.

Esta documentación debe mantenerse sincronizada cuando se añadan nuevos módulos o se cambien los endpoints del backend.***
