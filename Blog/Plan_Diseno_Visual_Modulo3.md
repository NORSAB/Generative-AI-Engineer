# Plan de Diseño Visual y Recursos del Módulo 3: Desarrollo de Agentes de IA

Este documento detalla la división de responsabilidades de diseño para el **Módulo 3** de la certificación de **Databricks Generative AI Engineer Associate**. Te explica qué diagramas puedes construir rápidamente en **Napkin AI** y qué imágenes complejas crearemos para tu blog de **Hashnode** o tus presentaciones de **Gamma**.

---

## 1. Organización Física de Carpetas en Local

Para facilitar la técnica de **arrastrar y soltar (drag-and-drop)** en Gamma, los archivos visuales del Módulo 3 se organizan en su carpeta correspondiente dentro de tu repositorio local:

```
D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras/
└── Modulo_3/         # Gráficos del Módulo 3 (Desarrollo de Agentes y Orquestación)
    ├── figura_1_arquitectura_agente.png / .svg
    ├── figura_2_ejemplo_trace_mlflow.png / .svg
    └── ruta_genai_modulo3_cover_1600x840.png / .svg
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

**Napkin AI** destaca por tomar bloques de texto estructurados de manera lógica o secuencial y convertirlos automáticamente en esquemas relacionales, pirámides o flujos de procesos. 

Para este módulo, puedes copiar y pegar las siguientes estructuras textuales directamente en Napkin para que te genere los diagramas de manera instantánea:

### A. El bucle de Reasoning-Action (ReAct Loop)
*   **1. Consulta de Usuario:** El agente recibe la consulta y carga el contexto del historial de conversación.
*   **2. Razonamiento (Thought):** El LLM evalúa qué información falta y decide el plan de acción óptimo.
*   **3. Selección de Herramienta:** El LLM define la función de Unity Catalog a llamar y extrae sus parámetros.
*   **4. Ejecución (Action):** El orquestador de Databricks ejecuta la función en Unity Catalog y recupera el resultado de forma segura.
*   **5. Observación (Observation):** El LLM analiza el resultado de la herramienta para validar si se cumplió el objetivo de la consulta.
*   **6. Generación Final:** El LLM sintetiza todos los hallazgos y entrega la respuesta final de forma limpia al usuario.

### B. El Flujo de Traducción Semántica de la Herramienta (Mapeo de Tool Calling)
*   **Definición de Código (Entrada en Unity Catalog):**
    *   Nombre de la función: `catalog.schema.verificar_inventario_producto(product_id: int)`
    *   Comentario explicativo: "Consulta el inventario actual de un producto específico en el almacén central."
*   **Traducción del Orquestador:** Convierte los comentarios y tipos de datos a un esquema estructurado (JSON Schema).
*   **Entrada al LLM:** El LLM recibe las firmas JSON de todas las herramientas disponibles.
*   **Llamada del LLM (Tool Call):** El modelo emite un JSON estructurado indicando que quiere invocar la función con el valor `{product_id: 12}`.

### C. La estructura de una Traza (Trace) en MLflow
*   **Traza Principal (Root Span):** `Ejecutar Agente Ventas` (Tiempo total: 2.4s)
    *   *Sub-Paso 1:* `Extraer consulta del usuario` (0.1s)
    *   *Sub-Paso 2:* `Recuperar contexto RAG` (1.1s)
        *   `Búsqueda Vectorial` (0.8s)
    *   *Sub-Paso 3:* `Llamar herramienta verificar_inventario` (0.9s)
        *   `Ejecución de función de Unity Catalog` (0.8s)
    *   *Sub-Paso 4:* `Generación de respuesta final LLM` (0.3s)

---

## 4. ¿Qué Imágenes e Infografías Abstractas Generaremos?

Estas son las imágenes de diseño visual complejo e institucional, alineadas a la paleta de colores de tu marca (Midnight Navy `#0F172A`, Cyber Teal `#2DD4BF`, Data Purple `#8B5CF6`), que crearemos y guardaremos en tu carpeta local para ser usadas en tus posts o slides:

### Modulo_3/ruta_genai_modulo3_cover_1600x840.svg / .png
*   **Concepto:** Portada oficial del Módulo 3.
*   **Estilo:** Visual abstracto y minimalista que ilustra un engranaje central (agente) interactuando con nodos externos (herramientas) mediante conectores luminosos, sobre fondo ultra oscuro, sin textos.
*   **Uso:** Portada del post en Hashnode y para la slide de portada en Gamma.

### Modulo_3/figura_1_arquitectura_agente.svg / .png
*   **Concepto:** Diagrama explicativo de la arquitectura de un agente de Mosaic AI interactuando con endpoints de Model Serving y herramientas registradas en Unity Catalog.
*   **Uso:** Inserción en el cuerpo del post de Hashnode y de soporte en las slides de Gamma.

### Modulo_3/figura_2_ejemplo_trace_mlflow.svg / .png
*   **Concepto:** Recreación visual de la interfaz de MLflow Tracing mostrando la jerarquía de Spans, latencias por paso y consumo de tokens de forma intuitiva.
*   **Uso:** Sección de depuración en Hashnode y slide de monitoreo en Gamma.

---

## 5. Cómo Integrar las Imágenes en Gamma mediante Arrastrar (Drag-and-Drop)

1.  **Abre tu presentación del Módulo 3** en tu navegador web (Gamma).
2.  **Abre el Explorador de archivos de Windows** en la subcarpeta del Módulo 3:
    `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\`
3.  **Arrastra la imagen requerida** (ej. `figura_1_arquitectura_agente.png`) directamente sobre la diapositiva correspondiente en Gamma y suéltala.
4.  **Para los diagramas de Napkin:** Cuando generes tus diagramas en Napkin AI basándote en los textos de la Sección 3, expórtalos como PNG en esta carpeta `Modulo_3/` local y luego arrástralos a Gamma.
