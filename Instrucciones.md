# Instrucciones operativas y registro manual

## Fase 0 — Tareas manuales pendientes

### 1) Validación de APIs (pendiente de red externa)
- Abrir `test-api.html` en navegador (localhost o en el propio Blogger).
- Verificar:
  - Catálogo de traducciones desde HelloAO.
  - Catálogo de versiones desde Netlify/Deno.
  - Filtro de traducciones en español.
  - Carga de capítulo con fallback entre fuentes.
- Objetivo: `< 1000ms` por capítulo en condiciones normales.
- Registrar aquí los tiempos reales observados.

### 2) Prueba de caché del navegador en llamadas repetidas
- En `test-api.html`, cargar el mismo capítulo dos veces seguidas.
- Abrir DevTools > Red y confirmar que la segunda llamada viene de caché (disco o memoria).
- Verificar que el JS en `template-ZIA.xml` registra el hit de memoria (`memoryCache`).

### 3) Validación de jsDelivr
- Probar URL:
  - `https://cdn.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main/test.json`
- Medir tiempo de respuesta (objetivo: < 500ms desde América Latina).
- Actualizar `test.json`, hacer commit y verificar cuánto tarda jsDelivr en reflejar el cambio.
- **Estrategia de invalidación recomendada:**
  - Desarrollo: fijar hash de commit (`@<sha>` en la URL del CDN).
  - Producción estable: publicar nuevo tag (`@v0.x.y`) en cada cambio relevante de datos.

### 4) Probar el endpoint `/complete.json`
- URL de ejemplo: `https://bible.helloao.org/api/spa_r09/complete.json`
- Descargar y medir peso del archivo (esperado: varios MB).
- Evaluar si es viable para buscador en cliente (ver tarea 4.2 del Roadmap).
- Documentar el tiempo de descarga y tamaño real aquí.

### 5) Moodboard visual
- Crear un tablero de referencias visuales (puede ser Figma, Pinterest o un documento con capturas).
- Referencia: paleta ya definida en CSS — azul profundo `#1a365d`, dorado `#b7791f`, crema `#faf9f7`.
- Tipografía: Inter (UI) + Playfair Display (titulares).
- Estilo objetivo: sobrio, limpio, espiritual — sin elementos decorativos religiosos kitch.

---

## Fase 1 — Tareas manuales pendientes

### 6) Subir plantilla XML a Blogger
- Ir a: Blogger > Tema > Editar HTML.
- Pegar el contenido completo de `template-ZIA.xml`.
- Guardar y verificar que el sitio carga correctamente en `www.mibiblia365.com`.
- **Antes de guardar:** revisar que no haya errores XML (Blogger rechaza XML mal formado).

### 7) Verificar el sitio en Blogger (checklist de salida Fase 1)
Después de subir el XML, verificar cada punto en el navegador:

**Móvil (Chrome Android o Safari iOS):**
- [ ] La barra de navegación inferior aparece con 5 items.
- [ ] El botón "Leer hoy" central está destacado visualmente.
- [ ] El hero de inicio se ve correctamente.
- [ ] El versículo del día carga desde la API (puede tardar 1-2s).
- [ ] El toggle de modo oscuro funciona.
- [ ] Se puede agregar a pantalla de inicio y se ve como app (ícono correcto).

**Escritorio (Chrome o Firefox):**
- [ ] La navegación horizontal aparece en el header.
- [ ] La barra inferior NO aparece en escritorio.
- [ ] El layout de inicio se ve bien a distintos anchos.
- [ ] El footer aparece con créditos y año correcto.

**Páginas:**
- [ ] `/p/leer-hoy.html` — carga el plan anual y muestra lecturas del día con versículos.
- [ ] `/p/planes.html` — lista los planes desde `plans.json`.
- [ ] `/p/acerca.html` — muestra el contenido de "Acerca".
- [ ] `/p/preguntas-frecuentes.html` — muestra las 7 preguntas.
- [ ] `/p/instalar.html` — muestra instrucciones para las 4 plataformas.
- [ ] `/p/biblia.html` — muestra el placeholder de "próximamente".
- [ ] `/p/buscar.html` — muestra el placeholder de "próximamente".
- [ ] `/p/mi-espacio.html` — muestra el placeholder de "próximamente".

### 8) Contenido alternativo en páginas de Blogger (si las páginas no renderizan el JS)
Si Blogger no ejecuta el JS de `template-ZIA.xml` dentro de las páginas estáticas `/p/`, será necesario agregar el contenido HTML estático directamente en cada página desde el editor de Blogger.

Guía para pegar contenido en cada página:

**Para `/p/acerca.html`:**  
El contenido está en `renderAcercaPage()` dentro del `<script>` del XML. Si el JS no renderiza, agregar manualmente en el editor de Blogger el siguiente texto:
- Título: "Acerca de Mi Biblia 365"
- Secciones: ¿Qué es? / Nuestra visión / ¿Cómo funciona? / Texto bíblico (con crédito a HelloAO)

**Para `/p/preguntas-frecuentes.html`:**  
Contenido está en `renderFAQPage()`. Si el JS no renderiza, agregar las 7 preguntas en el editor de Blogger en formato acordeón o lista.

**Para `/p/instalar.html`:**  
Contenido está en `renderInstalarPage()`. Si el JS no renderiza, agregar instrucciones para Android, iOS, Windows y Mac en el editor de Blogger.

> **Nota:** En Blogger, las páginas `/p/*.html` cargan el layout completo del XML (incluyendo los scripts). El JS detecta la URL y renderiza el contenido correcto en `#page-dynamic`. Si hay problemas, verificar en DevTools que el JS no arroja errores de importación.

### 9) Verificar que el año del footer es correcto
- Abrir el sitio y revisar que el footer muestra el año actual.
- El año se actualiza dinámicamente via JS (`new Date().getFullYear()`).

### 10) QA Dark mode
- Activar modo oscuro desde el toggle del header.
- Verificar que todas las páginas cambian correctamente de tema.
- Verificar que la preferencia persiste al recargar.
- Verificar que si el sistema está en modo oscuro, la app lo detecta al primer uso.

---

## Notas generales

### Gestión de caché en jsDelivr
- **Producción:** usar tags para fijar versiones (`@v0.x.y`).
- **Desarrollo:** usar el hash del commit (`@abc1234`).
- Para invalidar cache inmediatamente: visitar `https://purge.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main/<ruta>`.
- Los cambios en `@main` pueden tardar hasta 24h en reflejarse por caché del CDN.

### Cómo agregar un nuevo plan
1. Crear el archivo JSON en `json/Plan_NombreNuevo.json` con el mismo esquema de los planes existentes.
2. Agregar la entrada en `json/plans.json` con el `id`, `name`, `days` y `file`.
3. Hacer commit y push a `main`.
4. Verificar en jsDelivr que el nuevo archivo está disponible.

### Cómo actualizar `versions.json`
1. Verificar los IDs actuales en `https://bible.helloao.org/api/available_translations.json` filtrando por `language === "spa"`.
2. Agregar o corregir entradas en `json/versions.json` con el formato existente.
3. Hacer commit, push y verificar en jsDelivr.
