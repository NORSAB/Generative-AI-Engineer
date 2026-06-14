# Tema Visual de Gamma (Gamma Presentation Theme)

- **Nombre sugerido:** Aesthetic Light Violet
- **Orientación:** Vertical / Retrato (Portrait 9:16 o 4:5), optimizado para lectura en dispositivos móviles a lo alto.
- **Colores Clave (Hex):**
  - Fondo (Background): `#F8FAFC` (Slate Light Grey)
  - Tarjetas (Cards/Containers): `#FFFFFF` (Pure White)
  - Primario (Primary): `#7C3AED` (Vivid Indigo/Purple - Botones, enlaces e Hitos)
  - Secundario (Secondary): `#0891B2` (Dark Cyan/Turquoise - Detalles y preguntas de examen)
  - Texto de Encabezado (Heading Text): `#0F172A` (Slate Dark - Títulos)
  - Texto de Cuerpo (Body Text): `#334155` (Charcoal Grey - Descripciones)

---

## 🤖 NOTA PARA LA IA DE GAMMA (Gamma AI Prompt Instructions)
La presentación consta de dos partes idénticas en diseño estructural, diagramas y conceptos visuales. Solo varía el idioma. **La IA de Gamma debe replicar exactamente el diseño, disposición de tarjetas e iconografía entre las slides equivalentes:**

- **Slide 16** es la traducción exacta de la **Slide 1** (Portada / Cover)
- **Slide 17** es la traducción exacta de la **Slide 2** (Why Generative AI Engineering?)
- **Slide 18** es la traducción exacta de la **Slide 3** (Under the Hood of LLMs - Process)
- **Slide 19** es la traducción exacta de la **Slide 4** (Under the Hood of LLMs - Detail)
- **Slide 20** es la traducción exacta de la **Slide 5** (Choosing the Right Model Strategy - Cards)
- **Slide 21** es la traducción exacta de la **Slide 6** (Choosing the Right Model Strategy - Table)
- **Slide 22** es la traducción exacta de la **Slide 7** (Key Technical Limitations)
- **Slide 23** es la traducción exacta de la **Slide 8** (The 'Lost in the Middle' Effect)
- **Slide 24** es la traducción exacta de la **Slide 9** (Retrieval-Augmented Generation / RAG)
- **Slide 25** es la traducción exacta de la **Slide 10** (Semantic Search in the Lakehouse - Cards)
- **Slide 26** es la traducción exacta de la **Slide 11** (Semantic Search in the Lakehouse - Timeline)
- **Slide 27** es la traducción exacta de la **Slide 12** (Unifying the GenAI Lifecycle)
- **Slide 28** es la traducción exacta de la **Slide 13** (Where to Focus Your Study? - Graph)
- **Slide 29** es la traducción exacta de la **Slide 14** (Where to Focus Your Study? - Detail)
- **Slide 30** es la traducción exacta de la **Slide 15** (The Journey Starts Today - Roadmap)

---

# PART 1: English Version (Slides 1 - 10)

## Slide 1: Cover
- **Title:** GenAI Engineering with Databricks
- **Subtitle:** Module 0: Foundational Concepts & Exam Blueprint
- **Metadata:** Study Roadmap · Generative AI Engineer Associate
- **Author:** Norman Sabillón (2026)
- **Visual Concept:** Deep dark background with glowing purple network node lines. A badge at the top: "MODULE 0 / 11".

## Slide 2: The Strategic Pivot
- **Title:** Why Generative AI Engineering?
- **Content:**
  - **Beyond the Hype:** It's not just about writing prompts. It's about building production-grade systems on top of the Lakehouse.
  - **The "Library Trap":** Avoiding the mistake of using frameworks like LangChain without understanding the underlying LLM mechanics, tokens, and embeddings.
  - **Data & Curation:** Success lies in data preparation (chunking, parsing) and secure infrastructure, not just API calls.
- **Visual Concept:** Side-by-side comparison of a traditional developer path vs. the GenAI Engineer path, highlighting data integration.

## Slide 3: What is an LLM?
- **Title:** Under the Hood of Large Language Models
- **Content:**
  - **The Engine:** Based on the **Transformer** architecture (Self-Attention mechanism).
  - **Process:** Words are split into **tokens**, converted to numeric vectors (**embeddings**), and processed to predict the next most probable token.
  - **Parameters:** Weight variables adjusted during training that determine how the model processes text.
- **Visual Concept:** Linear flow diagram: Text ➔ Tokens ➔ Embeddings ➔ Neural Network ➔ Prediction.

## Slide 4: Foundation Models vs. Fine-Tuning
- **Title:** Choosing the Right Model Strategy
- **Content:**
  - **Foundation Models:** Pre-trained on massive open datasets (e.g., GPT-4, LLaMA, DBRX). Good generalists.
  - **Fine-Tuning:** Training a foundation model on domain-specific data to excel at a single task.
  - **Open-Source Power:** Models like **DBRX** (Mixture of Experts) offer competitive quality at a fraction of the cost.
- **Visual Concept:** Grid chart comparing Cost, Training Time, and Domain Specialization.

## Slide 5: Tokens & Context Window Constraints
- **Title:** Key Technical Limitations
- **Content:**
  - **Tokens:** The currency of GenAI. 1 token ≈ 0.75 words. Costs and limits are measured in tokens.
  - **Context Window:** The maximum memory a model has in a single run (Prompt + Completion).
  - **The Constraint:** Long documents exceed the window, causing high latency or data loss ("lost in the middle").
- **Visual Concept:** Diagram showing how accuracy drops when critical information is placed in the middle of a large prompt.

## Slide 6: RAG to the Rescue
- **Title:** Retrieval-Augmented Generation (RAG)
- **Content:**
  - **The Problem:** LLMs hallucinate and lack private corporate data.
  - **The Solution:** RAG queries your database first, retrieves relevant chunks, and injects them into the prompt.
  - **The Result:** Grounded answers, drastically reducing hallucinations.
- **Visual Concept:** 3-step pipeline: User Query ➔ Semantic Data Retrieval ➔ LLM Response Generation.

## Slide 7: Databricks Vector Search
- **Title:** Semantic Search in the Lakehouse
- **Content:**
  - **Step 1: Source Delta Table:** Structured storage containing raw text data and metadata inside Delta Lake.
  - **Step 2: Embedding Pipeline:** Automatic vector computation running under the hood via Foundation Model APIs.
  - **Step 3: Vector Search Index:** Real-time queryable index fully governed by Unity Catalog access controls.
- **Visual Concept:** A horizontal or vertical 3-step data flow diagram: Raw Delta Table ➔ Embedding Engine ➔ Vector Search Index, all wrapped inside Unity Catalog.

## Slide 8: Databricks Mosaic AI Stack
- **Title:** Unifying the GenAI Lifecycle
- **Content:**
  - **Foundation Model APIs:** One interface to call external or open-source LLMs.
  - **Model Serving:** Serverless endpoints to serve models with auto-scaling and rate-limiting.
  - **Agent Framework:** Tools to deploy autonomous agents that interact with APIs and databases.
- **Visual Concept:** 3-layer architecture diagram (APIs, Serving, Agents) governed by Unity Catalog.

## Slide 9: Exam Blueprint
- **Title:** Where to Focus Your Study?
- **Content:**
  - **Application Development (30%):** The biggest domain (RAG, LangChain, Chains & Agents).
  - **Assembling & Deploying (22%):** Model Serving and MLflow logging.
  - **Design & Data Prep (28%):** Chunking, Prompt Engineering.
  - **Evaluation & Governance (20%):** Monitoring, MLflow Evaluate, Security.
- **Visual Concept:** A vertical bar chart showing the weights of each domain.

## Slide 10: 12-Week Roadmap
- **Title:** The Journey Starts Today
- **Content:**
  - **Weeks 1-2:** Foundational Concepts & Prompt Engineering.
  - **Weeks 3-5:** RAG Architecture, Chunking, and Vector Search.
  - **Weeks 6-7:** LangChain & Mosaic AI Agent Framework.
  - **Weeks 8-10:** Model Serving, MLflow, Evaluation & Monitoring.
  - **Weeks 11-12:** Governance & Exam Readiness.
  - **Deep Dive:** Read the full explanation with interactive figures in my blog series: **El Puente al Machine Learning** (normansabillon.hashnode.dev).
- **Visual Concept:** Timeline roadmap with the current phase (Phase 1) highlighted.


---

# PARTE 2: Versión en Español (Slides 11 - 20)

## Slide 11: Portada
- **Título:** Ingeniería de IA Generativa con Databricks
- **Subtítulo:** Módulo 0: Conceptos Fundamentales y Mapa del Examen
- **Metadatos:** Ruta de Estudio · Generative AI Engineer Associate
- **Autor:** Norman Sabillón (2026)
- **Concepto Visual:** Fondo oscuro con líneas brillantes de red de nodos en color violeta. Insignia en la parte superior: "MÓDULO 0 / 11".

## Slide 12: El Giro Estratégico
- **Título:** ¿Por qué Ingeniería de IA Generativa?
- **Contenido:**
  - **Más allá de la moda:** No se trata de escribir prompts en un chat. Se trata de construir sistemas empresariales en producción sobre el Lakehouse.
  - **La "Trampa de las Librerías":** Evitar el error de usar frameworks como LangChain sin entender el funcionamiento real de los LLMs, tokens y embeddings.
  - **Datos e Infraestructura:** El éxito reside en la preparación de datos (chunking, parsing) y la gobernanza, no solo en consumir APIs.
- **Concepto Visual:** Comparativa de la ruta de desarrollo tradicional vs. Ingeniero de GenAI, destacando la integración de datos.

## Slide 13: ¿Qué es un LLM?
- **Título:** Bajo el capó de los Large Language Models
- **Contenido:**
  - **El Motor:** Basado en la arquitectura **Transformer** (mecanismo de auto-atención).
  - **Proceso:** El texto se divide en **tokens**, se convierte en vectores numéricos (**embeddings**) y se procesa para predecir el siguiente token más probable.
  - **Parámetros:** Variables de peso ajustadas durante el entrenamiento que definen cómo el modelo procesa la información.
- **Concepto Visual:** Diagrama de flujo lineal: Texto ➔ Tokens ➔ Embeddings ➔ Red Neuronal ➔ Predicción.

## Slide 14: Modelos Base vs. Fine-Tuning
- **Título:** Elegir la Estrategia de Modelo Correcta
- **Contenido:**
  - **Foundation Models (Base):** Pre-entrenados con datos masivos y públicos (ej. GPT-4, LLaMA, DBRX). Buenos generalistas.
  - **Fine-Tuning (Ajuste Fino):** Entrenar un modelo base con datos específicos de un negocio para destacar en una sola tarea.
  - **Poder de Código Abierto:** Modelos como **DBRX** (Mixture of Experts) ofrecen calidad competitiva a una fracción del costo.
- **Concepto Visual:** Tabla comparativa de Costo, Tiempo de Entrenamiento y Especialización.

## Slide 15: Restricciones de Tokens y Ventana de Contexto
- **Título:** Limitaciones Técnicas Clave
- **Contenido:**
  - **Tokens:** La moneda de cambio de GenAI. 1 token ≈ 0.75 palabras. Costos y límites se miden en tokens.
  - **Ventana de Contexto:** La memoria máxima que tiene un modelo en una sola llamada (Prompt + Respuesta).
  - **La Restricción:** Documentos muy largos exceden la ventana, causando latencia o pérdida de datos ("perdido en el medio").
- **Concepto Visual:** Gráfico conceptual que muestra cómo la precisión decae en la mitad de ventanas muy grandes.

## Slide 16: RAG al Rescate
- **Título:** Generación Enriquecida con Recuperación (RAG)
- **Contenido:**
  - **El Problema:** Los LLMs alucinan y no conocen los datos privados de la empresa.
  - **La Solución:** RAG consulta primero tu base de datos, extrae fragmentos relevantes y los inyecta en el prompt.
  - **El Resultado:** Respuestas fundamentadas en datos reales, reduciendo alucinaciones.
- **Concepto Visual:** Pipeline de 3 pasos: Consulta ➔ Búsqueda Semántica ➔ Generación del LLM.

## Slide 17: Databricks Vector Search
- **Título:** Búsqueda Semántica en el Lakehouse
- **Contenido:**
  - **Paso 1: Tabla Delta de Origen:** Almacenamiento estructurado de texto crudo y metadatos en Delta Lake.
  - **Paso 2: Pipeline de Embedding:** Computación vectorial automática bajo el capó mediante Foundation Model APIs.
  - **Paso 3: Índice Vectorial:** Índice consultable en tiempo real gobernado por los controles de acceso de Unity Catalog.
- **Concepto Visual:** Diagrama de flujo de datos de 3 pasos: Tabla Delta ➔ Motor de Embeddings ➔ Índice Vectorial, todo bajo la gobernanza de Unity Catalog.

## Slide 18: Databricks Mosaic AI Stack
- **Título:** Unificando el Ciclo de Vida de GenAI
- **Contenido:**
  - **Foundation Model APIs:** Interfaz única para consumir modelos externos o de código abierto.
  - **Model Serving:** Endpoints sin servidor para desplegar modelos con escalado automático y límites de tasa.
  - **Agent Framework:** Herramientas para desplegar agentes autónomos que interactúan con APIs y bases de datos.
- **Concepto Visual:** Diagrama de arquitectura de 3 capas (APIs, Serving, Agentes) bajo Unity Catalog.

## Slide 19: Mapa del Examen
- **Título:** ¿Dónde Enfocar el Estudio?
- **Contenido:**
  - **Application Development (30%):** El dominio de mayor peso (RAG, LangChain, Chains y Agentes).
  - **Assembling & Deploying (22%):** Model Serving y registro en MLflow.
  - **Design & Data Prep (28%):** Chunking, Prompt Engineering.
  - **Evaluation & Governance (20%):** Monitoreo, MLflow Evaluate, Seguridad.
- **Concepto Visual:** Gráfico de barras vertical que muestra los pesos de cada dominio.

## Slide 20: Ruta de 12 Semanas
- **Título:** El Viaje Comienza Hoy
- **Contenido:**
  - **Semanas 1-2:** Conceptos Fundamentales y Prompt Engineering.
  - **Semanas 3-5:** Arquitectura RAG, Chunking y Vector Search.
  - **Semanas 6-7:** LangChain y Mosaic AI Agent Framework.
  - **Semanas 8-10:** Model Serving, MLflow, Evaluación y Monitoreo.
  - **Semanas 11-12:** Gobernanza y Preparación Final.
  - **Lectura recomendada:** Lee el artículo detallado y las figuras interactivas en mi serie de blog: **El Puente al Machine Learning** (normansabillon.hashnode.dev).
- **Concepto Visual:** Línea de tiempo con las fases del roadmap destacando la fase inicial.

