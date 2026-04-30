# API Bíblica HelloAO - Documentación Completa

## Tabla de Contenidos

- [Introducción](#introducción)
- [Acerca de Nosotros](#acerca-de-nosotros)
- [Nota Importante sobre Traducciones](#nota-importante-sobre-traducciones)
- [Inicio Rápido](#inicio-rápido)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Guía de Uso](#guía-de-uso)
  - [Obtener Traducciones Disponibles](#obtener-traducciones-disponibles)
  - [Listar Libros de una Traducción](#listar-libros-de-una-traducción)
  - [Obtener un Capítulo](#obtener-un-capítulo)
  - [Obtener una Traducción Completa](#obtener-una-traducción-completa)
  - [Trabajar con Comentarios](#trabajar-con-comentarios)
  - [Trabajar con Datasets](#trabajar-con-datasets)
- [Referencia Completa de la API](#referencia-completa-de-la-api)
- [Estructuras de Datos](#estructuras-de-datos)

---

## Introducción

La Biblia, la inspirada palabra de Dios, es el conjunto de documentos más importante en la historia del mundo. Ha sido estudiada por innumerables generaciones de culturas de todo el mundo y contiene muchas verdades fundamentales sobre las cuales se construye nuestra existencia.

Esta API proporciona acceso **gratuito** a la Biblia y recursos relacionados en un formato optimizado para su uso por aplicaciones.

**Recursos:**
- Sitio web: [https://bible.helloao.org](https://bible.helloao.org)
- Documentación: [https://bible.helloao.org/docs/](https://bible.helloao.org/docs/)
- Código fuente: [https://github.com/HelloAOLab/bible-api](https://github.com/HelloAOLab/bible-api)
- YouTube: [@aolab](https://www.youtube.com/@aolab)
- Donaciones: [https://better.giving/marketplace/1118469](https://better.giving/marketplace/1118469)

---

## Acerca de Nosotros

**AO Lab** ([https://helloao.org/](https://helloao.org/)) es una organización sin fines de lucro dedicada a amar y vivir la Palabra de Dios. 

El objetivo de este proyecto es hacer que la Biblia (y recursos relacionados) estén libremente disponibles para cualquiera que la necesite, en un formato optimizado para aplicaciones.

### Asociación con Berean Bible

Estamos emocionados de asociarnos con el equipo de **BSB (Berean Study Bible)**. Sin su ayuda y apoyo, esta API no estaría disponible.

Más información sobre la BSB: [https://bereanbibles.com/about-berean-study-bible/](https://bereanbibles.com/about-berean-study-bible/)

---

## Nota Importante sobre Traducciones

La Biblia fue originalmente escrita en hebreo antiguo, griego y arameo. Hoy se consume principalmente como un conjunto de traducciones a idiomas modernos como inglés, alemán y español.

### ¿Por qué existen múltiples traducciones?

Debido a que el hebreo antiguo y el griego son muy diferentes de nuestros idiomas modernos, hay muchas decisiones que un traductor debe tomar para representar con precisión la Biblia en un idioma moderno. Por lo tanto, **la traducción es en última instancia un proceso creativo de interpretación** que requiere mucha deliberación y contexto histórico.

### Enfoques de Traducción

Los traductores históricamente han tenido que decidir entre:

- **"Palabra por palabra"**: Intentan identificar los significados originales de las palabras hebreas y griegas y representar el equivalente en el idioma objetivo.
- **"Pensamiento por pensamiento"**: Intentan encontrar el significado original de frases y conceptos, luego traducir un significado equivalente.

Muchas traducciones modernas toman un enfoque combinado para lograr algo que se sienta natural en el idioma objetivo mientras se mantiene la precisión de los originales.

### Recomendaciones

- **Para lectura general y conocimiento básico**: Usa cualquier traducción moderna como BSB, ESV o NASB.
- **Para estudios profundos o análisis detallado**: Compara múltiples traducciones o usa una Biblia interlineal que muestre el hebreo/griego original.

**Lo más importante**: Ora por sabiduría y la guía del Espíritu Santo.

> "...Él, el Espíritu de verdad, os guiará a toda la verdad." - Juan 16:13

---

## Inicio Rápido

La API Bíblica está estructurada como un conjunto de archivos JSON disponibles para descarga desde internet.

### Estructura General

Con estos archivos puedes obtener:
- Lista de traducciones disponibles
- Lista de libros para una traducción particular
- Lista de capítulos para un libro particular
- Contenido completo de cada capítulo

---

## Endpoints Disponibles

### Traducciones
```
https://bible.helloao.org/api/available_translations.json
https://bible.helloao.org/api/{translation}/books.json
https://bible.helloao.org/api/{translation}/{book}/{chapter}.json
https://bible.helloao.org/api/{translation}/complete.json
```

### Comentarios
```
https://bible.helloao.org/api/available_commentaries.json
https://bible.helloao.org/api/c/{commentary}/books.json
https://bible.helloao.org/api/c/{commentary}/{book}/{chapter}.json
https://bible.helloao.org/api/c/{commentary}/profiles.json
https://bible.helloao.org/api/c/{commentary}/profiles/{profile}.json
```

### Datasets (Referencias Cruzadas)
```
https://bible.helloao.org/api/available_datasets.json
https://bible.helloao.org/api/d/{dataset}/books.json
https://bible.helloao.org/api/d/{dataset}/{book}/{chapter}.json
```

---

## Guía de Uso

### Obtener Traducciones Disponibles

**Endpoint:** `GET https://bible.helloao.org/api/available_translations.json`

**Ejemplo de código:**

```javascript
fetch('https://bible.helloao.org/api/available_translations.json')
  .then(request => request.json())
  .then(availableTranslations => {
    console.log('La API tiene las siguientes traducciones:', availableTranslations);
  });
```

**Estructura de respuesta:**

```json
{
  "translations": [
    {
      "id": "BSB",
      "name": "Berean Standard Bible",
      "englishName": "Berean Standard Bible",
      "shortName": "BSB",
      "language": "eng",
      "languageName": "English",
      "textDirection": "ltr",
      "website": "https://berean.bible/",
      "licenseUrl": "https://berean.bible/",
      "availableFormats": ["json"],
      "numberOfBooks": 66,
      "totalNumberOfChapters": 1189,
      "totalNumberOfVerses": 31086
    }
  ]
}
```

---

### Listar Libros de una Traducción

**Endpoint:** `GET https://bible.helloao.org/api/{translation}/books.json`

**Parámetros:**
- `{translation}` = ID de la traducción (ej: `BSB`)

**Ejemplo de código:**

```javascript
const translation = 'BSB';

fetch(`https://bible.helloao.org/api/${translation}/books.json`)
  .then(request => request.json())
  .then(books => {
    console.log('La BSB tiene los siguientes libros:', books);
  });
```

**Estructura de respuesta:**

```json
{
  "translation": { /* Información de la traducción */ },
  "books": [
    {
      "id": "GEN",
      "name": "Genesis",
      "commonName": "Genesis",
      "title": "Genesis",
      "order": 1,
      "numberOfChapters": 50,
      "totalNumberOfVerses": 1533,
      "firstChapterApiLink": "/api/BSB/GEN/1.json",
      "lastChapterApiLink": "/api/BSB/GEN/50.json"
    }
  ]
}
```

---

### Obtener un Capítulo

**Endpoint:** `GET https://bible.helloao.org/api/{translation}/{book}/{chapter}.json`

**Parámetros:**
- `{translation}` = ID de la traducción (ej: `BSB`)
- `{book}` = ID del libro (ej: `GEN` para Génesis)
  - [Lista completa de IDs de libros](https://ubsicap.github.io/usfm/identification/books.html)
- `{chapter}` = Número del capítulo (ej: `1`)

**Ejemplo de código:**

```javascript
const translation = 'BSB';
const book = 'GEN';
const chapter = 1;

fetch(`https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`)
  .then(request => request.json())
  .then(chapter => {
    console.log('Génesis 1 (BSB):', chapter);
  });
```

**Estructura de respuesta:**

```json
{
  "translation": { /* Información de la traducción */ },
  "book": { /* Información del libro */ },
  "chapter": {
    "number": 1,
    "content": [
      {
        "type": "heading",
        "content": ["The Creation"]
      },
      {
        "type": "verse",
        "number": 1,
        "content": [
          "In the beginning God created the heavens and the earth."
        ]
      }
    ],
    "footnotes": []
  },
  "thisChapterLink": "/api/BSB/GEN/1.json",
  "nextChapterApiLink": "/api/BSB/GEN/2.json",
  "previousChapterApiLink": null,
  "numberOfVerses": 31
}
```

---

### Obtener una Traducción Completa

**Endpoint:** `GET https://bible.helloao.org/api/{translation}/complete.json`

**Parámetros:**
- `{translation}` = ID de la traducción (ej: `BSB`)

**Ejemplo de código:**

```javascript
const translation = 'BSB';

fetch(`https://bible.helloao.org/api/${translation}/complete.json`)
  .then(request => request.json())
  .then(completeTranslation => {
    console.log('BSB completa:', completeTranslation);
  });
```

**Nota:** Esta descarga incluye todos los libros y capítulos de la traducción en un solo archivo JSON.

---

### Trabajar con Comentarios

#### Obtener Comentarios Disponibles

**Endpoint:** `GET https://bible.helloao.org/api/available_commentaries.json`

```javascript
fetch('https://bible.helloao.org/api/available_commentaries.json')
  .then(request => request.json())
  .then(commentaries => {
    console.log('Comentarios disponibles:', commentaries);
  });
```

#### Listar Libros en un Comentario

**Endpoint:** `GET https://bible.helloao.org/api/c/{commentary}/books.json`

```javascript
const commentary = 'adam-clarke';

fetch(`https://bible.helloao.org/api/c/${commentary}/books.json`)
  .then(request => request.json())
  .then(books => {
    console.log('Libros del comentario adam-clarke:', books);
  });
```

#### Obtener Capítulo de un Comentario

**Endpoint:** `GET https://bible.helloao.org/api/c/{commentary}/{book}/{chapter}.json`

```javascript
const commentary = 'adam-clarke';
const book = 'GEN';
const chapter = 1;

fetch(`https://bible.helloao.org/api/c/${commentary}/${book}/${chapter}.json`)
  .then(request => request.json())
  .then(chapter => {
    console.log('Génesis 1 (adam-clarke):', chapter);
  });
```

#### Obtener Perfiles de un Comentario

**Endpoint:** `GET https://bible.helloao.org/api/c/{commentary}/profiles.json`

Los perfiles son descripciones de personas o grupos de personas (ej: Aaron, Abraham).

```javascript
const commentary = 'tyndale';

fetch(`https://bible.helloao.org/api/c/${commentary}/profiles.json`)
  .then(request => request.json())
  .then(profiles => {
    console.log('Perfiles disponibles:', profiles);
  });
```

#### Obtener un Perfil Específico

**Endpoint:** `GET https://bible.helloao.org/api/c/{commentary}/profiles/{profile}.json`

```javascript
const commentary = 'tyndale';
const profile = 'aaron';

fetch(`https://bible.helloao.org/api/c/${commentary}/profiles/${profile}.json`)
  .then(request => request.json())
  .then(profileData => {
    console.log('Perfil de Aaron:', profileData);
  });
```

---

### Trabajar con Datasets

Los datasets contienen datos adicionales como referencias cruzadas entre versículos.

#### Obtener Datasets Disponibles

**Endpoint:** `GET https://bible.helloao.org/api/available_datasets.json`

```javascript
fetch('https://bible.helloao.org/api/available_datasets.json')
  .then(request => request.json())
  .then(datasets => {
    console.log('Datasets disponibles:', datasets);
  });
```

#### Listar Libros en un Dataset

**Endpoint:** `GET https://bible.helloao.org/api/d/{dataset}/books.json`

```javascript
const dataset = 'open-cross-ref';

fetch(`https://bible.helloao.org/api/d/${dataset}/books.json`)
  .then(request => request.json())
  .then(books => {
    console.log('Libros en el dataset:', books);
  });
```

#### Obtener Referencias Cruzadas de un Capítulo

**Endpoint:** `GET https://bible.helloao.org/api/d/{dataset}/{book}/{chapter}.json`

```javascript
const dataset = 'open-cross-ref';
const book = 'GEN';
const chapter = 1;

fetch(`https://bible.helloao.org/api/d/${dataset}/${book}/${chapter}.json`)
  .then(request => request.json())
  .then(references => {
    console.log('Referencias cruzadas de Génesis 1:', references);
  });
```

**Estructura de respuesta:**

```json
{
  "chapter": {
    "number": 1,
    "content": [
      {
        "verse": 1,
        "references": [
          {
            "book": "JHN",
            "chapter": 1,
            "verse": 1,
            "score": 85
          },
          {
            "book": "HEB",
            "chapter": 11,
            "verse": 3,
            "score": 78
          }
        ]
      }
    ]
  }
}
```

---

## Referencia Completa de la API

### Códigos de Libros Bíblicos

Para consultar libros específicos, usa estos códigos estándar:

**Antiguo Testamento:**
- GEN (Génesis), EXO (Éxodo), LEV (Levítico), NUM (Números), DEU (Deuteronomio)
- JOS (Josué), JDG (Jueces), RUT (Rut)
- 1SA, 2SA (1 y 2 Samuel), 1KI, 2KI (1 y 2 Reyes)
- 1CH, 2CH (1 y 2 Crónicas), EZR (Esdras), NEH (Nehemías), EST (Ester)
- JOB (Job), PSA (Salmos), PRO (Proverbios), ECC (Eclesiastés), SNG (Cantares)
- ISA (Isaías), JER (Jeremías), LAM (Lamentaciones), EZK (Ezequiel), DAN (Daniel)
- HOS (Oseas), JOL (Joel), AMO (Amós), OBA (Abdías), JON (Jonás)
- MIC (Miqueas), NAM (Nahum), HAB (Habacuc), ZEP (Sofonías)
- HAG (Hageo), ZEC (Zacarías), MAL (Malaquías)

**Nuevo Testamento:**
- MAT (Mateo), MRK (Marcos), LUK (Lucas), JHN (Juan)
- ACT (Hechos)
- ROM (Romanos), 1CO, 2CO (1 y 2 Corintios), GAL (Gálatas), EPH (Efesios)
- PHP (Filipenses), COL (Colosenses), 1TH, 2TH (1 y 2 Tesalonicenses)
- 1TI, 2TI (1 y 2 Timoteo), TIT (Tito), PHM (Filemón)
- HEB (Hebreos), JAS (Santiago), 1PE, 2PE (1 y 2 Pedro)
- 1JN, 2JN, 3JN (1, 2 y 3 Juan), JUD (Judas), REV (Apocalipsis)

---

## Estructuras de Datos

### Translation (Traducción)

```typescript
interface Translation {
  id: string;                    // ID de la traducción (ej: "BSB")
  name: string;                  // Nombre de la traducción
  englishName: string;           // Nombre en inglés
  shortName: string;             // Nombre corto
  language: string;              // Código ISO 639 de 3 letras
  languageName?: string;         // Nombre del idioma
  textDirection: 'ltr' | 'rtl';  // Dirección del texto
  website: string;               // Sitio web oficial
  licenseUrl: string;            // URL de la licencia
  availableFormats: string[];    // Formatos disponibles
  numberOfBooks: number;         // Número de libros (66 para completa)
  totalNumberOfChapters: number; // Total de capítulos (1,189 para completa)
  totalNumberOfVerses: number;   // Total de versículos (~31,102 para completa)
}
```

### ChapterContent (Contenido de Capítulo)

El contenido de un capítulo puede incluir:

```typescript
type ChapterContent = 
  | ChapterHeading        // Encabezado
  | ChapterLineBreak      // Salto de línea
  | ChapterVerse          // Versículo
  | ChapterHebrewSubtitle // Subtítulo hebreo

interface ChapterHeading {
  type: 'heading';
  content: string[];
}

interface ChapterLineBreak {
  type: 'line_break';
}

interface ChapterVerse {
  type: 'verse';
  number: number;
  content: (string | FormattedText | InlineHeading | VerseFootnoteReference)[];
}

interface FormattedText {
  text: string;
  poem?: number;          // Nivel de indentación para poesía
  wordsOfJesus?: boolean; // Palabras de Jesús
}
```

### Cross References (Referencias Cruzadas)

```typescript
interface DatasetReference {
  book: string;      // ID del libro (ej: "GEN")
  chapter: number;   // Número de capítulo
  verse: number;     // Número de versículo inicial
  endVerse?: number; // Versículo final (si es rango)
  score?: number;    // Puntuación de relevancia
}
```

---

## Ejemplos Prácticos de Uso

### Ejemplo 1: Obtener y Mostrar un Versículo

```javascript
async function obtenerVersiculo(traduccion, libro, capitulo, versiculo) {
  const url = `https://bible.helloao.org/api/${traduccion}/${libro}/${capitulo}.json`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const versiculoData = data.chapter.content.find(
      item => item.type === 'verse' && item.number === versiculo
    );
    
    if (versiculoData) {
      const texto = versiculoData.content
        .map(c => typeof c === 'string' ? c : c.text || '')
        .join('');
      
      console.log(`${libro} ${capitulo}:${versiculo} - ${texto}`);
      return texto;
    }
  } catch (error) {
    console.error('Error al obtener el versículo:', error);
  }
}

// Uso:
obtenerVersiculo('BSB', 'JHN', 3, 16);
// Resultado: "JHN 3:16 - For God so loved the world..."
```

### Ejemplo 2: Buscar Referencias Cruzadas

```javascript
async function obtenerReferenciasCruzadas(libro, capitulo, versiculo) {
  const url = `https://bible.helloao.org/api/d/open-cross-ref/${libro}/${capitulo}.json`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const versiculoData = data.chapter.content.find(
      item => item.verse === versiculo
    );
    
    if (versiculoData && versiculoData.references) {
      console.log(`Referencias para ${libro} ${capitulo}:${versiculo}:`);
      
      versiculoData.references.forEach(ref => {
        const refTexto = ref.endVerse 
          ? `${ref.book} ${ref.chapter}:${ref.verse}-${ref.endVerse}`
          : `${ref.book} ${ref.chapter}:${ref.verse}`;
        console.log(`- ${refTexto} (puntuación: ${ref.score})`);
      });
      
      return versiculoData.references;
    }
  } catch (error) {
    console.error('Error al obtener referencias:', error);
  }
}

// Uso:
obtenerReferenciasCruzadas('GEN', 1, 1);
```

### Ejemplo 3: Listar Todos los Libros Disponibles

```javascript
async function listarLibrosDisponibles(traduccion = 'BSB') {
  const url = `https://bible.helloao.org/api/${traduccion}/books.json`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`Libros disponibles en ${data.translation.name}:`);
    
    data.books.forEach(book => {
      console.log(`${book.order}. ${book.name} (${book.id}) - ${book.numberOfChapters} capítulos`);
    });
    
    return data.books;
  } catch (error) {
    console.error('Error al listar libros:', error);
  }
}

// Uso:
listarLibrosDisponibles('BSB');
```

---

## Notas Finales

### Licencia y Uso

Esta API es de **uso gratuito** gracias al apoyo de AO Lab y el equipo de Berean Bible. Por favor, revisa las URLs de licencia específicas para cada traducción antes de usar el contenido en tu aplicación.

### Soporte y Contribuciones

- **Repositorio GitHub**: [https://github.com/HelloAOLab/bible-api](https://github.com/HelloAOLab/bible-api)
- **Donaciones**: [https://better.giving/marketplace/1118469](https://better.giving/marketplace/1118469)
- **Contacto**: [https://helloao.org/about-us](https://helloao.org/about-us)

### Recursos Adicionales

- **Documentación oficial**: [https://bible.helloao.org/docs/](https://bible.helloao.org/docs/)

---

**Última actualización**: Abril 2026

**Versión del documento**: 1.0
