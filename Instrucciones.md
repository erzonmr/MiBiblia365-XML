# Instrucciones operativas y registro manual

## Fase 0 — Registro de tareas manuales

### 1) Validación de APIs (pendiente de red externa en entorno local)
- Abrir `test-api.html` en navegador (ideal: localhost o archivo local) y ejecutar pruebas.
- Verificar:
  - Catálogo de traducciones desde HelloAO.
  - Catálogo de versiones desde Netlify.
  - Filtro de traducciones en español.
  - Carga de capítulo con fallback entre fuentes.
- Registrar tiempos objetivo: `< 1000ms` por capítulo en condiciones normales.

### 2) Validación de jsDelivr
- Probar URL:
  - `https://cdn.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main/test.json`
- Actualizar `test.json` y verificar comportamiento de caché.
- Estrategia recomendada de invalidación:
  - Desarrollo: fijar hash de commit (`@<sha>`).
  - Producción estable: usar tags (`@v0.x.y`) y publicar nuevo tag en cambios de datos.

### 3) Curaduría de versiones en español
- Revisar `json/versions.json` y validar que los IDs sigan vigentes en ambas APIs.
- Mantener `rv1960` como versión por defecto salvo nueva decisión de producto.

### 4) Blogger (pendiente manual)
- Completar meta-descripciones y opciones de búsqueda del blog.
- Mantener el mapeo de rutas `/p/*.html` ya definido en Roadmap.
