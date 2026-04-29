# MiBiblia365-XML

Repositorio del proyecto **Mi Biblia 365**: app web tipo dashboard devocional sobre Blogger XML.

## Estado actual

- MVP activo en `template - ZIA.xml`.
- `Templates XML/` es solo referencia histórica; no es fuente de verdad técnica.
- Lógica JS standalone adicional en `CDN/js/app.js` (compatibilidad/iteraciones).
- Datos de planes y versículos en `json/` con nombres actuales del repositorio.
- Inicio formal de Fase 0 en curso (registro sin estimaciones de tiempo).

## Arquitectura vigente

- **Blogger XML**: layout global, navegación y contenedores UI.
- **JavaScript**: estado de usuario, tema, progreso, render dinámico.
- **JSON del repo**: planes de lectura y versículos diarios.
- **localStorage**: persistencia local (`mibiblia365_data` como clave principal).

## APIs bíblicas (español)

Se usan dos APIs de forma complementaria para cubrir versiones que no siempre coinciden entre fuentes:

1. Free Use Bible API
   - `https://bible.helloao.org/`
   - `https://bible.helloao.org/docs/`
2. Bible API Docs Netlify App
   - `https://docs-bible-api.netlify.app/`
   - `https://docs-bible-api.netlify.app/api/examples`

### Estrategia de consumo

- Preferencia por defecto: `auto`.
- Catálogo de versiones: unión de ambas fuentes.
- Lectura: usar fuente disponible para la versión seleccionada; fallback automático si no existe o falla.
- Caché en memoria y persistencia local para minimizar llamadas repetidas.

## Configuración base MVP

En `template - ZIA.xml`:

- `CDN_BASE`: `https://cdn.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main`
- `API_SOURCES.primary`: `https://docs-bible-api.netlify.app/api`
- `API_SOURCES.secondary`: `https://bible.helloao.org/api`
- `DEFAULT_VERSION`: `RV1960`
- `STORAGE_KEY`: `mibiblia365_data`
- `STORAGE_LEGACY_PREFIX`: `mibiblia365-`

## Persistencia y compatibilidad

- Esquema canónico actual: objeto único en `mibiblia365_data`.
- Compatibilidad legacy: si existe data previa en claves con prefijo `mibiblia365-`, se migra una vez al esquema canónico.

## Estructura relevante

- `template - ZIA.xml`: plantilla MVP activa para Blogger.
- `CDN/css/base.css`: estilos compartidos.
- `CDN/js/app.js`: script app standalone (IIFE).
- `json/Plan_Anual.json`
- `json/Plan_Cronologico.json`
- `json/Plan_Canónico.json`
- `json/Plan_180_NT_Salmos.json`
- `json/Plan_Combinado.json`
- `json/Plan_Trimestral.json`
- `json/versiculos-diarios.json`

## Notas operativas

- `Instrucciones.md` se mantiene vacío por ahora y se llenará a medida que avancen fases con tareas manuales.
- Antes de publicar cambios de datos en CDN, considerar caché de jsDelivr.
- Este proyecto no modifica ni reescribe el contenido de las traducciones bíblicas.


## Activos de Fase 0 agregados

- `test-api.html`: prueba local para validar APIs, filtro de español y fallback.
- `json/versions.json`: primer subconjunto curado de versiones en español.
- `json/plans.json`: catálogo inicial de planes conectando a los JSON existentes.
- `json/config.json`: configuración base (`defaultTranslationId`, `defaultPlanId`, `leapYearMode`, `apiSources`).
- `test.json`: archivo de humo para validar entrega por jsDelivr.
- `LICENSE`: licencia MIT del código del repositorio.

