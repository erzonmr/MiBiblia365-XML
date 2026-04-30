# Bible API Docs

**URL Base:** `https://bible-api.deno.dev`

Documentación de la API REST para consulta de libros, versículos, capítulos y versiones de la Biblia.

---

## Contenido

1. [Endpoints de Libros (Books)](#1-endpoints-de-libros-books)
   - [Obtener un libro específico](#obtener-un-libro-específico)
   - [Obtener todos los libros](#obtener-todos-los-libros)
   - [Libros por testamento](#libros-por-testamento)
2. [Endpoint de Búsqueda (Search)](#2-endpoint-de-búsqueda-search)
3. [Endpoint de Versiones (Versions)](#3-endpoint-de-versiones-versions)
4. [Endpoint de Versículos (Verses)](#4-endpoint-de-versículos-verses)
5. [Endpoint de Capítulos (Chapter)](#5-endpoint-de-capítulos-chapter)
6. [Ejemplos de Uso](#6-ejemplos-de-uso)

---

## 1. Endpoints de Libros (Books)

### Obtener un libro específico

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/book/<BookName>` |

La propiedad `BookName` debe ser un libro de la Biblia válido o una de sus abreviaturas soportadas.

Devuelve la información de un libro específico de la Biblia.

#### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/book/genesis"
```

#### Response

```typescript
interface ResponseBook {
  name: string;
  abrev: string;
  chapters: number;
  testament: string;
}
```

#### Ejemplo de respuesta

```json
{
  "name": "Genesis",
  "abrev": "GEN",
  "chapters": 50,
  "testament": "Antiguo Testamento"
}
```

### Obtener todos los libros

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/books` |

Devuelve el listado completo de todos los libros de la Biblia.

#### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/books"
```

#### Interface de la response

```typescript
interface Book {
  name: string;
  abrev: string;
  chapters: number;
  testament: string;
}

type Books = Book[];
```

#### Ejemplo de respuesta

```json
[
  {
    "name": "Genesis",
    "abrev": "GN",
    "chapters": 50,
    "testament": "Antiguo Testamento"
  },
  {
    "name": "Exodo",
    "abrev": "EX",
    "chapters": 40,
    "testament": "Antiguo Testamento"
  },
  {
    "name": "Levitico",
    "abrev": "LV",
    "chapters": 27,
    "testament": "Antiguo Testamento"
  }
]
```

### Libros por testamento

#### Libros del Antiguo Testamento

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/books/oldTestament` |

Devuelve todos los libros cuya propiedad `testament` sea igual a `"Antiguo Testamento"`.

#### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/books/oldTestament"
```

#### Libros del Nuevo Testamento

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/books/newTestament` |

Devuelve todos los libros cuya propiedad `testament` sea igual a `"Nuevo Testamento"`.

#### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/books/newTestament"
```

#### Interface de la response (ambos endpoints)

```typescript
type Books = Book[];
```

---

## 2. Endpoint de Búsqueda (Search)

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/read/<Version>/search` |

Permite buscar versículos que coincidan con una query de texto dentro de una versión específica de la Biblia.

### Parámetros de query

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `q` | `string` | **Sí** | Texto a buscar dentro de los versículos. |
| `testament` | `"old" \| "new" \| "both"` | No | Filtra por testamento. Valor por defecto: `"both"`. |
| `take` | `number` | No | Número de resultados por página. |
| `page` | `number` | No | Número de página a consultar. |

#### Interface de parámetros

```typescript
interface Parameters {
  q: string;
  testament?: "old" | "new" | "both";
  take?: number;
  page?: number;
}
```

### Response

> **Nota:** La propiedad `data` puede venir como un arreglo vacío `[]` si no se encuentran coincidencias.

```typescript
type VerseFound = {
  verse: string;
  study: string;
  number: number;
  id: number;
  book: string;
  chapter: number;
};

interface SearchResponse {
  data: VerseFound[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}
```

### Ejemplos

#### Búsqueda mínima

```bash
curl -X GET "https://bible-api.deno.dev/api/read/nvi/search?q=Dios"
```

#### Búsqueda con paginación (`take` y `page`)

Trae 5 versículos que coincidan con "Dios", correspondientes a la página 2:

```bash
curl -X GET "https://bible-api.deno.dev/api/read/nvi/search?q=Dios&take=5&page=2"
```

#### Búsqueda filtrada por testamento

Trae 5 versículos de la página 2 buscando solo en el Nuevo Testamento:

```bash
curl -X GET \
  "https://bible-api.deno.dev/api/read/nvi/search?q=Dios&take=5&page=2&testament=new"
```

---

## 3. Endpoint de Versiones (Versions)

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/versions` |

Devuelve el listado de todas las versiones de la Biblia disponibles en la API.

#### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/versions"
```

#### Interface de la response

```typescript
interface Version {
  name: string;
  version: string;
  uri: string;
}

type Versions = Version[];
```

#### Ejemplo de respuesta

```json
[
  {
    "name": "Reina Valera 1960",
    "version": "rv1960",
    "uri": "/api/read/rv1960"
  },
  {
    "name": "Reina Valera 1995",
    "version": "rv1995",
    "uri": "/api/read/rv1995"
  },
  {
    "name": "Nueva versión internacional",
    "version": "nvi",
    "uri": "/api/read/nvi"
  },
  {
    "name": "Dios habla hoy",
    "version": "dhh",
    "uri": "/api/read/dhh"
  },
  {
    "name": "Palabra de Dios para todos",
    "version": "pdt",
    "uri": "/api/read/pdt"
  },
  {
    "name": "King James Version",
    "version": "kjv",
    "uri": "/api/read/kjv"
  }
]
```

---

## 4. Endpoint de Versículos (Verses)

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/read/<Version>/<BookName|Abrev>/<Chapter>/<Verse|Range>` |

Devuelve uno o varios versículos específicos según la referencia bíblica solicitada.

### Condiciones y validaciones

| Parámetro | Descripción | Referencia |
|-----------|-------------|------------|
| `<Version>` | Debe ser una versión válida soportada por la API. | Ver sección [Versions](#3-endpoint-de-versiones-versions) |
| `<BookName>` | Nombre válido del libro dentro de la versión solicitada. | Ver sección [Books](#1-endpoints-de-libros-books) |
| `<Abrev>` | Abreviatura válida del libro. | Ver sección [Books](#1-endpoints-de-libros-books) |
| `<Chapter>` | Número de capítulo válido dentro del libro. | — |
| `<Verse>` | Número de versículo válido dentro del capítulo. | — |
| `<Range>` | Rango de versículos válido dentro del capítulo (ej: `1-3`). | — |

### Ejemplos de peticiones

#### Obtener por nombre del libro

```bash
curl -X GET "https://bible-api.deno.dev/api/read/rv1960/genesis/1/1-3"
```

#### Obtener por abreviatura del libro

```bash
curl -X GET "https://bible-api.deno.dev/api/read/rv1960/gn/1/1-3"
```

### Interface de la Response

```typescript
export interface Verse {
  verse: string;
  number: number;
  study: string;
  id: number;
}

type Verses = Verse[];
```

### Ejemplo de respuesta

```json
[
  {
    "verse": "En el principio creó Dios los cielos y la tierra.",
    "number": 1,
    "study": "La Creación",
    "id": 1
  },
  {
    "verse": "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.",
    "number": 2,
    "id": 2
  },
  {
    "verse": "Y dijo Dios: Sea la luz; y fue la luz.",
    "number": 3,
    "id": 3
  }
]
```

---

## 5. Endpoint de Capítulos (Chapter)

| Propiedad | Valor |
|-----------|-------|
| **Método** | `GET` |
| **Endpoint** | `/api/read/<Version>/<BookName|Abrev>/<Chapter>` |

Devuelve el capítulo completo con todos sus versículos.

### Condiciones y validaciones

| Parámetro | Descripción | Referencia |
|-----------|-------------|------------|
| `<Version>` | Debe ser una versión válida soportada por la API. | Ver sección [Versions](#3-endpoint-de-versiones-versions) |
| `<BookName>` | Nombre válido del libro dentro de la versión solicitada. | Ver sección [Books](#1-endpoints-de-libros-books) |
| `<Abrev>` | Abreviatura válida del libro. | Ver sección [Books](#1-endpoints-de-libros-books) |
| `<Chapter>` | Número de capítulo válido dentro del libro. | — |

### Ejemplo de petición

```bash
curl -X GET "https://bible-api.deno.dev/api/read/rv1960/genesis/1"
```

### Interface de la Response

```typescript
export interface Verse {
  verse: string;
  number: number;
  study: string;
  id: number;
}

export interface Chapter {
  testament: string;
  name: string;
  num_chapters: number;
  chapter: number;
  vers: Verse[];
}
```

### Ejemplo de respuesta

```json
{
  "testament": "old",
  "name": "Genesis",
  "num_chapters": 50,
  "chapter": 1,
  "vers": [
    {
      "verse": "En el principio creó Dios los cielos y la tierra.",
      "number": 1,
      "study": "La Creación",
      "id": 1
    },
    {
      "verse": "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.",
      "number": 2,
      "id": 2
    },
    {
      "verse": "Y dijo Dios: Sea la luz; y fue la luz.",
      "number": 3,
      "id": 3
    }
  ]
}
```

---

## 6. Ejemplos de Uso

### Obtener un capítulo de un libro

```http
GET https://bible-api.deno.dev/api/read/salmos/23
```

```bash
curl -X GET "https://bible-api.deno.dev/api/read/salmos/23"
```

### Obtener información de un libro

```http
GET https://bible-api.deno.dev/api/book/genesis
```

```bash
curl -X GET "https://bible-api.deno.dev/api/book/genesis"
```

### Obtener un versículo específico

```http
GET https://bible-api.deno.dev/api/read/nvi/proverbios/1/1
```

```bash
curl -X GET "https://bible-api.deno.dev/api/read/nvi/proverbios/1/1"
```

### Obtener un rango de versículos

```http
GET https://bible-api.deno.dev/api/read/nvi/mateo/16/5-10
```

```bash
curl -X GET "https://bible-api.deno.dev/api/read/nvi/mateo/16/5-10"
```

---

## Resumen de Endpoints

| Recurso | Método | Endpoint | Descripción |
|---------|--------|----------|-------------|
| Libro específico | `GET` | `/api/book/<BookName>` | Información de un libro. |
| Todos los libros | `GET` | `/api/books` | Listado completo de libros. |
| Antiguo Testamento | `GET` | `/api/books/oldTestament` | Libros del Antiguo Testamento. |
| Nuevo Testamento | `GET` | `/api/books/newTestament` | Libros del Nuevo Testamento. |
| Buscar versículos | `GET` | `/api/read/<Version>/search` | Búsqueda por texto con filtros. |
| Versiones | `GET` | `/api/versions` | Listado de versiones disponibles. |
| Versículo(s) | `GET` | `/api/read/<Version>/<Book>/<Chapter>/<Verse\|Range>` | Obtener versículo o rango. |
| Capítulo | `GET` | `/api/read/<Version>/<Book>/<Chapter>` | Obtener capítulo completo. |

---

## Notas adicionales

- Todos los endpoints son **públicos** y no requieren autenticación.
- La API devuelve respuestas en formato **JSON**.
- Se recomienda usar **abreviaturas** cuando se consulten libros para reducir errores de escritura en nombres largos.
- El parámetro `<Version>` es obligatorio en todos los endpoints de lectura (`search`, `verses`, `chapter`).
