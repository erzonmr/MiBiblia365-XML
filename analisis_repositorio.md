# Análisis del Repositorio: MiBiblia365-XML

Este repositorio contiene el código del proyecto **Mi Biblia 365**, una aplicación web tipo dashboard devocional diseñada para funcionar directamente sobre la plataforma de **Blogger** usando plantillas XML.

---

## 1. Arquitectura General y Concepto del Proyecto

El proyecto tiene una arquitectura particular: es una **Single Page Application (SPA) sobre Blogger**. En lugar de usar Blogger como un blog tradicional de artículos cronológicos, se aprovecha su sistema de enrutamiento estático de páginas (`/p/*.html`) y se utiliza JavaScript en el cliente para controlar dinámicamente qué pantalla se renderiza dentro de un único contenedor principal.

### Tecnologías Utilizadas:
*   **Blogger XML / XHTML**: Define el maquetado base, los meta-tags para SEO y PWA (instalable en móviles), y sirve de cascarón para la UI.
*   **JavaScript (Vanilla ES5/ES6)**: Encargado de la lógica de enrutamiento, consumo de APIs bíblicas, gestión de planes de lectura, control de rachas (streaks), notas, favoritos y persistencia local.
*   **CSS Limpio (Design Tokens)**: Variables de diseño centralizadas con soporte para modo oscuro nativo (`[data-theme="dark"]`).
*   **APIs Bíblicas Externas (Doble Fuente)**:
    1.  [API de HelloAO](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/docs_APIs/API_Biblica_HelloAO.md) (`https://bible.helloao.org`)
    2.  [API Bíblica Netlify (Deno/Netlify)](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/docs_APIs/API_Biblica_Netlify.md) (`https://docs-bible-api.netlify.app/api` / `https://bible-api.deno.dev`)
    Se utiliza un sistema de **fallback automático** en runtime para garantizar disponibilidad de las traducciones en español.
*   **Distribución por CDN**: Los recursos JSON (planes y configuraciones) y scripts pesados se sirven mediante jsDelivr directamente desde este repositorio de GitHub.

---

## 2. Estructura de Archivos del Repositorio

A continuación se detalla la estructura y el rol de cada archivo principal:

### 📄 Plantilla de Blogger Principal
*   [template-ZIA.xml](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml): Es la **fuente de verdad principal del proyecto**. Es el archivo XML que se importa en la interfaz de Blogger. Contiene:
    *   Estructura HTML básica e inyección de hojas de estilo.
    *   Un sistema de diseño completo a través de variables CSS.
    *   La lógica principal del enrutador en JS que detecta la URL actual mediante [detectCurrentPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L1677) y renderiza la sección correspondiente.
    *   Controladores de renderizado para cada sección: [renderLeerHoyPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2263), [renderPlanesPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2515), [renderBibliaPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2811), [renderBuscarPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2898), [renderPlanCompletoPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2990) y [renderMiEspacioPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L3048).

### 📁 CDN (Recursos Estáticos Compartidos)
*   **Scripts:**
    *   [CDN/js/app.js](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js): Script standalone expuesto en el espacio de nombres global `window.MiBiblia365`. Maneja helpers reutilizables para almacenamiento local ([MiBiblia365.Storage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L18)), planes de lectura ([MiBiblia365.Plans](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L33)), favoritos ([MiBiblia365.Favorites](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L71)), notas ([MiBiblia365.Notes](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L87)), racha ([MiBiblia365.Streak](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L99)) y el servicio de consumo bíblico ([MiBiblia365.BibleService](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/js/app.js#L151)).
*   **Estilos:**
    *   [CDN/css/base.css](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/css/base.css): Reset CSS, variables y tipografías.
    *   [CDN/css/layout.css](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/css/layout.css): Estructura del grid principal para escritorio y móvil.
    *   [CDN/css/components.css](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/CDN/css/components.css): Estilos de componentes visuales (tarjetas, botones, selectores, skeletons de carga, etc.).

### 📁 JSON (Archivos de Configuración y Planes de Lectura)
*   [json/config.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/config.json): Configuración de preferencias por defecto (idioma, plan de lectura inicial, comportamiento de año bisiesto y APIs primarias/secundarias).
*   [json/plans.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/plans.json): Catálogo de planes de lectura bíblica disponibles.
*   [json/versions.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/versions.json): Listado estructurado de traducciones disponibles en español, mapeando sus IDs contra las APIs.
*   [json/versiculos-diarios.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/versiculos-diarios.json): Un set curado de versículos diarios para mostrar en el "Home" de la aplicación.
*   **Planes detallados:** Archivos JSON individuales que contienen la distribución día a día de las lecturas para cada plan específico:
    *   [Plan_Anual.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_Anual.json) (Biblia completa en un año).
    *   [Plan_Cronologico.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_Cronologico.json).
    *   [Plan_Canónico.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_Canónico.json).
    *   [Plan_180_NT_Salmos.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_180_NT_Salmos.json).
    *   [Plan_Combinado.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_Combinado.json).
    *   [Plan_Trimestral.json](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/json/Plan_Trimestral.json).

### 📁 Docs de APIs
*   [docs_APIs/API_Biblica_HelloAO.md](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/docs_APIs/API_Biblica_HelloAO.md): Información de límites y endpoints del proveedor primario/secundario de texto bíblico HelloAO.
*   [docs_APIs/API_Biblica_Netlify.md](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/docs_APIs/API_Biblica_Netlify.md): Manual de uso del Netlify Deno Bible API.

---

## 3. Estado de Desarrollo y Progreso del Roadmap

De acuerdo al plan definido en [Roadmap.md](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/Roadmap.md) y al registro de tareas manuales en [Instrucciones.md](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/Instrucciones.md):

*   **Fase 0 — Validación y preparación**: Completada. Se validaron APIs, CDN de jsDelivr y se configuró el blog inicial con dominio propio.
*   **Fase 1 — Base del sitio**: Completada. Plantilla XML integrada en Blogger con maquetado PWA y páginas estáticas de soporte (Acerca de, FAQ, Guía de instalación).
*   **Fase 2 — Lectura diaria**: Completada. Implementación de carga de planes y lectura desde APIs en la sección "Leer hoy" con selector de traducción.
*   **Fase 3 — Lógica personal**: Completada. Funciones de guardar notas, favoritos, registro de avance y sistema de exportación/importación de respaldos JSON.
*   **Fase 4 — Exploración bíblica**: **En Progreso**.
    *   *Biblia Libre:* Completada (selector manual de libro/capítulo).
    *   *Plan Completo:* Completado (vista de calendario por mes).
    *   *Buscador:* **Falla Parcialmente** (Ver detalle abajo).

### Problema Identificado en el Buscador 🔍:
En la función [renderBuscarPage](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L2898), la búsqueda está limitada a capítulos que el usuario **ya ha indexado localmente** en `state.user.history.chapters`.
Si el usuario busca una palabra como `"Dios"`, el sistema intenta buscarla solo en la lista de capítulos visitados previamente por el navegador. Si no hay capítulos visitados, o si la palabra está en capítulos no leídos, la interfaz muestra el error: 
> *"No encontramos resultados en los capítulos indexados localmente. Abre más capítulos desde Biblia para ampliar la búsqueda."*

Para hacer que la búsqueda sea universal o sustancialmente mejor, hay dos opciones según el Roadmap:
1.  Consumir el endpoint `/complete.json` de una traducción para indexar/buscar en local (pesa varios MB, por lo que requiere analizar rendimiento).
2.  Utilizar capacidades de búsqueda nativas de alguna de las APIs si existen en sus especificaciones.

---

## 4. Flujo de Datos del Usuario (LocalStorage)

Los datos del usuario se serializan en una única clave en `localStorage` llamada `mibiblia365_data` bajo el siguiente formato (ver [createDefaultUserData](file:///C:/Users/pasto/OneDrive/Documentos/GitHub/MiBiblia365-XML/template-ZIA.xml#L1738)):

```json
{
  "version": "1.1",
  "lastSync": "YYYY-MM-DD",
  "backupMeta": {
    "lastBackupAt": null,
    "backupReminderDays": 30
  },
  "config": {
    "preferredVersion": "RV1960",
    "sourcePreference": "auto",
    "darkMode": false,
    "fontSize": "medium",
    "activePlanId": null,
    "leapYearMode": "gracia"
  },
  "plans": [],
  "favorites": [],
  "notes": [],
  "streak": {
    "current": 0,
    "longest": 0,
    "totalReadDays": 0,
    "lastDate": null,
    "graceDaysUsed": 0,
    "graceDaysAvailable": 1,
    "graceWeekKey": "YYYY-WXX"
  },
  "history": {
    "readings": [],
    "searches": [],
    "chapters": []
  }
}
```

---

## 5. Recomendaciones de Próximos Pasos

1.  **Resolver la Búsqueda (Fase 4.2)**: Analizar la descarga del archivo `complete.json` de HelloAO (por ejemplo `spa_r09/complete.json` que es Reina Valera) y evaluar si el rendimiento de búsqueda local en cliente es el adecuado sin saturar memoria móvil.
2.  **Sincronización Cloud (Fase 6)**: Una vez refinada la UI y las funcionalidades offline de la Fase 5, se planea integrar un backend ligero (como Supabase) para permitir que los usuarios guarden su racha y notas entre múltiples dispositivos sin depender enteramente del almacenamiento local del navegador (`localStorage`).
