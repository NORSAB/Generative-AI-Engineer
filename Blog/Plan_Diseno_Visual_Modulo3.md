# Plan de Diseño Visual y Recursos del Módulo 3: Desarrollo de Agentes de IA

Este documento detalla la división de responsabilidades de diseño para el **Módulo 3** de la certificación de **Databricks Generative AI Engineer Associate**. Te explica qué diagramas puedes construir rápidamente en **Napkin AI** (en sus versiones en **Inglés** para tus slides de Gamma y en **Español** para tu blog de Hashnode) y qué imágenes complejas e infografías abstractas utilizaremos.

---

## 1. Organización Física de Carpetas en Local

Para facilitar la técnica de **arrastrar y soltar (drag-and-drop)** en Gamma, los archivos visuales del Módulo 3 se organizan en su carpeta correspondiente dentro de tu repositorio local:

```
D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras/
└── Modulo_3/         # Gráficos del Módulo 3 (Desarrollo de Agentes y Orquestación)
    ├── figura_1_arquitectura_agente.png
    ├── figura_2_ejemplo_trace_mlflow.png
    ├── ruta_genai_modulo3_cover_1600x840.png
    │
    # Versiones en Español (Blog / Hashnode)
    ├── Ciclo iterativo para razonar, ejecutar herramientas y responder.png / .svg
    ├── Flujo de Traducción Semántica de la Herramienta.png / .svg
    ├── Estructura de una Traza en MLflow.png / .svg
    │
    # Versiones en Inglés (Presentaciones / Gamma)
    ├── Iterative loop to reason, execute tools and respond.png / .svg
    ├── Semantic Tool Translation Flow.png / .svg
    └── Structure of an MLflow Trace.png / .svg
```

## 2. Paleta Oficial de Colores de la Marca (Databricks/Mosaic AI)

Para homogeneizar los estilos de **Gamma**, **Hashnode** y **Napkin AI**, mantén las configuraciones visuales dentro de esta paleta de 8 tonos corporativos:
1. `#070A13` (Fondo Base Ultra Oscuro)
2. `#131B2E` (Fondo Tarjeta / Panel)
3. `#1E293B` (Fondo Tarjeta Secundario)
4. `#8B5CF6` (Morado Databricks GenAI - Principal)
5. `#C084FC` (Morado Brillante - Acentos)
6. `#4F46E5` (Índigo - Conectores y Flujos)
7. `#2DD4BF` (Teal Cyber - Métricas y Éxito)
8. `#94A3B8` (Gris Claro - Textos Auxiliares)

---

## 3. ¿Qué Diagramas puedes crear en Napkin AI?

Para este módulo, puedes copiar y pegar las siguientes estructuras textuales directamente en Napkin para generar los diagramas en ambos idiomas:

### A. El bucle de Reasoning-Action (ReAct Loop)

*   **Paleta de Colores de los Nodos (Rueda y Esferas):**
    *   *Paso 1:* `#6c4b8c` (Morado apagado)
    *   *Paso 2:* `#7c3aed` (Morado vibrante)
    *   *Paso 3:* `#4f46e5` (Índigo)
    *   *Paso 4:* `#0d9488` (Teal oscuro)
    *   *Paso 5:* `#2dd4bf` (Teal brillante)
    *   *Paso 6:* `#5af1de` (Turquesa claro)

#### Versión en Español (Blog / Hashnode)
*   **Título:** `El Bucle de Ejecución del Agente (ReAct Loop)`
*   **Círculo Central:** `Motor de Inferencia del Agente` / `Ciclo iterativo para razonar, ejecutar herramientas y responder.`
*   **Segmentos:**
    *   **1. Consulta de Usuario:** El agente recibe la consulta y carga el contexto del historial.
    *   **2. Razonamiento (Thought):** El LLM evalúa qué información falta y decide el plan de acción.
    *   **3. Selección de Herramienta:** El LLM define la función de Unity Catalog a llamar y extrae los parámetros.
    *   **4. Ejecución (Action):** El orquestador de Databricks ejecuta la función en Unity Catalog y recupera el resultado.
    *   **5. Observación (Observation):** El LLM analiza la salida de la herramienta para validar si cumplió el objetivo.
    *   **6. Generación Final:** El LLM sintetiza los hallazgos y entrega la respuesta final al usuario.

#### Versión en Inglés (Slides / Gamma)
*   **Título:** `The Agent Execution Loop (ReAct Loop)`
*   **Círculo Central:** `Agent Inference Engine` / `Iterative cycle to reason, execute tools, and respond.`
*   **Segmentos:**
    *   **1. User Query:** The agent receives the query and loads the chat history context.
    *   **2. Reasoning (Thought):** The LLM evaluates what information is missing and decides the action plan.
    *   **3. Tool Selection:** The LLM defines the Unity Catalog function to call and extracts parameters.
    *   **4. Execution (Action):** The Databricks orchestrator runs the Unity Catalog function and retrieves the result.
    *   **5. Observation:** The LLM analyzes the tool output to validate if the query goal was met.
    *   **6. Final Generation:** The LLM synthesizes findings and delivers the final response to the user.

---

### B. El Flujo de Traducción Semántica de la Herramienta (Mapeo de Tool Calling)

*   **Paleta de Colores de las Cajas (Cinta Horizontal):**
    *   *Caja 1:* `#4f46e5` (Índigo)
    *   *Caja 2:* `#8b5cf6` (Morado)
    *   *Caja 3:* `#c084fc` (Morado claro)
    *   *Caja 4:* `#2dd4bf` (Teal brillante)

#### Versión en Español (Blog / Hashnode)
*   **Título:** `Flujo de Traducción Semántica de la Herramienta`
*   **Pasos:**
    *   **Definición en Unity Catalog:** La función (SQL o Python) se registra en el catálogo con comentarios claros (`COMMENT`).
    *   **Generación del Schema:** El orquestador de Databricks traduce la firma de la función a un esquema estructurado (JSON Schema).
    *   **Carga de Firmas al LLM:** El LLM recibe las especificaciones de las herramientas como parte del contexto del prompt.
    *   **Llamada a la Herramienta (Tool Call):** El LLM emite una solicitud estructurada (`tool_calls`) con los parámetros específicos para su ejecución.

#### Versión en Inglés (Slides / Gamma)
*   **Título:** `Semantic Tool Translation Flow`
*   **Pasos:**
    *   **Unity Catalog Definition:** The function (SQL or Python) is registered in the catalog with clear comments (`COMMENT`).
    *   **Schema Generation:** The Databricks orchestrator translates the function signature into a structured JSON Schema.
    *   **Loading Signatures to LLM:** The LLM receives the tools' specifications as part of the prompt context.
    *   **Tool Calling:** The LLM issues a structured execution request (`tool_calls`) with the specific parameters.

---

### C. La estructura de una Traza (Trace) en MLflow

*   **Paleta de Colores de los Nodos (Flujo Vertical):**
    *   *Nodo 1:* `#8b5cf6` ➔ *Nodo 2:* `#7c3aed` ➔ *Nodo 3:* `#4f46e5` ➔ *Nodo 4:* `#0d9488` ➔ *Nodo 5:* `#2dd4bf` ➔ *Nodo 6:* `#5af1de`

#### Versión en Español (Blog / Hashnode)
*   **Título:** `Estructura de una Traza en MLflow`
*   **Pasos:**
    *   **[0.1s] Recepción de Consulta:** El orquestador procesa el prompt de entrada y carga el historial.
    *   **[1.1s] Recuperación RAG (Padre):** Tiempo total de búsqueda y filtrado del contexto de negocio.
    *   **[0.8s] Búsqueda Vectorial (Hijo):** Consulta de similitud semántica en Databricks Vector Search.
    *   **[0.9s] Llamada a Herramienta (Padre):** Invocación de la herramienta externa `verificar_inventario`.
    *   **[0.8s] Ejecución de Función (Hijo):** Cómputo y consulta segura de la función en Unity Catalog.
    *   **[0.3s] Generación de Respuesta (LLM):** El modelo procesa los datos y redacta la respuesta al usuario.

#### Versión en Inglés (Slides / Gamma)
*   **Título:** `Structure of an MLflow Trace`
*   **Pasos:**
    *   **[0.1s] Query Reception:** The orchestrator processes the input prompt and loads history.
    *   **[1.1s] RAG Retrieval (Parent):** Cumulative time to search and filter business context.
    *   **[0.8s] Vector Search (Child):** Semantic similarity query run on Databricks Vector Search.
    *   **[0.9s] Tool Call (Parent):** Invocación of the external tool `verificar_inventario`.
    *   **[0.8s] Function Execution (Child):** Secure computation of the function inside Unity Catalog.
    *   **[0.3s] Response Generation (LLM):** The model processes all data and drafts the user response.

---

## 4. ¿Qué Imágenes e Infografías Abstractas Generaremos?

Estas son las imágenes de diseño visual complejo e institucional, alineadas a la paleta de colores de tu marca, que crearemos y guardaremos en tu carpeta local para ser usadas en tus posts o slides:

### Modulo_3/ruta_genai_modulo3_cover_1600x840.png
*   **Concepto:** Portada oficial del Módulo 3. Estilo visual abstracto y minimalista que ilustra un engranaje central (agente) interactuando con nodos externos (herramientas) mediante conectores luminosos, sobre fondo ultra oscuro, sin textos.

### Modulo_3/figura_1_arquitectura_agente.png
*   **Concepto:** Diagrama explicativo de la arquitectura de un agente de Mosaic AI interactuando con endpoints de Model Serving y herramientas registradas en Unity Catalog.

### Modulo_3/figura_2_ejemplo_trace_mlflow.png
*   **Concepto:** Recreación visual de la interfaz de MLflow Tracing mostrando la jerarquía de Spans, latencias por paso y consumo de tokens de forma intuitiva.

---

## 5. Cómo Integrar las Imágenes en Gamma mediante Arrastrar (Drag-and-Drop)

1.  **Abre tu presentación del Módulo 3** en tu navegador web (Gamma).
2.  **Abre el Explorador de archivos de Windows** en la subcarpeta del Módulo 3:
    `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\`
3.  **Arrastra la imagen requerida** (ej. `figura_1_arquitectura_agente.png`) directamente sobre la diapositiva correspondiente en Gamma y suéltala.
4.  **Para los diagramas de Napkin:** Cuando generes tus diagramas en Napkin AI basándote en los textos de la Sección 3, expórtalos como PNG en esta carpeta `Modulo_3/` local y luego arrástralos a Gamma.
