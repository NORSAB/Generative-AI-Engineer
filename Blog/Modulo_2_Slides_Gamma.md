# Presentación en Gamma: Arquitectura RAG e Ingesta de Datos (Módulo 2)

Este documento contiene la estructura de diapositivas para tu presentación en **Gamma**, dividida en dos secciones independientes: **Inglés** (versión principal de negocios) y **Español** (versión de soporte). 

Cada diapositiva indica exactamente qué figura o diagrama de Napkin arrastrar desde tu carpeta local `figuras/Modulo_2/` para ilustrar la presentación.

---

# SECTION 1: English Slide Deck

## Slide 1: Cover Page
* **Title:** Ingestion Pipelines & RAG Architecture
* **Subtitle:** Mastering Document Cleaning, Chunking, and Indexing in Delta Lake
* **Author / Track:** Norman Sabillón — Databricks Certified Generative AI Engineer Associate Route
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\ruta_genai_modulo2_cover_1600x840.png`

---

## Slide 2: Why RAG Ingestion Quality Matters
* **Key Concept:** The "Garbage In, Garbage Out" problem in LLM retrieval.
* **Core Points:**
  * LLMs have strict context window limits and high token costs.
  * Vector search returns raw data; if that data contains noise, the LLM hallucinates.
  * Quality retrieval is the single most effective way to eliminate LLM errors.
* **Takeaway:** Your RAG system is only as good as the pipeline that cleans and indexes your documents.

---

## Slide 3: The Content Cleaning Pipeline
* **Title:** Document Ingestion Flow
* **Core Points:**
  * **1. Raw Extraction:** Ingest files (PDF, HTML) via Auto Loader into Bronze tables.
  * **2. Noise Filtering:** Run regex/UDFs to strip HTML markup, headers, and footers.
  * **3. Chunking:** Split clean text into context-sized pieces.
  * **4. Embeddings:** Compute vectors using Databricks Model Serving.
  * **5. Indexing:** Load gold data to Unity Catalog, ready for Vector Search.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Pipeline de Limpieza de Contenido.png`

---

## Slide 4: Document Chunking Strategies
* **Title:** Breaking Down the Corpus
* **Core Points:**
  * **Fixed-Length:** Splitting strictly by token count. Fast, but splits words and sentences.
  * **Sentence-Level:** Grammar-based splitting. Preserves sentence logic, but loses paragraph context.
  * **Paragraph-Based:** Splits on double newlines (`\n\n`). Retains semantic units, but chunk size is highly inconsistent.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_1_estrategias_chunking.png`

---

## Slide 5: The Chunking Decision Matrix
* **Title:** Choosing the Right Split Method
* **Core Points:**
  * **Static vs. Dynamic:** Hard boundaries vs. content-aware divisions.
  * **Simple vs. Complex:** Low computational overhead vs. model-dependent inference.
  * **Sliding Window:** Adds overlap to avoid losing context at chunk edges.
  * **Semantic Chunking:** The ultimate dynamic method; splits only when theme similarity drops.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Matriz de Fragmentación RAG.png`

---

## Slide 6: Chunk Size & Overlap Tuning
* **Title:** Balancing Recall and Context
* **Core Points:**
  * **Small Chunks (100-200 tokens):** High specificity, fast search, but loses general context.
  * **Large Chunks (500-800 tokens):** Rich context for the LLM, but dilutes exact search hits.
  * **Fixed Overlap:** Standard 10% to 20% token repetition.
  * **Dynamic Overlap:** Dynamically extends boundaries to prevent cutting off sentences.

---

## Slide 7: Delta Lake & Medallion Ingestion
* **Title:** Structured Storage for Vector Indices
* **Core Points:**
  * **Bronze Table:** Raw document bytes directly from ADLS/S3.
  * **Silver Table:** Cleansed and normalized text, stripped of boilerplate.
  * **Gold Table:** Chunks, metadata, and embedding vectors ready for indexing.
  * **Delta Benefits:** Predicate pushdown for metadata filtering, Time Travel auditing, and transactional updates.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_2_pipeline_ingesta_delta.png`

---

## Slide 8: Enterprise Governance with Unity Catalog
* **Title:** Security and Permissions Lineage
* **Core Points:**
  * **RBAC & ABAC:** Centralized security policies for tables and vector index schemas.
  * **Lineage Tracking:** Audit data origin from raw storage to production LLM queries.
  * **Access Sync:** Vector Search automatically respects Unity Catalog permissions; users only search documents they have access to.

---

## Slide 9: The Retrieval Bottleneck
* **Title:** Precision vs. Recall
* **Core Points:**
  * **The Challenge:** Vector search is great at pulling relevant files (**Recall**) but includes irrelevant context (**Precision**).
  * Sending 100 raw chunks to an LLM overflows the context window and causes hallucinations.
  * **The Solution:** A two-stage pipeline. Filter broadly first, then narrow down using a high-fidelity model.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_3_precision_recall_rag.png`

---

## Slide 10: Reranking with Cross-Encoders
* **Title:** Two-Stage Quality Funnel
* **Core Points:**
  * **Stage 1 (Vector Search):** Rapidly finds the Top-100 candidates using Cosine Distance.
  * **Stage 2 (Reranker):** A Cross-Encoder model recalculates deep semantic relevance.
  * **Final Output (Top-5):** Delivers only the highest-quality chunks, preventing prompt pollution.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Mejora de la Búsqueda Vectorial con Reranking.png`

---

## Slide 11: Production Best Practices & Summary
* **Title:** Designing RAG for Scale
* **Core Points:**
  * Clean early: Remove boilerplate before chunking to save embedding compute.
  * Standardize metadata: Tag chunks with sources, categories, and permissions.
  * Benchmark latencies: Reranking adds 50-150ms of overhead; evaluate the trade-off.
  * Use Managed Services: Leverage Databricks Vector Search and Model Serving for serverless scaling.

---

# SECTION 2: Diapositivas en Español

## Slide 1: Portada
* **Título:** Pipelines de Ingesta y Arquitectura RAG
* **Subtítulo:** Limpieza, Fragmentación e Indexación de Documentos en Delta Lake
* **Autor:** Norman Sabillón — Ruta Certificación Databricks GenAI Engineer
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\ruta_genai_modulo2_cover_1600x840.png`

---

## Slide 2: La Calidad del RAG Depende de la Ingesta
* **Concepto Clave:** "Basura entra, basura sale" en el contexto del LLM.
* **Puntos Centrales:**
  * Los LLM tienen ventanas de contexto limitadas y costos por token elevados.
  * La búsqueda vectorial indexa ruido si los datos de origen no están depurados.
  * Mejorar la recuperación es el paso más efectivo para evitar las alucinaciones.

---

## Slide 3: Pipeline de Limpieza de Contenido
* **Título:** Flujo de Ingesta de Datos
* **Puntos Centrales:**
  * **1. Extracción Raw:** Lectura con Auto Loader hacia tablas Delta Bronze.
  * **2. Filtro de Ruido:** Limpieza de código HTML y boilerplate con PySpark.
  * **3. Chunking:** Fragmentación controlada del texto limpio.
  * **4. Embeddings:** Generación de vectores vía Databricks Model Serving.
  * **5. Indexación:** Carga final en Unity Catalog para Vector Search.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Pipeline de Limpieza de Contenido.png`

---

## Slide 4: Estrategias de Fragmentación (Chunking)
* **Título:** División Eficiente del Corpus
* **Puntos Centrales:**
  * **Tokens Fijos:** División rápida por cantidad de tokens, pero corta palabras y oraciones.
  * **Nivel Oración:** Respeta los límites gramaticales, pero puede perder la idea general del párrafo.
  * **Basada en Párrafos:** Usa los saltos de línea dobles (`\n\n`), pero produce bloques muy inconsistentes.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_1_estrategias_chunking.png`

---

## Slide 5: Matriz de Decisiones de Fragmentación
* **Título:** Selección del Método de Corte
* **Puntos Centrales:**
  * **Estático vs. Dinámico:** Límites fijos vs. límites conscientes del contenido.
  * **Simple vs. Complejo:** Costo de cómputo bajo vs. inferencia de modelos pesados.
  * **Ventana Deslizante:** Repite tokens en los bordes para mantener la continuidad.
  * **Chunking Semántico:** Divide el texto calculando cambios de tema mediante embeddings.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Matriz de Fragmentación RAG.png`

---

## Slide 6: Ajuste de Tamaño y Solapamiento
* **Título:** El Balance entre Exhaustividad y Contexto
* **Puntos Centrales:**
  * **Chunks Pequeños (100-200 tokens):** Búsqueda muy específica pero con riesgo de perder contexto.
  * **Chunks Grandes (500-800 tokens):** Contexto amplio para el LLM pero reduce la precisión de la búsqueda.
  * **Overlap Fijo:** Repetición estática del 10% al 20% de tokens.
  * **Overlap Dinámico:** Ajusta los bordes hasta encontrar el punto final de una frase.

---

## Slide 7: Ingesta Delta y Arquitectura Medallion
* **Título:** Almacenamiento Estructurado para RAG
* **Puntos Centrales:**
  * **Tablas Bronze:** Datos crudos directo desde almacenamiento en la nube.
  * **Tablas Silver:** Texto depurado sin metadatos inútiles ni boilerplate.
  * **Tablas Gold:** Fragmentos, metadatos y vectores listos para consulta.
  * **Beneficios de Delta:** Búsqueda rápida por metadatos, Time Travel y actualizaciones incrementales.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_2_pipeline_ingesta_delta.png`

---

## Slide 8: Gobernanza de Datos con Unity Catalog
* **Título:** Seguridad y Linaje de Datos
* **Puntos Centrales:**
  * **Control de Acceso:** Políticas de seguridad unificadas para tablas y esquemas de vectores.
  * **Trazabilidad (Lineage):** Rastreo del dato desde el origen hasta la consulta del modelo.
  * **Permisos Unificados:** Vector Search respeta la seguridad nativa; los usuarios solo recuperan datos a los que tienen acceso real.

---

## Slide 9: El Cuello de Botella de la Recuperación
* **Título:** Precisión vs. Exhaustividad
* **Puntos Centrales:**
  * **El Reto:** La búsqueda vectorial tradicional prioriza encontrarlo todo (**Recall**) pero añade ruido (**Precision**).
  * Enviar 100 fragmentos crudos al prompt del LLM genera alucinaciones y eleva el costo.
  * **La Solución:** Un embudo de dos etapas. Buscar un grupo amplio primero y filtrar los mejores al final.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\figura_3_precision_recall_rag.png`

---

## Slide 10: Reranking con Modelos Cross-Encoder
* **Título:** Embudo de Calidad Semántica
* **Puntos Centrales:**
  * **Etapa 1 (Búsqueda Vectorial):** Extrae los Top-100 usando similitud rápida de coseno.
  * **Etapa 2 (Reranker):** Un modelo Cross-Encoder calcula la relevancia profunda de cada par.
  * **Salida Final (Top-5):** Entrega los fragmentos óptimos al LLM sin contaminar el prompt.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_2\Mejora de la Búsqueda Vectorial con Reranking.png`

---

## Slide 11: Mejores Prácticas en Producción
* **Título:** Diseño de Sistemas RAG a Escala
* **Puntos Centrales:**
  * Limpieza previa: Remueve el boilerplate antes de calcular embeddings para ahorrar costos.
  * Metadatos estándar: Añade URIs, títulos, fechas y permisos a nivel de fragmento.
  * Mide la latencia: El Reranker añade de 50 a 150ms al flujo; evalúa si vale la pena.
  * Usa servicios administrados: Aprovecha Databricks Vector Search para indexación sin servidores.
