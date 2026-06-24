# Plan de Diseño Visual y Recursos del Módulo 2: Arquitectura RAG

Este documento detalla la división de responsabilidades de diseño para el **Módulo 2** de la certificación de **Databricks Generative AI Engineer Associate**. Te explica qué diagramas puedes construir rápidamente en **Napkin AI** y qué imágenes complejas e infografías abstractas de marca crearemos para tu blog de **Hashnode** o tus presentaciones de **Gamma**.

---

## 1. Organización Física de Carpetas en Local

Para facilitar la técnica de **arrastrar y soltar (drag-and-drop)** en Gamma, los archivos visuales del Módulo 2 se encuentran organizados en su carpeta correspondiente dentro de tu repositorio local:

```
D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras/
└── Modulo_2/         # Gráficos del Módulo 2 (Arquitectura RAG y Preparación de Datos)
    ├── figura_1_estrategias_chunking.png / .svg
    ├── figura_2_pipeline_ingesta_delta.png / .svg
    ├── figura_3_precision_recall_rag.png / .svg
    └── ruta_genai_modulo2_cover_1600x840.png / .svg
```

## 2. Paleta Oficial de Colores de la Marca (Databricks/Mosaic AI)

Para homogeneizar los estilos de **Gamma**, **Hashnode** y **Napkin AI**, mantén las configuraciones visuales dentro de esta paleta de 8 tonos corporativos:
1. `#070A13` (Fondo Base Ultra Oscuro)
2. `#131B2E` (Fondo Tarjeta / Panel)
3. `#1E293B` (Fondo Tarjeta Secundario)
4. `#7C3AED` (Morado Databricks - Principal)
5. `#C084FC` (Morado Brillante - Acentos)
6. `#4F46E5` (Índigo - Conectores y Flujos)
7. `#2DD4BF` (Teal Cyber - Métricas y Éxito)
8. `#94A3B8` (Gris Claro - Textos Auxiliares)

---

## 3. ¿Qué Diagramas puedes crear en Napkin AI?

**Napkin AI** destaca por tomar bloques de texto estructurados de manera lógica o secuencial y convertirlos automáticamente en esquemas relacionales, pirámides o flujos de procesos. 

Para este módulo, puedes copiar y pegar las siguientes estructuras textuales directamente en Napkin para que te genere los diagramas instantáneamente:

### A. Anatomía Comparativa de Fragmentación (Diagrama de Bloques / Cajas Alineadas)
*   **Texto Original:** "Para optimizar un join de Spark en Delta Lake, el desarrollador debe verificar el tamaño de los archivos."
*   **Fixed-Length (Tokens estáticos):** Para optimizar un join de Sp ➔ ark en Delta Lake, el des ➔ arrollador debe verifi (Corta palabras por la mitad).
*   **Sentence-Level (Por oraciones):** Para optimizar un join de Spark en Delta Lake. ➔ El desarrollador debe verificar el tamaño de los archivos. (Cortes limpios y gramaticales).
*   **Sliding Window (Solapamiento):** Para optimizar un join de Spark en Delta ➔ Spark en Delta Lake, el desarrollador ➔ el desarrollador debe verificar el tamaño (Repite términos clave en los bordes para mantener el contexto).

### B. El Pipeline de Limpieza de Contenido (Diagrama de Embudos o Flujo Lineal)
*   **Paso 1: Extracción Raw** ➔ PDF escaneado o página web cruda con HTML y ruido.
*   **Paso 2: Filtro de Ruido** ➔ Expresiones regulares (regex) eliminan etiquetas HTML, disclaimers repetidos y números de página.
*   **Paso 3: Chunking Inteligente** ➔ Aplicación de sliding window de 200 tokens con 40 tokens de solapamiento.
*   **Paso 4: Generación de Embeddings** ➔ El texto limpio se procesa a través de un modelo vectorial (ej. BGE o Ada).
*   **Paso 5: Carga en Delta Table** ➔ Los fragmentos y metadatos se guardan indexados en Unity Catalog.

### C. Flujo de Búsqueda Vectorial con Reranker (Diagrama de Dos Capas)
*   **Capa 1: Recuperación Rápida (Vector Search):**
    *   Consulta del usuario ➔ Base de datos vectorial.
    *   Filtro rápido usando Distancia Coseno.
    *   Surgen los **Top-100** fragmentos candidatos (Rápido, pero con precisión media).
*   **Capa 2: Re-ordenamiento (Reranking):**
    *   Top-100 fragmentos ➔ Cross-Encoder (Reranker).
    *   Evaluación semántica profunda del par Consulta-Documento.
    *   Se extraen los **Top-5** fragmentos finales de máxima relevancia para el LLM.

---

## 4. ¿Qué Imágenes e Infografías Abstractas Generaremos?

Estas son las imágenes de diseño visual complejo e institucional, alineadas a la paleta de colores de tu marca (Midnight Navy `#0F172A`, Cyber Teal `#2DD4BF`, Data Purple `#8B5CF6`), que crearemos y guardaremos en tu carpeta local para ser usadas en tus posts o slides:

### Modulo_2/ruta_genai_modulo2_cover_1600x840.svg / .png
*   **Concepto:** Portada oficial del Módulo 2.
*   **Estilo:** Visual abstracto y minimalista que ilustra el "Documento Fuente" dividiéndose en Chunks, centrado sobre fondo oscuro, sin títulos ni firmas.
*   **Uso:** Portada del post en Hashnode y para la slide de portada en Gamma.

### Modulo_2/figura_1_estrategias_chunking.svg / .png
*   **Concepto:** Diagrama explicativo comparativo de las diferentes estrategias de fragmentación (Fixed-length, Sliding Window, Semantic).
*   **Uso:** Inserción en el cuerpo del post de Hashnode y de soporte en las slides de Gamma.

### Modulo_2/figura_2_pipeline_ingesta_delta.svg / .png
*   **Concepto:** Flujo técnico de extremo a extremo desde el archivo en crudo, procesamiento Spark, generación de embeddings e indexación estructurada en una tabla Delta de Unity Catalog.
*   **Uso:** Ilustración del flujo de datos en el post y apoyo en la slide de Delta Lake.

### Modulo_2/figura_3_precision_recall_rag.svg / .png
*   **Concepto:** Infografía que visualiza de forma intuitiva los conceptos de Precision y Recall en la recuperación RAG y cómo el Reranker actúa como embudo de calidad.
*   **Uso:** Sección de evaluación de búsqueda en Hashnode y slide de métricas en Gamma.

---

## 5. Cómo Integrar las Imágenes en Gamma mediante Arrastrar (Drag-and-Drop)

1.  **Abre tu presentación del Módulo 2** en tu navegador web (Gamma).
2.  **Abre el Explorador de archivos de Windows** en la subcarpeta del Módulo 2:
    `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\`
3.  **Arrastra la imagen requerida** (ej. `figura_2_pipeline_ingesta_delta.png`) directamente sobre la diapositiva correspondiente en Gamma y suéltala.
4.  **Para los diagramas de Napkin:** Cuando generes tus diagramas en Napkin AI basándote en los textos de la Sección 3, expórtalos como PNG en esta carpeta `Modulo_2/` local y luego arrástralos a Gamma.
