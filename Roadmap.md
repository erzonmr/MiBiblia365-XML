# Roadmap del Proyecto
## Mi Biblia 365
### Plataforma Web tipo App sobre Blogger (XML)

> Hoja de ruta de desarrollo, de la validación inicial hasta la expansión con backend.
> Versión 2.1 — Estrategia dual de APIs bíblicas en español. Abril 2026.

---

## Resumen del roadmap

| Fase | Nombre | Entregable |
|---|---|---|
| **Fase 0** | Validación y preparación | Pruebas de API + repo + activos base |
| **Fase 1** | Base del sitio | Plantilla XML + navegación + páginas estáticas |
| **Fase 2** | Lectura diaria | API funcional + Leer hoy + Planes |
| **Fase 3** | Lógica personal | localStorage + Mi espacio + respaldo |
| **Fase 4** | Exploración bíblica | Biblia libre + Buscador + Plan completo |
| **Fase 5** | Pulido y lanzamiento | Modo oscuro + SEO + QA + lanzamiento |
| **Fase 6** | Backend y sincronización | Supabase + cuentas + sync multi-dispositivo |


---

## Principios del roadmap

1. **Entregar valor en cada fase.** Al final de cada fase debe haber algo usable.
2. **Validar antes de construir.** Fase 0 existe para no descubrir problemas en Fase 3.
3. **Mobile first siempre.** Cada fase se prueba primero en móvil.
4. **Datos estables antes de publicar.** Los JSON se validan antes de subirse a GitHub.
5. **Iterar con feedback real.** Después de Fase 2, usar el sitio personalmente antes de seguir.
6. **No optimizar antes de tiempo.** Backend solo cuando se justifique.
7. **Foco en lectura bíblica pura.** No se integran comentarios ni datasets de la API en el producto inicial, aunque la Free Use Bible API los ofrezca.
8. **Tareas manuales.** Si surgen tareas que se deban realizar de manera manual, se debe dejar registro e instrucciones claras en el archivo `Instrucciones.md`. 
9. **XML de Trabajo.** Dentro del repositorio está el archivo `template - ZIA.xml`, ese es el archivo XML donde se va a trabajar. Este será el archivo que se subirá a Blogger.  

---

# FASE 0 — Validación y preparación

**Objetivo:** confirmar que las decisiones técnicas funcionan en la práctica antes de comprometer tiempo en la plantilla XML.

## Tareas

### 0.1 Validación de APIs bíblicas (doble fuente)
- [ ] Crear archivo HTML de prueba local (`test-api.html`).
- [ ] Consumir `GET https://bible.helloao.org/api/available_translations.json`.
- [ ] Consumir `GET https://docs-bible-api.netlify.app/api/versions`.
- [ ] Filtrar en JS las traducciones con idioma español (`language: "spa"` o equivalente según el esquema real).
- [ ] Documentar el listado de versiones en español disponibles (esperadas: al menos una Reina Valera de dominio público y algunas modernas).
- [ ] Consumir libros/capítulos en ambas APIs para una versión española y verificar estructura.
- [ ] Verificar tiempo de respuesta (objetivo: < 1 segundo por capítulo).
- [ ] Confirmar soporte CORS desde dominio externo (Blogger / localhost).
- [ ] Documentar el **esquema real del JSON de capítulo**: cómo vienen los versículos, notas al pie, formato, encabezados de sección.
- [ ] Probar caché del navegador en llamadas repetidas.
- [ ] Probar el endpoint `/complete.json` de una traducción para evaluar peso y uso futuro en el buscador.

**Criterio de éxito:** se pueden cargar capítulos en al menos 2 versiones en español desde navegador común, usando fallback entre APIs cuando sea necesario.

### 0.2 Curaduría inicial de versiones en español
- [ ] A partir de `available_translations.json` + `/versions`, seleccionar el subconjunto final de versiones que se ofrecerán.
- [ ] Criterio: priorizar versiones ampliamente usadas en contextos evangélicos hispanos.
- [ ] Incluir una versión **Reina Valera** disponible en la API como predeterminada.
- [ ] Documentar el ID exacto de cada versión (`id`, `name`, `shortName`, `language`) como aparece en la API.
- [ ] Construir el primer borrador de `versions.json` (formato definido en brief sección 15.1).

**Criterio de éxito:** hay al menos 3 versiones en español confirmadas, con sus IDs reales validados contra la API.

### 0.3 Setup del repositorio GitHub
- [x] Crear repo público: `MiBiblia365-XML`. (Link del repo: `https://github.com/erzonmr/MiBiblia365-XML`)
- [ ] Estructura de carpetas base (`json/`, `CDN/css/`, `CDN/js/`).
- [ ] README inicial con propósito del repo.
- [ ] Licencia (sugerido: MIT para el código).
- [ ] Aclarar en README que el texto bíblico se consume desde **Free Use Bible API** y **Bible API Docs Netlify App**, ambas para versiones en español.
- [ ] Nota explícita en el README: "Este proyecto no modifica el contenido de las traducciones bíblicas."

### 0.4 Validación de jsDelivr
- [ ] Subir un `test.json` al repo.
- [ ] Acceder vía `https://cdn.jsdelivr.net/gh/USUARIO/REPO@main/test.json`.
- [ ] Verificar tiempo de respuesta.
- [ ] Probar comportamiento de caché tras modificar el archivo.
- [ ] Documentar estrategia de invalidación (tags vs commits).

### 0.5 Activos visuales base
- [ ] Definir paleta de colores del proyecto (sugerido: azul profundo + dorado suave + crema).
- [ ] Elegir tipografía principal (sugerido: Inter, Nunito o Poppins).
- [ ] Crear logo/ícono base.
- [x] Generar favicon en múltiples tamaños (Servidas desde Postimg `https://postimg.cc/`):
  - [x] `favicon.ico` (32×32). (`https://i.postimg.cc/FRX2rRWT/favicon.png`)
  - [x] `favicon-192.png` (192×192). (`https://i.postimg.cc/K8X7sM1S/icon-192.png`)
  - [x] `favicon-512.png` (512×512). (`https://i.postimg.cc/qvXKbZff/icon-512.png`)
  - [x] `apple-touch-icon.png` (180×180). (`https://i.postimg.cc/yx6MC7Zr/apple-touch-icon.png`)
- [ ] Crear moodboard visual (referencia para toda la UI).

### 0.6 Creación del blog en Blogger
- [x] Crear blog nuevo en Blogger con dominio propio. Dominio: `www.mibiblia365.com`
- [x] Configurar zona horaria, idioma (español), región.
- [x] Desactivar comentarios en páginas.
- [ ] Configurar opciones de búsqueda y meta descripciones.
- [x] Crear las páginas estáticas vacías (sin contenido, solo estructura):
  - [x] `/p/leer-hoy.html`
  - [x] `/p/planes.html`
  - [x] `/p/plan-completo.html`
  - [x] `/p/biblia.html`
  - [x] `/p/buscar.html`
  - [x] `/p/mi-espacio.html`
  - [x] `/p/acerca.html`
  - [x] `/p/preguntas-frecuentes.html`
  - [x] `/p/instalar.html`

### 0.7 JSON iniciales
- [ ] Subir `versions.json` (subconjunto curado desde `available_translations.json`).
- [ ] Crear `plans.json` con catálogo de planes previstos.
- [ ] Crear `config.json` con valores por defecto (incluyendo `defaultTranslationId` y `leapYearMode`).
- [ ] Subir a GitHub y validar acceso por jsDelivr. **Nota:** Verificar carpeta `json/`, ahí dentro están los .json de los planes y los versículos diarios.  

## Entregables Fase 0
- Repositorio GitHub inicial operativo.
- JSON base servidos por jsDelivr.
- Blog en Blogger con páginas estáticas creadas.
- Íconos y paleta visual definida.
- Pruebas de ambas APIs bíblicas documentadas y funcionando.
- Lista definitiva de versiones en español seleccionadas.

## Checklist de salida Fase 0
- [ ] El flujo dual de APIs responde correctamente para al menos 3 versiones en español.
- [ ] El esquema del JSON de capítulo está documentado.
- [ ] jsDelivr entrega los JSON sin problemas.
- [ ] Blogger tiene la estructura de páginas lista.
- [ ] El diseño visual tiene dirección clara.

---

# FASE 1 — Base del sitio

**Objetivo:** tener la plantilla XML funcionando con navegación, layout y páginas estáticas.

## Tareas

### 1.1 Plantilla XML base
- [x] Crear estructura mínima del XML de Blogger. El XML base es este: `template - ZIA.xml`.
- [ ] Configurar `<head>` con meta-tags esenciales.
- [ ] Incluir meta-tags de instalación tipo app (`apple-mobile-web-app-capable`, etc.).
- [ ] Agregar Open Graph y Twitter Cards.
- [ ] Configurar favicon y apple-touch-icon.
- [ ] Preparar puntos de inserción de CSS y JS externos.
- [ ] Incluir preconnect a `https://bible.helloao.org` y `https://docs-bible-api.netlify.app`.

### 1.2 Sistema de diseño (design tokens)
- [ ] Definir CSS variables en `:root` (colores, espaciados, tipografías).
- [ ] Crear `base.css` con reset y estilos base.
- [ ] Crear `layout.css` con grid principal.
- [ ] Crear `components.css` para elementos reutilizables.
- [ ] Preparar `dark-mode.css` (aunque no se active en esta fase).

### 1.3 Header y navegación
- [ ] Header con logo y nombre del proyecto.
- [ ] Menú principal para escritorio.
- [ ] Barra inferior fija para móvil (5 items clave).
- [ ] Indicador visual de página activa.
- [ ] Comportamiento responsive (break-point móvil vs escritorio).

### 1.4 Footer
- [ ] Footer minimalista con enlaces a Acerca y FAQ.
- [ ] Versículo rotativo como cierre espiritual (opcional).
- [ ] Créditos y año.
- [ ] Crédito discreto a **Free Use Bible API** como fuente del texto bíblico.

### 1.5 Páginas estáticas
- [ ] **Inicio (`/`):** hero + botón "Leer hoy" + placeholder de versículo diario + CTAs.
- [ ] **Acerca (`/p/acerca.html`):** propósito, visión espiritual, cómo funciona, mención de la fuente del texto bíblico.
- [ ] **FAQ (`/p/preguntas-frecuentes.html`):** preguntas clave definidas en brief (incluyendo "¿De dónde viene el texto bíblico?").
- [ ] **Instalar (`/p/instalar.html`):** guía para Android, iOS, Windows, Mac.

### 1.6 Ocultar elementos de Blogger
- [ ] Ocultar Navbar de Blogger.
- [ ] Eliminar/ocultar widgets por defecto.
- [ ] Desactivar comentarios y atribución automática.
- [ ] Ocultar feeds cronológicos (no los usaremos).

### 1.7 Manejo de modo oscuro (preparación)
- [ ] Toggle de modo oscuro en UI (aunque aún no funcione completamente).
- [ ] CSS variables preparadas para dos temas.
- [ ] Guardar preferencia en localStorage (solo setup básico).

### 1.8 Router base en JS
- [ ] Archivo `app.js` con detección de URL actual.
- [ ] Archivo `config.js` con constante `API_BASE = 'https://bible.helloao.org/api'`.
- [ ] Stub de carga por página (aún sin lógica).
- [ ] Preparar sistema de módulos por página.
- [ ] Helpers de DOM (selectores, event listeners).

## Entregables Fase 1
- Plantilla XML de Blogger funcional y limpia.
- Navegación principal e inferior operativas.
- Páginas estáticas visibles con diseño consistente.
- Sistema de diseño documentado.
- Meta-tags de instalación tipo app implementados.

## Checklist de salida Fase 1
- [ ] El sitio se ve profesional en móvil y escritorio.
- [ ] No parece un blog tradicional.
- [ ] Se puede navegar entre todas las páginas.
- [ ] Se puede agregar a pantalla de inicio y se ve como app.

---

# FASE 2 — Lectura diaria

**Objetivo:** el usuario puede elegir un plan, leer el día actual y cambiar de versión.

## Tareas

### 2.1 Servicio de API bíblica
- [ ] Crear `bibleService.js` con interfaz limpia sobre ambas APIs.
- [ ] Implementar catálogo unificado de versiones en español (`available_translations.json` + `/versions`).
- [ ] Implementar `getBooks(translationId)` con fallback por fuente.
- [ ] Implementar `getChapter(translationId, bookId, chapter)` con fallback por fuente.
- [ ] Implementar `getMultipleReadings(translationId, readings)` con `Promise.all` para cargar varias referencias en paralelo (p. ej. las 3 lecturas de un día del plan).
- [ ] Caché en memoria (`Map`) durante la sesión para evitar llamadas repetidas.
- [ ] Caché opcional en localStorage para capítulos ya leídos (mejora experiencia offline parcial).
- [ ] Manejo de errores con mensajes amigables y botón de reintento.
- [ ] Normalizar IDs de versión en un mapeo canónico (`RV1960`, etc.).
- [ ] Pre-carga (prefetch) de la lectura del día siguiente cuando el usuario está en "Leer hoy".

**Nota:** las dos APIs son complementarias; algunas versiones solo existen en una de las fuentes. El fallback es obligatorio.

### 2.2 Servicio de planes
- [ ] Crear `planService.js`.
- [ ] Cargar `plans.json` desde jsDelivr.
- [ ] Cargar plan específico bajo demanda.
- [ ] Método `obtenerLecturaDelDia(planId, fecha)` que retorne las referencias del día con sus `bookId` y `chapter`.
- [ ] Integrar con `dateService.js` para calcular día actual.

### 2.3 Servicio de fechas
- [ ] Crear `dateService.js`.
- [ ] Función `esBisiesto(año)`.
- [ ] Función `obtenerDiaDelPlan(fechaInicio, fechaHoy)`.
- [ ] Manejo del 29 de febrero según `config.leapYearMode`.
- [ ] Funciones de formato (fecha larga, corta, día de la semana).

### 2.4 Plan principal: Biblia en un año
- [ ] Definir estructura completa de los 365 días.
- [ ] Construir `plan-biblia-anual.json`.
- [ ] Cada día incluye: título, lecturas (con `reference`, `bookId`, `chapter`), devocional, reflexión, oración (opcionales).
- [ ] Validar que cada `bookId` exista en la respuesta de `/api/{translation}/books.json`.
- [ ] Validar que cada capítulo referenciado exista en la API.
- [ ] Subir a GitHub y verificar acceso por jsDelivr.

### 2.5 Página Leer hoy
- [ ] Cargar plan activo desde localStorage.
- [ ] Calcular día actual del plan.
- [ ] Mostrar fecha y día del plan.
- [ ] Selector de versión funcional (poblado desde `versions.json`).
- [ ] Cargar y renderizar el texto bíblico usando `bibleService.getChapter()`.
- [ ] Renderizar versículos respetando el formato devuelto por la API (notas al pie, encabezados si vienen).
- [ ] Navegación anterior / siguiente día.
- [ ] Botón "Marcar como leído" (guarda en localStorage).
- [ ] Placeholder para favoritos y notas (se implementa en Fase 3).
- [ ] Indicador de progreso del plan.
- [ ] Manejo de atrasos (ofrecer "Ponerme al día" vs "Saltar al día de hoy").
- [ ] Estado de error amigable si la API no responde.

### 2.6 Página Planes
- [ ] Listar planes disponibles desde `plans.json`.
- [ ] Tarjetas con: nombre, descripción, duración, dificultad.
- [ ] Botón "Iniciar plan" → guarda plan activo + fecha de inicio.
- [ ] Botón "Continuar" si ya está iniciado.
- [ ] Botón "Reiniciar plan".
- [ ] Estado visual distinto por plan (nuevo / activo / completado).

### 2.7 Versículo diario inicial
- [ ] Construir `versiculos-diarios.json` con 366 entradas (solo referencias, no texto).
- [ ] Seguir línea temática mensual definida en brief.
- [ ] Cada entrada con `reference`, `bookId`, `chapter` y `verse` para poder consultar la API.
- [ ] Integrar en página Inicio.
- [ ] Cargar texto vía `bibleService.getChapter()` y extraer el versículo específico.

### 2.8 Flujo completo usuario nuevo
- [ ] Inicio → Planes → Elegir plan → Leer hoy.
- [ ] Verificar que funciona end-to-end.
- [ ] Verificar en móvil y escritorio.
- [ ] Medir tiempo real de carga de la primera lectura (objetivo: < 2s en 4G).

## Entregables Fase 2
- Usuario puede elegir un plan e iniciar la lectura.
- Texto bíblico se carga con estrategia dual de APIs y cambio de versión.
- Versículo diario visible en Inicio.
- Caché en memoria reduce llamadas repetidas durante la sesión.
- Manejo correcto del año bisiesto.

## Checklist de salida Fase 2
- [ ] Leer hoy muestra el contenido correcto para el día correcto.
- [ ] Cambiar de versión funciona sin recargar (nueva llamada a la API transparente).
- [ ] El progreso se actualiza al marcar como leído.
- [ ] Los atrasos se manejan con las dos opciones.
- [ ] El 29 de febrero funciona según la configuración elegida.
- [ ] Errores de red muestran un mensaje amigable con opción de reintento.

---

# FASE 3 — Lógica personal

**Objetivo:** Mi espacio completo, con favoritos, notas, progreso, historial y respaldo.

## Tareas

### 3.1 Servicio de almacenamiento
- [ ] Crear `storageService.js`.
- [ ] Esquema versionado del estado del usuario.
- [ ] Métodos `get`, `set`, `update`, `delete` por clave.
- [ ] Migración automática si cambia el esquema.
- [ ] Validación de integridad al leer.

### 3.2 Servicio de rachas
- [ ] Crear `streakService.js`.
- [ ] Cálculo de racha actual.
- [ ] Regla de gracia: 1 día por semana permitido sin romper racha.
- [ ] Detección de racha rota → mensaje pastoral, no punitivo.
- [ ] Estadísticas: racha más larga, total de días completados.

### 3.3 Favoritos
- [ ] UI para agregar favorito desde Leer hoy y Biblia.
- [ ] Modelo de datos por favorito (`reference`, `translationId`, `bookId`, `chapter`, `verse`, fecha, tipo).
- [ ] Lista de favoritos en Mi espacio.
- [ ] Filtrar por libro, testamento, fecha.
- [ ] Eliminar favorito con confirmación.

### 3.4 Notas
- [ ] UI para crear nota asociada a un día o referencia.
- [ ] Editor de texto simple (sin rich text inicialmente).
- [ ] Guardar con fecha de creación y actualización.
- [ ] Lista de notas en Mi espacio.
- [ ] Editar nota existente.
- [ ] Eliminar nota con confirmación.
- [ ] Filtrar por plan, libro o fecha.

### 3.5 Historial
- [ ] Guardar últimas 20 lecturas.
- [ ] Guardar últimas 10 búsquedas.
- [ ] Guardar últimos 15 capítulos visitados.
- [ ] UI de historial en Mi espacio.

### 3.6 Mi espacio — páginas internas
- [ ] **Resumen:** plan activo, progreso, racha, versículo diario.
- [ ] **Planes:** lista de planes iniciados con acciones.
- [ ] **Favoritos:** lista filtrada y accionable.
- [ ] **Notas:** lista filtrada con edición.
- [ ] **Historial:** lecturas, búsquedas, capítulos.
- [ ] **Configuración:** versión preferida (`preferredTranslationId`), modo oscuro, tamaño texto, modo bisiesto.
- [ ] **Respaldo:** exportar / importar JSON.

### 3.7 Exportar / Importar
- [ ] Función exportar: genera JSON descargable con todo el estado.
- [ ] Función importar: sube JSON y valida estructura.
- [ ] Confirmación antes de sobrescribir datos existentes.
- [ ] Opción "fusionar" vs "reemplazar" al importar.
- [ ] Recordatorio automático cada 30 días ("¿Hiciste respaldo?").

### 3.8 Múltiples planes
- [ ] Permitir iniciar más de un plan simultáneamente.
- [ ] Cambiar plan activo desde Mi espacio.
- [ ] Archivar planes completados.
- [ ] Continuar plan archivado (reactivarlo).

### 3.9 Modo oscuro funcional
- [ ] Toggle en configuración.
- [ ] Persistencia en localStorage.
- [ ] Transición suave entre temas.
- [ ] Respeto de `prefers-color-scheme` como valor inicial.

## Entregables Fase 3
- Mi espacio completo y funcional.
- Sistema de favoritos, notas y progreso robusto.
- Respaldo JSON exportable/importable.
- Modo oscuro activo.
- Manejo de múltiples planes.

## Checklist de salida Fase 3
- [ ] Puedo leer, guardar favorito, escribir nota y ver todo en Mi espacio.
- [ ] La racha se actualiza al marcar como leído.
- [ ] La racha funciona correctamente con regla de gracia.
- [ ] Exportar e importar conserva todos los datos.
- [ ] Modo oscuro se aplica a toda la app.

---

# FASE 4 — Exploración bíblica

**Objetivo:** el usuario puede leer libremente cualquier parte de la Biblia y buscar texto.

## Tareas

### 4.1 Página Biblia libre
- [ ] Selector de testamento (Antiguo / Nuevo).
- [ ] Lista de libros con número de capítulos (desde `/api/{translation}/books.json`).
- [ ] Selector de capítulo.
- [ ] Visor de lectura con tipografía cómoda (usando `getChapter()`).
- [ ] Navegación anterior / siguiente capítulo.
- [ ] Agregar favorito desde cualquier versículo.
- [ ] Agregar nota desde cualquier capítulo.
- [ ] Cambio de versión sin perder contexto (el libro/capítulo actual se mantiene y se vuelve a pedir a la API con otra `translationId`).

### 4.2 Buscador bíblico
- [ ] Evaluar estrategia: búsqueda sobre capítulos ya descargados (incremental) vs búsqueda sobre `/complete.json` de la versión principal (índice completo).
- [ ] Si se usa `/complete.json`: descargar una sola vez por versión, construir índice invertido en cliente y guardar en IndexedDB.
- [ ] Campo de búsqueda con debounce.
- [ ] Selector de versión.
- [ ] Filtro por testamento (ambos / AT / NT).
- [ ] Filtro por libro específico (opcional).
- [ ] Lista de resultados con paginación.
- [ ] Click en resultado → ir al capítulo completo.
- [ ] Resaltado del término buscado.
- [ ] Guardar favorito desde resultado.
- [ ] Advertencia si el usuario intenta buscar en una versión aún no indexada (ofrecer "indexar ahora").

### 4.3 Plan completo (calendario)
- [ ] Selector de plan.
- [ ] Grilla de días (organizados por mes o por semanas).
- [ ] Estado visual por día (completado, pendiente, con nota, favorito).
- [ ] Click en día → navegar a Leer hoy con ese día cargado.
- [ ] Navegación entre meses.
- [ ] Vista alternativa: lista cronológica.

### 4.4 Planes adicionales
- [ ] Construir `plan-nt.json` (Nuevo Testamento en un año).
- [ ] Construir `plan-salmos-proverbios.json` (31 días recurrentes).
- [ ] Construir `plan-nuevos-creyentes.json` (plan inicial).
- [ ] Construir `plan-90-dias.json` (lectura intensiva).
- [ ] Todos con `bookId` y `chapter` para compatibilidad directa con la API.
- [ ] Subir a GitHub y validar en jsDelivr.

### 4.5 Navegación cruzada
- [ ] Desde Mi espacio → Favorito → ir a Biblia en ese capítulo.
- [ ] Desde Mi espacio → Nota → ir al día correspondiente.
- [ ] Desde Plan completo → cualquier día → Leer hoy con ese día.

## Entregables Fase 4
- Página Biblia funcional.
- Buscador operativo (con estrategia de índice definida).
- Calendario de plan completo.
- 5 planes disponibles en total.

## Checklist de salida Fase 4
- [ ] Puedo leer cualquier capítulo de la Biblia sin tener un plan activo.
- [ ] La búsqueda devuelve resultados útiles en < 2 segundos una vez indexada la versión.
- [ ] El calendario muestra todos los estados correctamente.
- [ ] Los 5 planes cargan sin errores.

---

# FASE 5 — Pulido y lanzamiento

**Objetivo:** lanzar el proyecto con calidad profesional.

## Tareas

### 5.1 Optimización de rendimiento
- [ ] Minificar CSS y JS.
- [ ] Revisar tiempos de carga con Lighthouse.
- [ ] Lazy-loading de imágenes y componentes pesados.
- [ ] Preconnect a `bible.helloao.org` y a `cdn.jsdelivr.net`.
- [ ] Verificar que el primer render sea < 2 segundos en 4G.
- [ ] Verificar que la primera lectura del día cargue en < 2 segundos en 4G.

### 5.2 SEO básico
- [ ] Meta descriptions por página.
- [ ] Open Graph y Twitter Cards con imágenes específicas.
- [ ] Sitemap manual (páginas estáticas).
- [ ] `robots.txt` adecuado.
- [ ] Datos estructurados (Schema.org para WebApplication).
- [ ] Publicar versículo del día también como HTML estático en Inicio (no solo JS) para indexación.

### 5.3 Accesibilidad
- [ ] Contraste de colores cumple WCAG AA.
- [ ] Navegación por teclado funcional.
- [ ] Labels en todos los campos.
- [ ] Textos alt en imágenes.
- [ ] Tamaño de texto ajustable sin romper layout.

### 5.4 QA cruzado
- [ ] Pruebas en Chrome, Firefox, Edge, Safari.
- [ ] Pruebas en Android (Chrome y Samsung Internet).
- [ ] Pruebas en iOS (Safari).
- [ ] Pruebas en Windows y Mac.
- [ ] Flujo completo: usuario nuevo inicia plan y lee 7 días reales.
- [ ] Verificar import/export de datos entre dispositivos.
- [ ] Verificar comportamiento con conexión lenta o intermitente.

### 5.5 Microtextos pastorales
- [ ] Revisar todos los mensajes de la UI.
- [ ] Ajustar tono: cercano, reverente, claro.
- [ ] Revisar estados de error (sin texto técnico, sin mencionar URLs de API).
- [ ] Revisar estados vacíos (invitar a la acción sin presión).
- [ ] Revisar mensajes de racha (gracia en vez de culpa).

### 5.6 Documentación interna
- [ ] README del repositorio con instrucciones.
- [ ] Guía de cómo agregar un nuevo plan.
- [ ] Guía de cómo actualizar los JSON sin romper caché.
- [ ] Guía de cómo actualizar `versions.json` si aparecen nuevas versiones en español en la Free Use Bible API.
- [ ] Backup de la plantilla XML.

### 5.7 Página de lanzamiento
- [ ] Actualizar "Acerca" con información real del proyecto.
- [ ] Actualizar FAQ con dudas reales observadas en pruebas.
- [ ] Revisar página "Instalar" con capturas actualizadas.

### 5.8 Lanzamiento
- [ ] Comunicar a la congregación primero (prueba beta interna).
- [ ] Recolectar feedback.
- [ ] Ajustes basados en feedback real.
- [ ] Lanzamiento público oficial.
- [ ] Compartir en redes cristianas y comunidad pastoral.

## Entregables Fase 5
- Sitio optimizado, accesible y probado.
- SEO configurado.
- Feedback de beta incorporado.
- Lanzamiento público realizado.

## Checklist de salida Fase 5
- [ ] Lighthouse muestra puntaje > 85 en performance, accesibilidad y SEO.
- [ ] El sitio funciona correctamente en todos los navegadores principales.
- [ ] Usuarios reales han usado el sitio.
- [ ] El feedback inicial ha sido incorporado.

---

# FASE 6 — Backend y sincronización (futuro)

**Duración:** Cuando sea necesario (no inmediato)
**Objetivo:** habilitar cuentas reales y sincronización multi-dispositivo.

## Disparadores para iniciar esta fase
Iniciar Fase 6 cuando ocurra alguno de estos:
- Feedback recurrente: "quiero usar la app en mi celular Y computador".
- Más de 100 usuarios activos mensuales.
- Reportes de pérdida de datos por borrado de navegador.
- Interés pastoral en saber (anónimamente) qué planes se usan más.

## Tareas

### 6.1 Selección final de backend
- [ ] Evaluación final Supabase vs PocketBase (con datos reales de uso).
- [ ] Decisión basada en: costos, facilidad, control, escalabilidad.
- [ ] Recomendación actual: **Supabase** (PostgreSQL + Auth listo + free tier generoso).

### 6.2 Configuración del backend
- [ ] Crear proyecto en Supabase.
- [ ] Definir tablas: `users`, `user_plans`, `favorites`, `notes`, `history`.
- [ ] Configurar Row Level Security (cada usuario ve solo sus datos).
- [ ] Configurar autenticación (email + Google opcional).

### 6.3 Autenticación en el frontend
- [ ] Página de login/registro.
- [ ] Manejo de sesión (token JWT).
- [ ] Logout.
- [ ] Recuperar contraseña.
- [ ] Validación de email.

### 6.4 Sincronización
- [ ] Cliente Supabase en el frontend.
- [ ] Al iniciar sesión: descargar estado del servidor.
- [ ] Al hacer cambios: push al servidor.
- [ ] Resolver conflictos (última modificación gana, por defecto).
- [ ] localStorage como caché local (no se elimina).
- [ ] Modo offline: operar con localStorage, sincronizar al reconectar.

### 6.5 Migración de usuarios existentes
- [ ] Detectar usuarios con datos en localStorage al crear cuenta.
- [ ] Ofrecer migrar automáticamente.
- [ ] Preservar historial completo.

### 6.6 Notificaciones y recordatorios
- [ ] Recordatorios diarios por email (opcional por usuario).
- [ ] Email semanal de resumen espiritual.
- [ ] Notificaciones por hitos (30 días consecutivos, plan completado).

### 6.7 Privacidad y términos
- [ ] Política de privacidad.
- [ ] Términos de uso.
- [ ] Opción de eliminar cuenta y datos (GDPR-friendly).
- [ ] Exportación de datos personal (derecho a portabilidad).

## Entregables Fase 6
- Sistema de cuentas funcionando.
- Sincronización entre dispositivos.
- Notificaciones por email.
- Migración automática de datos locales.

---

# Fases opcionales a futuro

Ideas que podrían implementarse (Solo bajo aprobación clara y específica) si el proyecto crece:

### Fase 7 — Audio bíblico
- Integración con API de audio bíblico.
- Lectura dramatizada.
- Velocidad variable.

### Fase 8 — Estudio ampliado
Activar recursos que están disponibles en la Free Use Bible API pero que quedaron **fuera del alcance inicial del producto**:
- Comentarios bíblicos por pasaje (endpoint `/api/c/{commentary}/...`).
- Referencias cruzadas (endpoint `/api/d/{dataset}/...`).
- Diccionario bíblico integrado.
- Concordancia.
- Perfiles de personajes bíblicos (disponibles en algunos comentarios, ej. `tyndale`).

> **Condición:** esta fase solo tiene sentido si el producto evoluciona hacia una herramienta de **estudio bíblico**, lo cual implica otro perfil de usuario y requiere re-evaluar la arquitectura de la app.

### Fase 9 — Comunidad
- Grupos privados de lectura.
- Compartir notas con permisos.
- Oración compartida.
- Ranking de rachas (opcional, con cuidado pastoral).

### Fase 10 — App nativa
- Convertir a app Android/iOS real con Capacitor.
- Notificaciones push.
- Lectura offline completa.

---

# Gestión continua del proyecto

Estas tareas no son de una fase específica sino continuas:

## Mantenimiento
- Monitorear disponibilidad de la Free Use Bible API.
- Revisar periódicamente si aparecen nuevas versiones en español en `available_translations.json`.
- Revisar caché de jsDelivr tras cambios.
- Backups regulares de la plantilla XML.
- Actualizar JSON con mejoras en devocionales.

## Feedback y mejora
- Encuestas anuales a usuarios.
- Revisión de estadísticas de uso (si hay backend).
- Ajustes basados en datos reales.

## Contenido espiritual
- Revisar microtextos cada 6 meses.
- Actualizar versículos diarios si se repiten mucho.
- Considerar planes temáticos de temporada (Adviento, Cuaresma).

---

# Resumen ejecutivo del roadmap

### Hitos clave

| Hito | Fase | Valor entregado |
|---|---|---|
| APIs bíblicas validadas | Fase 0 | Base técnica sólida |
| XML de Blogger publicado | Fase 1 | Sitio navegable |
| Primer usuario lee un día real | Fase 2 | Producto utilizable |
| Mi espacio funcional | Fase 3 | Producto con valor personal |
| 5 planes disponibles | Fase 4 | Variedad espiritual |
| Lanzamiento público | Fase 5 | Producto terminado |
| Sincronización en la nube | Fase 6 | Producto escalable |

### Criterios de decisión

- **No avanzar a Fase 2** sin haber validado ambas APIs y tener el subconjunto de versiones en español curado.
- **No avanzar a Fase 3** sin haber usado Leer hoy personalmente durante al menos 7 días reales.
- **No lanzar Fase 5** sin beta real con al menos 2 personas externas.
- **No iniciar Fase 6** sin demanda clara.
- **No activar Fase 8** (comentarios/datasets) sin un replanteamiento del público objetivo y la arquitectura.

---

*Roadmap v2.1 — Estrategia dual de APIs bíblicas en español. Abril 2026. Este documento es vivo y se actualiza al final de cada fase.*
