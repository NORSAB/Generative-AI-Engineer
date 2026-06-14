# Introducción a LLMs y IA Generativa

Todo lo que necesitas saber antes de construir tu primera aplicación de IA Generativa.

Módulo 0 — Ruta de Certificación Databricks Generative AI Engineer Associate

Autor: Norman Sabillón

---

# ¿Qué es un Large Language Model?

Antes de escribir una sola línea de código, necesitas entender qué es realmente un LLM y por qué cambió las reglas del juego en la industria tecnológica.

Un **Large Language Model (LLM)** es un modelo de red neuronal entrenado con cantidades masivas de texto para predecir la siguiente palabra en una secuencia. Suena simple, pero esa capacidad de predicción escala a tareas extraordinarias: traducción, razonamiento, generación de código, análisis de sentimiento, resumen, y mucho más.

La arquitectura detrás es el **Transformer**, publicado en el paper "Attention Is All You Need" (2017). Antes de los Transformers, los modelos de lenguaje procesaban las palabras de forma secuencial — como leer una frase palabra por palabra. Los Transformers introducen el mecanismo de **Self-Attention**, que permite al modelo ver toda la secuencia al mismo tiempo y entender qué palabras son relevantes para cuáles.

**¿Cómo funciona internamente?** El texto se convierte en **tokens** (fragmentos de palabras o caracteres). Cada token se transforma en un **embedding**: un vector numérico que captura su significado semántico. Estos embeddings pasan por múltiples capas de atención que refinan progresivamente la representación del contexto. Al final, el modelo produce una distribución de probabilidad sobre todos los tokens posibles y selecciona el más probable.

Los parámetros del modelo (miles de millones) son los pesos ajustados durante el entrenamiento que determinan cómo se transforman estos embeddings. Más parámetros generalmente implican más capacidad, pero también más costo de inferencia.

---

# El Ecosistema Actual de Modelos

No todos los LLMs son iguales. Entender las categorías te permite elegir el modelo correcto para cada problema — y eso es exactamente lo que el examen evalúa.

**Foundation Models** son modelos pre-entrenados con datos generales (internet, libros, código). No están especializados en ninguna tarea concreta, pero pueden realizar muchas de forma aceptable. GPT-4, Claude, Gemini, LLaMA 3 y **DBRX** (el modelo open-source de Databricks) son Foundation Models.

**Fine-Tuned Models** parten de un Foundation Model y se entrenan adicionalmente con datos específicos de un dominio o tarea. Por ejemplo, un modelo fine-tuned para clasificar tickets de soporte o para generar SQL a partir de lenguaje natural. El fine-tuning mejora la precisión en la tarea objetivo, pero reduce la generalidad.

**Open-Source vs Propietarios.** Los modelos open-source (LLaMA 3, Mixtral, DBRX, Mistral) te dan control total: puedes desplegarlos en tu infraestructura, fine-tunearlos y auditarlos. Los propietarios (GPT-4, Claude, Gemini) ofrecen rendimiento superior en muchos benchmarks, pero dependes del proveedor y los datos pasan por sus servidores.

**DBRX** merece atención especial. Es el Foundation Model open-source de Databricks, con arquitectura Mixture of Experts (MoE), lo que significa que solo activa una fracción de sus parámetros por cada inferencia. Resultado: rendimiento competitivo con GPT-3.5 a una fracción del costo computacional.

**La decisión para el examen:** Databricks promueve un enfoque agnóstico — usar Foundation Model APIs que te permiten cambiar de modelo sin modificar tu código.

---

# Tokens, Ventana de Contexto y Embeddings

Tres conceptos que aparecen en cada pregunta del examen. Si los entiendes bien, el resto del contenido fluye naturalmente.

**Tokens.** Un LLM no procesa palabras, procesa tokens. Un token puede ser una palabra completa ("Databricks"), una subpalabra ("Data" + "bricks"), o incluso un carácter. En promedio, 1 token equivale a aproximadamente 0.75 palabras en inglés. ¿Por qué importa? Porque los costos se calculan por token y la ventana de contexto se mide en tokens.

**Ventana de Contexto (Context Window).** Es la cantidad máxima de tokens que un modelo puede procesar en una sola llamada — incluyendo el prompt de entrada y la respuesta generada. GPT-4 Turbo tiene una ventana de 128K tokens. DBRX tiene 32K tokens. Si tu documento excede la ventana, el modelo simplemente no puede "verlo" completo. Esto es precisamente por qué existe **RAG** (Retrieval-Augmented Generation), que veremos en módulos posteriores.

**Embeddings.** Son representaciones numéricas (vectores) del significado semántico de un texto. Dos frases con significado similar tendrán embeddings cercanos en el espacio vectorial, aunque usen palabras completamente diferentes. "El gato está en el tejado" y "Un felino descansa sobre la cubierta" producen embeddings similares. Los embeddings son la base de la búsqueda semántica, la clasificación de texto y los sistemas RAG.

En Databricks, puedes generar embeddings usando **Foundation Model APIs** o modelos de embedding dedicados como `bge-large-en` o `gte-large`, desplegados en Model Serving endpoints.

---

# Casos de Uso Empresariales de GenAI

La IA Generativa no es solo ChatGPT. Las aplicaciones empresariales reales son mucho más específicas y medibles.

**Asistentes de Conocimiento Interno.** Empleados consultan documentación corporativa, políticas, manuales técnicos y bases de conocimiento en lenguaje natural. El sistema busca la información relevante (RAG) y genera respuestas contextualizadas. Ejemplo: "¿Cuál es la política de devoluciones para clientes premium en Centroamérica?"

**Generación de Código y SQL.** Analistas de negocio describen lo que necesitan en español y el sistema genera la query SQL correspondiente. Databricks AI/BI Genie hace exactamente esto: traduce preguntas de negocio a SQL ejecutable sobre tu Lakehouse.

**Extracción y Clasificación de Documentos.** Procesar miles de contratos, facturas, reportes regulatorios o correos electrónicos para extraer campos clave (fechas, montos, nombres) y clasificarlos automáticamente. Los LLMs superan a las técnicas de NLP tradicionales en esta tarea porque entienden contexto, no solo patrones.

**Agentes Autónomos.** Sistemas que no solo generan texto, sino que ejecutan acciones: consultan bases de datos, llaman APIs, toman decisiones y reportan resultados. El **Mosaic AI Agent Framework** de Databricks permite construir estos agentes directamente en la plataforma.

**Resumen y Análisis de Sentimiento.** Condensar miles de reseñas de productos, llamadas de servicio al cliente o reportes financieros en insights accionables. No es solo resumir — es identificar patrones, tendencias y anomalías.

---

# Limitaciones que Debes Conocer

Si no entiendes las limitaciones de los LLMs, no puedes diseñar aplicaciones robustas. El examen evalúa tu capacidad para identificar cuándo un LLM es la herramienta correcta y cuándo no.

**Alucinaciones.** El modelo genera información que suena plausible pero es falsa. Esto ocurre porque los LLMs son modelos probabilísticos — predicen la siguiente palabra más probable, no la más verdadera. Un LLM puede inventar una referencia académica completa con autores, año y título que simplemente no existe. La solución principal es **RAG**: anclar las respuestas a datos verificables de tu organización.

**Sesgo (Bias).** Los modelos heredan los sesgos presentes en sus datos de entrenamiento. Si los datos de entrenamiento sub-representan ciertos grupos, el modelo reproducirá esa disparidad. Para aplicaciones empresariales, es crítico implementar **guardrails** y evaluaciones de fairness.

**Ventana de Contexto Limitada.** Por más grande que sea la ventana, siempre hay un límite. Documentos muy largos necesitan estrategias de chunking y retrieval. Además, el rendimiento del modelo tiende a degradarse en los extremos de ventanas muy largas — el famoso "lost in the middle" problem.

**No Razona, Predice.** Un LLM no "piensa" ni "entiende" en el sentido humano. Produce la secuencia más probable basándose en patrones estadísticos. Esto significa que falla en tareas que requieren razonamiento lógico riguroso, matemáticas complejas o conocimiento actualizado más allá de su fecha de entrenamiento.

**Costo y Latencia.** Modelos más grandes producen mejores respuestas, pero son más lentos y costosos. En producción, necesitas balancear calidad vs. velocidad vs. presupuesto. Databricks aborda esto con Foundation Model APIs que permiten escalar según demanda.

---

# Mosaic AI — El Ecosistema GenAI de Databricks

Databricks no es solo un Data Lakehouse. Desde la adquisición de MosaicML en 2023, se convirtió en una plataforma completa de IA Generativa. Mosaic AI es el paraguas que agrupa todas las capacidades de GenAI en Databricks.

**Foundation Model APIs.** Acceso unificado a modelos como DBRX, LLaMA 3, Mixtral y modelos externos (GPT-4, Claude) a través de una sola API. Puedes cambiar de modelo con un parámetro, sin reescribir tu aplicación. Esto se llama **External Models** y es la forma recomendada de integrar modelos propietarios.

**Model Serving.** Endpoints dedicados para servir modelos en tiempo real o por lotes (batch). Incluye autoscaling, rate limiting y control de acceso vía Unity Catalog. Cada endpoint puede servir múltiples modelos con enrutamiento inteligente.

**Vector Search.** Índices de búsqueda semántica integrados directamente en Unity Catalog. Soporta dos modos: **Delta Sync Index** (sincroniza automáticamente con una tabla Delta) y **Direct Vector Access** (para búsquedas con embeddings pre-calculados).

**Agent Framework.** Herramienta para construir, evaluar y desplegar agentes de IA que pueden ejecutar acciones complejas. Incluye patrones predefinidos como Knowledge Assistants, Multi-Agent Supervisors e Information Extraction pipelines.

**MLflow para GenAI.** MLflow se extiende con capacidades específicas para GenAI: logging de prompts y respuestas, evaluación automatizada con LLM-as-a-Judge, trazabilidad de cadenas de llamadas (tracing), y registro de modelos en Unity Catalog.

Este ecosistema es el núcleo del examen. Cada módulo de esta serie profundiza en uno de estos componentes.

---

# Pipeline Típico de una Aplicación GenAI

Antes de entrar a los detalles técnicos en los próximos módulos, necesitas visualizar cómo se ensambla una aplicación GenAI end-to-end en Databricks. Este es el flujo que construirás pieza a pieza.

**Paso 1: Preparación de Datos.** Tus documentos (PDFs, wikis, bases de datos) se procesan, se dividen en chunks y se convierten en embeddings. Estos se almacenan en una tabla Delta que alimenta un índice de Vector Search. Herramientas: Delta Lake, Unity Catalog, modelos de embedding.

**Paso 2: Retrieval (Búsqueda).** Cuando un usuario hace una pregunta, la pregunta se convierte en un embedding y se buscan los chunks más relevantes en el índice vectorial. Herramienta: Databricks Vector Search.

**Paso 3: Augmentation (Enriquecimiento).** Los chunks recuperados se inyectan en el prompt del LLM como contexto. El prompt incluye instrucciones del sistema, el contexto recuperado y la pregunta del usuario. Esto es lo que hace que el LLM responda con información específica de tu organización.

**Paso 4: Generation (Generación).** El LLM procesa el prompt completo y genera una respuesta. Herramienta: Foundation Model APIs o Model Serving endpoints.

**Paso 5: Evaluación.** La calidad de la respuesta se mide con métricas como relevancia, fidelidad (faithfulness), y toxicidad. MLflow Evaluate permite esto de forma automatizada. LLM-as-a-Judge usa otro modelo para evaluar la calidad.

**Paso 6: Monitoreo.** En producción, Inference Tables capturan cada request/response automáticamente. Agent Monitoring detecta degradación en calidad, latencia y costos.

Este pipeline es el hilo conductor de toda la certificación. Cada módulo profundiza en uno o más pasos.

---

# Databricks vs El Resto — Posicionamiento

¿Por qué Databricks y no solo OpenAI o AWS Bedrock? El examen no te pide comparar plataformas directamente, pero entender el posicionamiento te ayuda a responder preguntas de diseño.

**La ventaja de Databricks es la integración.** En otras plataformas, necesitas pegar piezas de diferentes servicios: un vector database aquí, un modelo allá, un sistema de monitoreo por otro lado. En Databricks, todo vive en el mismo ecosistema: los datos (Delta Lake), la gobernanza (Unity Catalog), los modelos (Model Serving), la búsqueda (Vector Search) y el monitoreo (Inference Tables + MLflow).

**Gobernanza unificada.** Unity Catalog gobierna datos, modelos, endpoints y funciones con el mismo framework de permisos. Esto es crítico para empresas reguladas (banca, salud, seguros) donde necesitas auditoría completa de quién accedió a qué, cuándo y para qué.

**Open-source primero.** Databricks apuesta por estándares abiertos: Delta Lake (open-source), MLflow (open-source), Apache Spark (open-source), DBRX (open-source). Esto reduce el vendor lock-in y te da portabilidad.

**Multi-cloud.** Funciona en AWS, Azure y GCP con la misma interfaz. Tu código no cambia entre nubes.

**El mensaje clave para el examen:** Databricks no compite con los LLMs — compite con las plataformas donde los despliegas. Su valor está en la infraestructura que rodea al modelo: datos, seguridad, escalabilidad y monitoreo.

---

# Estructura del Examen y Ruta de Estudio

Terminamos este módulo introductorio con el mapa completo de lo que viene. Así sabrás exactamente qué estudiar y con qué prioridad.

El examen tiene **45 preguntas** que debes responder en **90 minutos**. Son preguntas de opción múltiple y opción múltiple con varias respuestas correctas. Se aprueba con **70% o más** (mínimo 32 aciertos).

Los dominios y sus pesos son:

**Application Development (30%)** — El dominio más importante. LangChain, RAG, agentes, tool calling. Módulos 5, 6 y 7 de esta serie.

**Assembling & Deploying (22%)** — Model Serving, Vector Search, MLflow, pyfunc. Módulos 7 y 3.

**Design Applications (14%)** — Prompt engineering, diseño de cadenas, descomposición de problemas. Módulos 0 y 1.

**Data Preparation (14%)** — Chunking, parsing, ETL para RAG. Módulos 2 y 4.

**Evaluation & Monitoring (12%)** — MLflow Evaluate, Inference Tables, Agent Monitoring. Módulos 8 y 9.

**Governance (8%)** — Unity Catalog para IA, guardrails, responsible AI. Módulo 10.

La estrategia recomendada: domina primero App Development y Deploying (juntos son el 52% del examen), luego refuerza Design y Data Prep, y finaliza con Evaluation y Governance.

Pregunta de examen: "¿Cuál es el dominio con mayor peso en el examen de Generative AI Engineer?" La respuesta es Application Development con 30%.

Autor: Norman Sabillón

#DATABRICKS #GENAI #LLM #GENERATIVEAI #RAG #MOSAICAI #CERTIFICACION #IAINGENIERIA #MACHINELEARNING #TRANSFORMERS
