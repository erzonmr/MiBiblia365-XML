# Brief Unificado del Proyecto
## Mi Biblia 365
### Plataforma Web tipo App sobre Blogger (XML) para lectura bíblica anual

---

## 1. Identidad del proyecto

### Nombre provisional
**Mi Biblia 365**

### Slogan
**Un Año con La Palabra.**

### Versículo guía del proyecto
> "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." — Salmos 119:105 (RV60)

---

## 2. Resumen ejecutivo

Plataforma web construida sobre **Blogger con plantilla XML personalizada**, diseñada para funcionar como una **web app bíblica tipo dashboard devocional**, no como blog tradicional.

### Lo que hace
- Permite leer la Biblia diariamente siguiendo planes estructurados.
- Ofrece varias versiones en español, obtenidas desde la **Free Use Bible API** (catálogo de más de 1000 traducciones filtradas por idioma).
- Gestiona progreso personal, favoritos y notas en localStorage.
- Entrega un versículo diario independiente del plan, con línea temática anual.
- Ofrece un espacio personal (Mi espacio) como eje central del recorrido espiritual del usuario.

### Lo que NO hace
- No publica posts ni usa feed cronológico.
- No requiere registro ni login en su primera fase.
- No almacena la Biblia completa localmente (el texto se obtiene por API, con caché en memoria durante la sesión).
- No es una PWA (decisión explícita por limitaciones de Blogger).
- **No integra comentarios bíblicos ni datasets adicionales** de la API (aunque están disponibles), para mantener el foco en la lectura bíblica pura.

---

## 3. Objetivo principal

Diseñar una plataforma moderna, clara y espiritual que permita al usuario:

- Leer la Biblia de forma ordenada y perseverante.
- Seguir uno o varios planes de lectura.
- Cambiar entre varias versiones bíblicas en español.
- Hacer seguimiento de su progreso personal.
- Guardar favoritos y tomar notas.
- Continuar fácilmente donde quedó.
- Usar la web como herramienta devocional diaria.

---

## 4. Enfoque del producto

### Tipo de producto
**Web app bíblica tipo dashboard devocional**, hospedada en Blogger.

### Debe parecer
- Aplicación devocional.
- Panel de lectura bíblica.
- Biblioteca bíblica digital personal.
- Herramienta de acompañamiento espiritual.

### NO debe parecer
- Blog de noticias.
- Portal con feed cronológico.
- Plantilla de revista.
- Página con widgets de Blogger abarrotados.
- Sitio basado en publicaciones periódicas.

### Principio rector
> Blogger es el contenedor visual. La app vive en JavaScript, los datos en JSON externos, el contenido bíblico en la Free Use Bible API, y la experiencia personal en localStorage.

---

## 5. Público objetivo

### Principal
- Cristianos evangélicos de habla hispana que desean leer la Biblia en un año.
- Creyentes que buscan disciplina devocional.
- Usuarios que quieren seguir un plan de lectura estructurado.
- Usuarios móviles que desean una experiencia sencilla y rápida.

### Secundario
- Nuevos creyentes que empiezan a leer la Biblia.
- Usuarios que desean leer por temas, cronología o secciones.
- Lectores que desean guardar notas y favoritos para estudio personal.

---

## 6. Decisiones técnicas clave

| Decisión | Estado |
|---|---|
| Plataforma base | Blogger con plantilla XML personalizada |
| Sin posts | Confirmado |
| Páginas fijas de Blogger | Confirmado |
| API bíblica externa | **Free Use Bible API (bible.helloao.org)** — única fuente |
| Autenticación en API | No requerida (API pública sin API key) |
| Solo versiones en español (filtradas del catálogo) | Confirmado |
| Comentarios y datasets de la API | **No se usarán** |
| Datos JSON externos en GitHub + jsDelivr | Confirmado |
| Almacenamiento local: localStorage (fase inicial) | Confirmado |
| Respaldo en backend real (Supabase/PocketBase) | Fase posterior (roadmap) |
| PWA | **Descartada** (por limitaciones de Blogger) |
| "Instalación tipo app" | Acceso directo / Agregar a pantalla de inicio |
| Lógica de año bisiesto | Manejada en JS, no en JSON |

### Responsabilidades por capa
| Capa | Función |
|---|---|
| **Blogger (XML)** | Layout global, encabezado, pie, menú, contenedores visuales, soporte modo claro/oscuro |
| **JavaScript** | Router por página, consumo de API, render, estado, progreso, favoritos, notas, respaldo |
| **JSON externos (jsDelivr)** | Planes de lectura, versículos diarios, configuración general, catálogo curado de versiones |
| **localStorage** | Datos personales del usuario (progreso, notas, favoritos, configuración) |
| **Free Use Bible API** | Texto bíblico dinámico por traducción, libro y capítulo |

---

## 7. API bíblica del proyecto

### 7.1 API seleccionada: Free Use Bible API

**URL base:** `https://bible.helloao.org/api/`
**Documentación:** `https://bible.helloao.org/docs/`

La **Free Use Bible API** será la **única fuente de texto bíblico** del proyecto. Se trata de una API basada en archivos JSON estáticos alojados en AWS, lo que garantiza baja latencia y disponibilidad global. Se consume exclusivamente mediante peticiones **HTTP GET**.

### 7.2 Por qué esta API

| Criterio | Beneficio |
|---|---|
| Sin autenticación | No requiere API key ni registro |
| Sin límites de uso | Sin cuotas ni rate limits |
| Licencia libre | Uso comercial permitido, sin restricciones |
| Distribución AWS | Alta disponibilidad y baja latencia |
| JSON estático | Fácil de cachear en navegador y CDN |
| 1000+ traducciones | Amplia cobertura multilingüe |

### 7.3 Regla de licencia a respetar
Si el proyecto modifica el contenido de alguna traducción (por ejemplo, alterando puntuación, formato o texto), **debe cambiar el nombre** de esa traducción en la interfaz para evitar confusión con la versión original. Mi Biblia 365 **no modificará el contenido bíblico**, por lo que se mostrarán los nombres originales de cada traducción.

### 7.4 Endpoints que sí se usarán en el proyecto

#### 7.4.1 Catálogo de traducciones disponibles
- **Endpoint:** `GET https://bible.helloao.org/api/available_translations.json`
- **Uso:** descargar el catálogo completo una sola vez, filtrar por idioma español en el cliente, y guardar el subconjunto curado en `versions.json` dentro del repositorio del proyecto.
- **Nota:** la API no admite parámetros de consulta (`?lang=es`), por lo que el filtrado se hace en el frontend/backend inspeccionando las propiedades del JSON devuelto.

#### 7.4.2 Libros de una traducción
- **Endpoint:** `GET https://bible.helloao.org/api/{translation}/books.json`
- **Parámetros:**
  - `{translation}`: ID de la traducción (ejemplo: `BSB`, `RVR1909`, etc.)
- **Uso:** poblar el selector de libros en las páginas **Biblia** y **Leer hoy**.

#### 7.4.3 Contenido de un capítulo
- **Endpoint:** `GET https://bible.helloao.org/api/{translation}/{book}/{chapter}.json`
- **Parámetros:**
  - `{translation}`: ID de la traducción (ej. `RVR1909`)
  - `{book}`: ID del libro (ej. `GEN` para Génesis)
  - `{chapter}`: número de capítulo (ej. `1`)
- **Uso:** endpoint principal durante la lectura diaria. El JSON devuelto incluye formato básico y posibles notas al pie.

#### 7.4.4 Traducción completa (opcional)
- **Endpoint:** `GET https://bible.helloao.org/api/{translation}/complete.json`
- **Uso previsto:** no se utilizará en la experiencia del usuario final (por el peso del archivo), pero queda disponible para tareas administrativas como precargar texto bíblico en un caché o generar índices de búsqueda offline en el futuro.

### 7.5 Endpoints que NO se usarán

Se descartan explícitamente los siguientes recursos de la Free Use Bible API, aunque estén disponibles:

- ❌ **Comentarios bíblicos** (`/api/available_commentaries.json`, `/api/c/{commentary}/...`)
- ❌ **Perfiles** dentro de comentarios (`/api/c/{commentary}/profiles.json`)
- ❌ **Datasets** y referencias cruzadas (`/api/available_datasets.json`, `/api/d/{dataset}/...`)

**Justificación:** Mi Biblia 365 se enfoca en **lectura bíblica devocional pura** y disciplina de perseverancia. Introducir comentarios y datasets desviaría el propósito del producto hacia un estudio bíblico avanzado, que no corresponde al público objetivo de la Fase 1. Estos recursos podrían evaluarse en una fase futura si el proyecto evoluciona hacia una herramienta de estudio.

### 7.6 Estrategia de versiones en español

#### Proceso
1. Descargar una sola vez `available_translations.json`.
2. Filtrar manualmente (o con script) las traducciones cuyo idioma sea español (`"language": "spa"` o equivalente según la estructura real de la API).
3. Curar una lista final con las versiones que se ofrecerán al usuario.
4. Guardar esta lista curada en `versions.json` dentro del repositorio del proyecto (sección 15.1), para evitar que el cliente descargue el catálogo completo cada vez.

#### Criterio de selección
- Priorizar versiones ampliamente usadas en contextos evangélicos hispanos.
- Incluir por defecto una versión **Reina Valera** (la disponible en la API como traducción de uso libre, por ejemplo RVR1909 o la variante equivalente que exponga el catálogo).
- Incluir al menos 2-3 versiones modernas en español para dar variedad al lector.
- La versión **predeterminada** del sitio será la Reina Valera disponible en la API, marcada como `default: true` en `versions.json`.

### 7.7 Arquitectura del servicio API en JS (`bibleService.js`)

El servicio debe encapsular toda la lógica de consumo de la API, exponiendo una interfaz limpia al resto de la app.

```javascript
// services/bibleService.js
const API_BASE = 'https://bible.helloao.org/api';

const cache = new Map(); // caché en memoria durante la sesión

async function fetchJSON(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status} al obtener ${url}`);
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export async function getAvailableTranslations() {
  return fetchJSON(`${API_BASE}/available_translations.json`);
}

export async function getBooks(translationId) {
  return fetchJSON(`${API_BASE}/${translationId}/books.json`);
}

export async function getChapter(translationId, bookId, chapter) {
  return fetchJSON(`${API_BASE}/${translationId}/${bookId}/${chapter}.json`);
}

// Utilidad para obtener varias referencias (ej. "Génesis 1", "Salmos 1", "Mateo 1")
export async function getMultipleReadings(translationId, readings) {
  return Promise.all(
    readings.map(ref => {
      const { bookId, chapter } = parseReference(ref);
      return getChapter(translationId, bookId, chapter);
    })
  );
}
```

**Ventajas del diseño:**
- Caché en memoria reduce llamadas repetidas durante la sesión.
- Interfaz limpia: otras capas no conocen detalles de la API.
- Fácil de migrar a otra API si es necesario, editando un solo archivo.
- Compatible con `Promise.all` para cargar varias lecturas del día en paralelo.

### 7.8 Consideraciones de resiliencia

Aunque la API está alojada en AWS y tiene alta disponibilidad, se recomienda:

- **Manejo de errores amigable** en la UI: mostrar mensaje del tipo "No pudimos cargar la lectura. Verifica tu conexión e intenta de nuevo." con botón de reintento.
- **Caché opcional en localStorage** para capítulos ya leídos, de modo que si el usuario está offline o la API falla, pueda seguir leyendo lo ya descargado.
- **Pre-carga de la lectura del día siguiente** (cuando el usuario esté en "Leer hoy"), para mejorar la sensación de velocidad.

---

## 8. Estrategia de datos JSON externos

### 8.1 Ubicación
- **Repositorio público en GitHub** (propiedad del proyecto).
- **Servidos vía jsDelivr CDN** para rendimiento global y caché.

### 8.2 Regla clave
Los JSON deben considerarse **estables antes de publicarse**, porque jsDelivr cachea los archivos por versión/hash. Para forzar actualización se puede:
- Usar versión específica del commit (`@main`, `@sha`, o tag).
- Cambiar el nombre del archivo cuando haya cambios estructurales.

### 8.3 Archivos JSON del proyecto
| Archivo | Propósito |
|---|---|
| `versions.json` | Catálogo curado de versiones en español (subconjunto de `available_translations.json`) |
| `plans.json` | Catálogo general de planes disponibles |
| `plan-biblia-anual.json` | Detalle día por día del plan anual (365 días) |
| `plan-cronologico.json` | Detalle del plan cronológico |
| `plan-nt.json` | Nuevo Testamento en un año |
| `plan-salmos-proverbios.json` | Salmos y Proverbios |
| `plan-nuevos-creyentes.json` | Plan para nuevos creyentes |
| `plan-90-dias.json` | Plan de 90 días |
| `versiculos-diarios.json` | Versículo diario con línea temática anual |
| `config.json` | Configuración general del sitio |

> Nota: los archivos de planes y versículos diarios contienen **referencias bíblicas** (ej. `"Génesis 1"`), no el texto bíblico completo. El texto se obtiene en tiempo real desde la Free Use Bible API.

---

## 9. Manejo del año bisiesto

### 9.1 El problema
- Los planes anuales se definen con **365 días** en sus JSON.
- Un año bisiesto tiene **366 días** (años divisibles por 4, salvo centenarios no divisibles por 400).
- El 29 de febrero debe tener un manejo explícito.

### 9.2 Decisión del proyecto
**Los archivos JSON siempre tendrán 365 días.** La lógica de año bisiesto se maneja **exclusivamente en JavaScript**, no en los datos.

### 9.3 Comportamiento al 29 de febrero

Se implementarán dos modos, configurables desde `config.json`:

**Modo 1 — Día de gracia (por defecto):**
- El 29 de febrero se muestra un **devocional especial de reflexión** (sin lectura obligatoria).
- Contenido sugerido: versículo breve + reflexión corta ("Día de gracia y meditación").
- No rompe la racha.
- El plan continúa normalmente el 1 de marzo.

**Modo 2 — Repetir día anterior:**
- Se muestra la lectura del 28 de febrero nuevamente.
- Útil para quien quiere reforzar o ponerse al día.

### 9.4 Función utilitaria sugerida en JS
```javascript
function esBisiesto(año) {
  return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}

function obtenerDiaDelPlan(fechaInicio, fechaHoy) {
  const dias = Math.floor((fechaHoy - fechaInicio) / (1000 * 60 * 60 * 24)) + 1;
  return dias; // JS calcula diferencia real, ya considera bisiestos
}
```

### 9.5 Para el versículo diario
El `versiculos-diarios.json` define 366 entradas (1 al 366), permitiendo usar el `dayOfYear` directamente sin ajustes. En años no bisiestos, la entrada 366 simplemente no se usa ese año.

---

## 10. Sistema de Versículo Diario

### 10.1 Concepto
Sistema **independiente** del plan de lectura, orientado a inspiración devocional breve. Disponible aun cuando el usuario no haya iniciado ningún plan.

### 10.2 Fuente
Archivo: `versiculos-diarios.json` (366 entradas con **referencias**; el texto bíblico se obtiene desde la Free Use Bible API en el momento del render).

### 10.3 Estructura por entrada
```json
{
  "dayOfYear": 1,
  "month": 1,
  "theme": "proposito",
  "subtheme": "inicio_de_ano",
  "reference": "Jeremías 29:11",
  "label": "Inicio de año",
  "highlight": "Dios tiene propósito para tu vida"
}
```

### 10.4 Línea temática anual

| Mes | Tema central |
|---|---|
| Enero | Propósito, dirección, nuevos comienzos |
| Febrero | Amor de Dios, comunión |
| Marzo | Crecimiento espiritual |
| Abril | Sacrificio de Cristo, cruz, resurrección |
| Mayo | Paz, descanso |
| Junio | Fortaleza, ánimo |
| Julio | Sabiduría, guía |
| Agosto | Oración |
| Septiembre | Evangelismo, salvación |
| Octubre | Fe, confianza |
| Noviembre | Gratitud |
| Diciembre | Navidad, encarnación, gozo |

### 10.5 Dónde se muestra el versículo diario
- **Inicio** — destacado en bloque principal.
- **Mi espacio** — en el resumen del usuario.
- **Leer hoy** — opcional, como cierre devocional.

---

## 11. Estructura de páginas

### 11.1 Mapa general
| Ruta | Página | Función |
|---|---|---|
| `/` | Inicio | Portada con acceso rápido, versículo diario, plan activo |
| `/p/leer-hoy.html` | Leer hoy | Lectura diaria del plan |
| `/p/planes.html` | Planes de lectura | Catálogo y selección de planes |
| `/p/plan-completo.html` | Plan completo | Calendario y navegación del plan |
| `/p/biblia.html` | Biblia | Lectura libre por libro/capítulo |
| `/p/buscar.html` | Buscar | Búsqueda de palabras/frases |
| `/p/mi-espacio.html` | Mi espacio | Panel personal del usuario |
| `/p/acerca.html` | Acerca del proyecto | Información y visión |
| `/p/preguntas-frecuentes.html` | Preguntas frecuentes | FAQ |
| `/p/instalar.html` | Instalar como app | Guía de acceso directo en dispositivos |

### 11.2 Inicio (`/`)

**Función:** portada principal con enfoque en lectura, progreso y acceso rápido.

**Contenido:**
- Nombre del proyecto y subtítulo.
- Llamada principal: botón **Leer hoy**.
- Tarjeta resumen del progreso actual (si hay plan activo).
- Versículo destacado del día.
- Botón **Continuar donde quedé**.
- Acceso a planes de lectura.
- Acceso a Mi espacio.
- Selector de versión bíblica.

### 11.3 Leer hoy (`/p/leer-hoy.html`)

**Función:** página principal de lectura diaria.

**Lógica:**
- Detectar plan activo desde localStorage.
- Calcular día del plan según fecha de inicio y fecha actual.
- Manejar 29 de febrero según `config.json`.
- Consultar la **Free Use Bible API** con la referencia bíblica (endpoint `{translation}/{book}/{chapter}.json`).
- Renderizar el texto en la versión seleccionada.

**Secciones:**
- Fecha actual.
- Nombre del plan y día del plan.
- Selector de versión.
- Referencias bíblicas del día.
- Texto bíblico renderizado.
- Navegación anterior / siguiente día.
- Botón **Marcar como leído**.
- Botón **Añadir favorito**.
- Botón **Añadir nota**.
- Indicador de progreso del plan.
- Devocional o reflexión opcional.

### 11.4 Planes de lectura (`/p/planes.html`)

**Función:** mostrar y permitir elegir uno o varios planes.

**Secciones:**
- Introducción.
- Tarjetas de planes con duración, dificultad, descripción.
- Botones por plan: **Iniciar**, **Continuar**, **Reiniciar**, **Archivar**.

**Planes sugeridos:**
- Biblia en un año (clásico por secciones)
- Plan cronológico
- Nuevo Testamento en un año
- Salmos y Proverbios (31 días, recurrente)
- Plan para nuevos creyentes
- Plan de 90 días
- Plan temático

### 11.5 Plan completo (`/p/plan-completo.html`)

**Función:** vista tipo calendario de todo el plan.

**Secciones:**
- Selector de plan.
- Selector de mes.
- Grilla de días con estados visuales:
  - No iniciado
  - Iniciado
  - Completado
  - Con nota
  - Favorito
- Click en día → lleva a Leer hoy con ese día cargado.

### 11.6 Biblia (`/p/biblia.html`)

**Función:** lectura libre, independiente del plan.

**Secciones:**
- Selector de versión (poblado desde `versions.json`).
- Selector de testamento.
- Lista de libros (obtenida desde `/api/{translation}/books.json`).
- Lista de capítulos (inferida del metadata del libro).
- Visor de lectura (consume `/api/{translation}/{book}/{chapter}.json`).
- Navegación capítulo anterior / siguiente.
- Botón favorito.
- Botón añadir nota.

### 11.7 Buscar (`/p/buscar.html`)

**Función:** búsqueda de palabras o frases en el texto bíblico.

**Secciones:**
- Campo de búsqueda.
- Selector de versión.
- Filtros por testamento / libro.
- Lista de resultados paginada.
- Acceso directo a lectura del pasaje.
- Guardar favorito desde resultados.

**Nota técnica:** la Free Use Bible API no ofrece un endpoint nativo de búsqueda. La búsqueda se implementará en el cliente sobre los capítulos ya descargados, o bien sobre un índice ligero generado en build-time a partir de `/complete.json` para las versiones principales. El alcance exacto del buscador se definirá en Fase 4.

### 11.8 Mi espacio (`/p/mi-espacio.html`) — **página central del proyecto**

**Función:** panel personal del usuario. Es el eje del valor del sitio.

#### Pestañas internas

**Resumen**
- Plan activo y progreso.
- Racha actual.
- Versión preferida.
- Cantidad de favoritos y notas.
- Versículo diario.
- Botón **Continuar donde quedé**.

**Planes**
- Lista de planes activos y archivados.
- Fecha de inicio, progreso, última lectura.
- Acciones: Continuar / Reiniciar / Archivar / Cambiar plan activo.

**Favoritos**
- Pasajes guardados con referencia.
- Acceso rápido a cada uno.
- Filtro por libro/testamento.

**Notas**
- Listado con fecha y referencia.
- Editar / eliminar.
- Filtrar por plan o libro.

**Historial**
- Últimas lecturas abiertas.
- Últimas búsquedas.
- Últimos capítulos visitados.

**Configuración**
- Versión bíblica preferida.
- Modo claro/oscuro.
- Tamaño de texto.
- Plan por defecto.
- Modo del 29 de febrero (gracia / repetir).
- Visualización de versículos (por línea / corrido).

**Respaldo**
- Exportar datos (descarga JSON).
- Importar datos (subir JSON).
- **Recordatorio de respaldo** (banner que aparece cada N días sugiriendo exportar).
- Próximamente: sincronización en la nube.

### 11.9 Acerca del proyecto (`/p/acerca.html`)

- Propósito de la web.
- Cómo funciona.
- Cómo se guarda el progreso.
- Limitaciones del sistema local.
- Visión espiritual.
- Crédito a **Free Use Bible API** como fuente del texto bíblico.

### 11.10 Preguntas frecuentes (`/p/preguntas-frecuentes.html`)

- ¿Necesito registrarme?
- ¿Dónde se guarda mi progreso?
- ¿Qué pasa si borro los datos del navegador?
- ¿Puedo usar varios planes?
- ¿Puedo cambiar de versión?
- ¿Qué hago si me atraso?
- ¿Mis notas se sincronizan entre dispositivos?
- ¿Cómo respaldo mi información?
- ¿Cómo instalo el sitio como app en mi celular?
- ¿De dónde viene el texto bíblico?

### 11.11 Instalar como app (`/p/instalar.html`)

Página dedicada a explicar cómo agregar el sitio como acceso directo en pantalla de inicio. Ver sección 18.

---

## 12. Navegación

### 12.1 Menú principal (escritorio)
- Inicio
- Leer hoy
- Planes
- Biblia
- Buscar
- Mi espacio
- Acerca

### 12.2 Navegación móvil inferior (mobile-first)
- Inicio
- Leer hoy
- Planes
- Biblia
- Mi espacio

Esta barra inferior es crucial porque la mayoría del uso será móvil.

---

## 13. Flujos principales del usuario

### Flujo 1 — Usuario nuevo
1. Entra a Inicio.
2. Entiende rápidamente de qué trata la web.
3. Va a Planes.
4. Elige un plan.
5. Selecciona versión bíblica.
6. Inicia el plan → es llevado a Leer hoy.
7. Lee, marca como leído, guarda nota/favorito.
8. Empieza a usar Mi espacio.

### Flujo 2 — Usuario recurrente
1. Entra al sitio.
2. Ve resumen de avance en Inicio.
3. Pulsa **Continuar donde quedé**.
4. Lee contenido del día.
5. Marca como leído.
6. Su progreso se actualiza.

### Flujo 3 — Usuario explorador
1. Entra a Biblia o Buscar.
2. Consulta un pasaje libre.
3. Lo guarda en favoritos.
4. Añade una nota.
5. Lo revisa luego desde Mi espacio.

### Flujo 4 — Usuario con varios planes
1. Entra a Mi espacio → Planes.
2. Ve sus planes iniciados.
3. Cambia el plan activo.
4. Continúa en el día correspondiente.

### Flujo 5 — Usuario atrasado
1. Entra a Leer hoy.
2. El sistema detecta X días de atraso.
3. Se ofrecen dos opciones:
   - **Ponerme al día** (lee lecturas acumuladas).
   - **Saltar al día de hoy** (continúa desde hoy).
4. La racha se ajusta según la elección.

### Flujo 6 — Racha con gracia
- El sistema permite perder hasta **1 día por semana** sin romper la racha.
- Esto reduce la frustración y favorece la perseverancia.

---

## 14. Lógica del sistema

### 14.1 Responsabilidades del XML
- Layout global.
- Encabezado y pie.
- Menú principal y navegación móvil.
- Contenedores visuales.
- Soporte modo claro/oscuro (CSS vars).
- Integración limpia de scripts y estilos.

### 14.2 Responsabilidades de JavaScript
- Router por página (detectar URL actual).
- Gestión del estado global.
- Consultas a la Free Use Bible API (con caché en memoria).
- Renderizado de lecturas y versículos.
- Carga de planes.
- Manejo de progreso, favoritos y notas.
- Cálculo de día del plan (incluyendo bisiestos).
- Persistencia en localStorage.
- Exportar/importar respaldo.

### 14.3 Enrutamiento por página
Blogger no es SPA. Cada página se detecta por URL y se carga el módulo JS correspondiente:

| URL | Módulo JS |
|---|---|
| `/` | `home.js` |
| `/p/leer-hoy.html` | `leer-hoy.js` |
| `/p/planes.html` | `planes.js` |
| `/p/plan-completo.html` | `plan-completo.js` |
| `/p/biblia.html` | `biblia.js` |
| `/p/buscar.html` | `buscar.js` |
| `/p/mi-espacio.html` | `mi-espacio.js` |

---

## 15. Modelo de datos

### 15.1 Versiones (`versions.json`)

Este archivo es un **subconjunto curado** del catálogo devuelto por `available_translations.json` de la Free Use Bible API. Contiene solo las versiones en español que se ofrecerán al usuario.

```json
{
  "source": "https://bible.helloao.org/api/available_translations.json",
  "curatedAt": "2026-04-20",
  "defaultTranslationId": "RVR1909",
  "versions": [
    {
      "id": "RVR1909",
      "name": "Reina Valera (1909)",
      "shortName": "RV1909",
      "language": "spa",
      "active": true,
      "default": true
    },
    {
      "id": "OTRA_VERSION_ES",
      "name": "Nombre de la versión",
      "shortName": "XYZ",
      "language": "spa",
      "active": true
    }
  ]
}
```

> **Nota:** los IDs reales de cada versión (`RVR1909`, etc.) deben verificarse inspeccionando el JSON devuelto por `available_translations.json` antes de publicar este archivo. La versión marcada como `default: true` será la **Reina Valera** disponible en la API, coherente con el uso pastoral del proyecto.

### 15.2 Catálogo de planes (`plans.json`)
```json
{
  "plans": [
    {
      "id": "biblia-anual",
      "name": "Biblia en un año",
      "description": "Lectura completa de la Biblia en 365 días.",
      "duration": 365,
      "category": "completo",
      "readingsPerDay": 3,
      "active": true,
      "file": "plan-biblia-anual.json"
    }
  ]
}
```

### 15.3 Plan detallado (ejemplo día)
```json
{
  "id": "biblia-anual",
  "name": "Biblia en un año",
  "duration": 365,
  "days": [
    {
      "day": 1,
      "title": "El principio",
      "readings": [
        { "reference": "Génesis 1", "bookId": "GEN", "chapter": 1 },
        { "reference": "Salmos 1", "bookId": "PSA", "chapter": 1 },
        { "reference": "Mateo 1", "bookId": "MAT", "chapter": 1 }
      ],
      "devotional": "En el principio creó Dios los cielos y la tierra...",
      "reflection": "¿Qué significa que Dios sea el principio de todo?",
      "prayer": "Señor, que hoy reconozca tu señorío sobre mi vida."
    }
  ]
}
```

> **Importante:** cada `reading` incluye tanto la referencia humana (`"Génesis 1"`) como los identificadores técnicos (`bookId`, `chapter`) requeridos por la Free Use Bible API. Esto evita tener que parsear strings en tiempo de ejecución.

### 15.4 Datos del usuario (localStorage)
```json
{
  "version": "1.0",
  "lastSync": "2026-04-20",
  "config": {
    "preferredTranslationId": "RVR1909",
    "darkMode": false,
    "fontSize": "medium",
    "activePlanId": "biblia-anual",
    "leapYearMode": "gracia"
  },
  "plans": [
    {
      "planId": "biblia-anual",
      "startDate": "2026-01-01",
      "lastOpenedDay": 110,
      "completedDays": [1, 2, 3, 4, 5],
      "favorites": [110],
      "notes": [1, 5, 42],
      "status": "active",
      "streak": 5,
      "lastReadDate": "2026-04-19"
    }
  ],
  "favorites": [
    {
      "id": "fav-001",
      "reference": "Jeremías 29:11",
      "translationId": "RVR1909",
      "savedAt": "2026-04-19",
      "type": "verse",
      "note": ""
    }
  ],
  "notes": [
    {
      "id": "note-001",
      "planId": "biblia-anual",
      "day": 5,
      "reference": "Génesis 5",
      "content": "Texto de mi reflexión...",
      "createdAt": "2026-04-15",
      "updatedAt": "2026-04-15"
    }
  ],
  "history": {
    "readings": ["Génesis 1", "Salmos 1", "Mateo 1"],
    "searches": ["amor", "fe", "esperanza"],
    "chapters": ["Génesis 1", "Salmos 23"]
  }
}
```

---

## 16. Sistema de almacenamiento

### 16.1 Fase 1 — localStorage (MVP)
**Ventajas:**
- Implementación simple.
- No requiere backend.
- Ideal para Blogger.
- Respuesta instantánea.

**Limitaciones:**
- No sincroniza entre dispositivos.
- Se pierde si el usuario borra datos del navegador.
- Depende del mismo navegador en el mismo dispositivo.

### 16.2 Mitigaciones en Fase 1
- **Exportar/Importar JSON** muy visible desde Mi espacio.
- **Recordatorio automático** de respaldo cada 30 días.
- **Aviso claro** en la primera visita sobre el funcionamiento del almacenamiento.
- **Validación** del JSON al importar (evitar corrupción de datos).

### 16.3 Fase 2 — Respaldo en backend (roadmap)
Migrar a un backend real para:
- Sincronizar entre dispositivos.
- Cuentas de usuario.
- Respaldo automático en la nube.

**Opciones evaluadas:**

| Opción | Pros | Contras |
|---|---|---|
| **Supabase** | PostgreSQL, Auth listo, Row Level Security, free tier generoso | Curva inicial más grande |
| **PocketBase** | Simple, autoalojable, un solo binario, SDK JS directo | Requiere un servidor propio |
| **Firebase** | Maduro, Google-backed, realtime | Menos control, vendor lock-in |

**Recomendación:** **Supabase** para Fase 2, por facilidad de integración desde un sitio estático en Blogger y por su sistema de autenticación incluido.

### 16.4 Estrategia de migración
Cuando se active el backend, el localStorage se conservará como caché local. El flujo será:
1. Al iniciar sesión, se descarga el estado del backend.
2. Los cambios locales se sincronizan al backend en segundo plano.
3. Si no hay sesión, funciona como hoy (solo localStorage).

---

## 17. Funciones clave del producto

### Funciones principales (Fase 1-4)
- Leer la lectura del día consumiendo la Free Use Bible API.
- Iniciar, continuar, reiniciar y archivar planes.
- Marcar día como leído.
- Cambiar versión bíblica (desde el subconjunto curado en `versions.json`).
- Navegar libre por la Biblia.
- Buscar texto bíblico (implementación cliente).
- Guardar favoritos.
- Crear, editar y eliminar notas.
- Gestionar múltiples planes.
- Ver progreso y racha.
- Ver versículo diario.
- Ver historial.
- Exportar e importar datos.
- Manejo automático de año bisiesto.
- Manejo de atrasos.

### Funciones futuras (Fase 5+)
- Sincronización en la nube (Supabase).
- Cuentas de usuario reales.
- Compartir progreso.
- Estadísticas avanzadas.
- Recordatorios (sin push, por email u otro canal).
- Audio bíblico.
- Lectura dramatizada.
- Metas semanales.
- Modo estudio con comentarios bíblicos (evaluar en ese momento si activar los endpoints de comentarios de la API).

---

## 18. Instalación "tipo app" (sin PWA)

### 18.1 Por qué no PWA
Blogger no permite alojar archivos como `service-worker.js` ni `manifest.json` en su raíz, lo cual es requisito para una PWA completa. Existen workarounds (Cloudflare Workers, jsDelivr) pero aumentan la complejidad del proyecto sin un beneficio decisivo frente a un acceso directo bien documentado.

### 18.2 Experiencia "tipo app" que sí lograremos
- Diseño visual app-like (sin apariencia de blog).
- Navegación inferior tipo app móvil.
- Íconos claros y estados visuales por acción.
- Ocultar elementos de Blogger (navbar, widgets por defecto).
- Incluir meta-tags `apple-mobile-web-app-capable` y similares, que ayudan a que iOS 26+ abra el sitio en modo standalone automáticamente al añadirlo al inicio.

### 18.3 Página `/p/instalar.html`

#### Android (Chrome, Edge, Brave)
1. Abre el sitio en el navegador.
2. Toca el menú de tres puntos (⋮) arriba a la derecha.
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar app"**.
4. Confirma con **Agregar**.
5. El ícono aparecerá en tu pantalla de inicio.

#### Android (Samsung Internet)
1. Abre el sitio.
2. Toca el menú (☰) abajo.
3. Selecciona **"Agregar página a"** → **"Pantalla de inicio"**.

#### iPhone / iPad (Safari)
1. Abre el sitio en **Safari** (importante: no funciona desde Chrome en iOS).
2. Toca el botón **Compartir** (cuadrado con flecha hacia arriba).
3. Baja y selecciona **"Agregar al inicio"**.
4. Edita el nombre si deseas y toca **Agregar**.
5. En iOS 26+, se abrirá como web app por defecto (asegúrate que el toggle "Abrir como Web App" esté activado).

#### Windows (Chrome, Edge)
1. Abre el sitio.
2. Click en el menú (⋮).
3. **Más herramientas** → **Crear acceso directo...**
4. Marca **"Abrir como ventana"** para experiencia tipo app.
5. Click en **Crear**.

#### Mac (Safari)
1. Abre el sitio.
2. Menú **Compartir** → **Agregar al Dock**.

### 18.4 Meta-tags a incluir en el XML
Aun sin PWA completa, estos tags mejoran la experiencia al agregar al inicio:
```html
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="apple-mobile-web-app-title" content="Mi Biblia"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="theme-color" content="#2c3e50"/>
<link rel="apple-touch-icon" href="/favicon-192.png"/>
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png"/>
```

---

## 19. Diseño y experiencia de usuario

### 19.1 Estilo visual
- Limpio, moderno, sobrio.
- Espiritual pero no cursi.
- Legible, enfocado en lectura.
- Tipografía sans-serif de alta legibilidad (ejemplo: Inter, Nunito, Poppins).
- Espaciado generoso.
- Paleta sobria con acentos cálidos (azules profundos, dorados suaves, beige).

### 19.2 Debe evitar
- Apariencia de blog tradicional.
- Exceso de cajas o widgets antiguos.
- Saturación visual.
- Colores llamativos sin propósito.
- Look de revista o portal de noticias.

### 19.3 Mobile first
La mayoría del uso será móvil. Prioridades:
- Navegación inferior fija.
- Botón grande de "Leer hoy".
- Texto bíblico con tipografía cómoda.
- Controles táctiles generosos (mínimo 44×44 px).
- Modo oscuro disponible.

### 19.4 Elementos visuales recomendados
- Tarjetas para planes.
- Barra de progreso clara.
- Indicador del día actual en calendario.
- Estados visuales por día (completado, nota, favorito).
- Botones de acción primaria destacados.
- Iconos consistentes (sugerido: Lucide o similar).
- Transiciones suaves (sin ser excesivas).

### 19.5 Principios de experiencia
- Acceso rápido a la lectura del día en 1 tap.
- Facilidad para continuar donde quedó.
- Claridad sobre cuál es el plan activo.
- Progreso siempre visible.
- Facilidad para guardar notas y favoritos.
- Sensación de acompañamiento, no de obligación.

---

## 20. Enfoque espiritual

El proyecto debe transmitir que la lectura bíblica no es una tarea mecánica, sino una forma de:

- Conocer a Dios más íntimamente.
- Crecer espiritualmente cada día.
- Perseverar en la Palabra.
- Desarrollar disciplina devocional sana.
- Meditar y obedecer la Escritura.

### Tono de los microtextos
- Cercanía y guía (no legalismo).
- Reverencia sin rigidez.
- Claridad pastoral.
- Motivación sana (sin manipulación emocional).
- Esperanza constante.

### Ejemplos de microtextos
- En lugar de "Has fallado 3 días" → "Retomemos juntos desde hoy".
- En lugar de "Racha rota" → "Nuevo comienzo".
- En lugar de "Lectura completada" → "¡Bien! Un día más en Su Palabra".
- Al iniciar un plan: "Que el Señor te guíe y te sostenga en este recorrido."
- Al completar un plan: "Has completado un año en Su Palabra. Gloria a Dios."

### Versículo de bienvenida sugerido
> "Y estas palabras que yo te mando hoy, estarán sobre tu corazón." — Deuteronomio 6:6 (RV60)

---

## 21. Estructura sugerida de archivos del proyecto

```
mibiblia365/
├── blogger/
│   └── template.xml                 # Plantilla Blogger principal
│
├── CDN/                             # Archivos servidos vía jsDelivr
│   ├── data/
│   │   ├── versions.json            # Subconjunto curado desde Free Use Bible API
│   │   ├── plans.json
│   │   ├── plan-biblia-anual.json
│   │   ├── plan-cronologico.json
│   │   ├── plan-nt.json
│   │   ├── plan-salmos-proverbios.json
│   │   ├── plan-90-dias.json
│   │   ├── versiculos-diarios.json
│   │   └── config.json
│   │
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   ├── dark-mode.css
│   │   └── responsive.css
│   │
│   └── js/
│       ├── app.js                   # Entry point y router
│       ├── config.js                # Configuración global (incluye API_BASE)
│       ├── services/
│       │   ├── bibleService.js      # Cliente Free Use Bible API + caché
│       │   ├── planService.js       # Carga y gestión de planes
│       │   ├── storageService.js    # localStorage + import/export
│       │   ├── streakService.js     # Cálculo de rachas
│       │   └── dateService.js       # Manejo de fechas y bisiestos
│       │
│       ├── pages/
│       │   ├── home.js
│       │   ├── leer-hoy.js
│       │   ├── planes.js
│       │   ├── plan-completo.js
│       │   ├── biblia.js
│       │   ├── buscar.js
│       │   ├── mi-espacio.js
│       │   └── instalar.js
│       │
│       ├── components/
│       │   ├── progressBar.js
│       │   ├── versionSelector.js
│       │   ├── verseCard.js
│       │   └── navigation.js
│       │
│       └── utils/
│           ├── domUtils.js
│           └── formatUtils.js
```

---

## 22. Fases de desarrollo

### Fase 1 — Base del sitio (2-3 semanas)
- Plantilla XML con layout, menú, navegación móvil.
- CSS base y sistema de diseño.
- Página Inicio funcional.
- Página Acerca, FAQ, Instalar.
- Meta-tags de instalación tipo app.

### Fase 2 — Lectura diaria (2-3 semanas)
- Servicio `bibleService.js` consumiendo Free Use Bible API.
- Curar `versions.json` desde `available_translations.json`.
- Página Leer hoy.
- Página Planes.
- Carga dinámica de JSON desde jsDelivr.
- Selector de versión.

### Fase 3 — Lógica personal (2-3 semanas)
- localStorage completo.
- Progreso, rachas, favoritos, notas.
- Mi espacio con todas sus pestañas.
- Exportar/importar JSON.
- Manejo de atrasos y año bisiesto.

### Fase 4 — Exploración bíblica (1-2 semanas)
- Página Biblia.
- Buscador bíblico (índice cliente).
- Plan completo (calendario).
- Historial de lecturas.

### Fase 5 — Pulido y lanzamiento (1-2 semanas)
- Modo oscuro.
- Optimización móvil.
- Ajustes de UX.
- Pruebas cruzadas de dispositivos.
- SEO básico (meta-tags, sitemap, Open Graph).

### Fase 6 — Backend real (cuando sea necesario)
- Migración a Supabase.
- Cuentas de usuario.
- Sincronización entre dispositivos.
- Notificaciones por correo.

---

## 23. Riesgos identificados y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Caída de la Free Use Bible API | Alto | API alojada en AWS (alta disponibilidad); caché en memoria + caché opcional de capítulos ya leídos en localStorage; mensajes de error amigables con reintento |
| Cambios en el esquema JSON de la API | Medio | Encapsular toda la lógica de API en `bibleService.js` para aislar el resto de la app |
| Pocas versiones en español disponibles en el catálogo | Medio | Curar con cuidado el subconjunto inicial; documentar claramente qué versiones se ofrecen; abrir posibilidad a incluir más traducciones si la API las agrega en el futuro |
| Pérdida de datos por borrado de navegador | Alto | Recordatorio de respaldo + Fase 6 (backend) |
| Caché de jsDelivr tras cambios en JSON | Medio | Usar tags de versión o hash del commit |
| SEO limitado por contenido cargado por JS | Medio | Publicar versículo del día como HTML estático |
| Cambios en Blogger que rompan la plantilla | Bajo | Backup regular de la plantilla XML |
| iOS 26 cambia comportamiento de "Add to Home Screen" | Bajo | Meta-tags ya preparados para ese flujo |

---

## 24. Criterios de éxito

El proyecto será exitoso si:

- Un usuario nuevo puede iniciar un plan en menos de 60 segundos.
- Un usuario recurrente puede retomar su lectura en 1 tap.
- El progreso se conserva confiablemente entre sesiones.
- El 90% de los usuarios puede instalarlo como acceso directo siguiendo la guía.
- La experiencia móvil se siente fluida, no como un blog.
- El usuario percibe acompañamiento espiritual, no solo una herramienta técnica.
- La lectura del día carga en menos de 2 segundos en conexión 4G promedio.

---

## 25. Definición final del proyecto

> **Mi Biblia 365** es una plataforma web tipo app devocional construida sobre Blogger, que permite a los cristianos leer la Biblia mediante múltiples planes y versiones en español, apoyándose en la **Free Use Bible API** (única fuente de texto bíblico), datos JSON servidos por jsDelivr, y un espacio personal completo para gestionar progreso, favoritos y notas. El proyecto no depende de posts, funciona sin registro en su primera fase, se puede instalar como acceso directo en cualquier dispositivo, y está diseñado con el propósito pastoral de acompañar al creyente en su perseverancia devocional. Los recursos adicionales de la API (comentarios y datasets) quedan explícitamente fuera del alcance del producto.

---

## 26. Próximos pasos recomendados

1. **Validar la Free Use Bible API hoy mismo** con una prueba mínima: un HTML que consuma `/api/available_translations.json`, filtre por idioma español y renderice la lista de versiones disponibles.
2. **Probar la lectura de un capítulo** concreto (ej. Juan 3) en una versión Reina Valera para confirmar el formato JSON de respuesta.
3. **Curar `versions.json`** con el subconjunto final de versiones en español que se ofrecerán al usuario.
4. **Crear el repositorio GitHub** con la estructura de carpetas definida en sección 21.
5. **Subir los primeros JSON** (`versions.json`, `config.json`) y probar el acceso vía jsDelivr.
6. **Generar íconos** (favicon 192×192 y 512×512) para meta-tags tipo app.
7. **Diseñar moodboard visual** antes de comenzar el XML.
8. **Definir paleta de colores y tipografía** del proyecto.
9. **Crear la plantilla XML base** con meta-tags y layout inicial.
10. **Construir `plan-biblia-anual.json`** con los 365 días, incluyendo `bookId` y `chapter` de cada lectura.
11. **Construir `versiculos-diarios.json`** con 366 entradas siguiendo línea temática mensual.

---

*Documento unificado. Versión 3.1 — Migración a Free Use Bible API. Abril 2026.*