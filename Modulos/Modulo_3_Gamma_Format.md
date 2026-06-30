# Presentación en Gamma: Desarrollo de Agentes e Integración de Herramientas (Módulo 3)

Este documento contiene la estructura de diapositivas para tu presentación en **Gamma**, dividida en dos secciones independientes: **Inglés** (versión principal de negocios) y **Español** (versión de soporte). 

Se especifican los recursos visuales en alta resolución (`figuras/Modulo_3/`) correspondientes para ser utilizados mediante arrastrar y soltar (drag-and-drop) en Gamma.

---

# SECTION 1: English Slide Deck

## Slide 1: Cover Page
* **Title:** AI Agents Development & Tools Integration
* **Subtitle:** Mastering Mosaic AI Agent Framework, Unity Catalog Functions, and MLflow Tracing
* **Author / Track:** Norman Sabillón — Databricks Certified Generative AI Engineer Associate Route
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\ruta_genai_modulo3_cover_1600x840.png`

---

## Slide 2: RAG vs. AI Agents
* **Key Concept:** Transitioning from static context search to active decision-making loops.
* **Core Points:**
  * **Static RAG (Read-Only):** Linear pipeline. Retrives documents, injects prompt, gets response. Cannot alter its own flow.
  * **AI Agents (Action-Oriented):** The LLM acts as the central brain. It evaluates user intent, chooses tools, interprets results, and loops dynamically.
  * **Use Case:** Choose RAG for basic information lookup; choose AI Agents when the system needs to execute database actions or call external APIs.

---

## Slide 3: The Reasoning-Action Loop (ReAct)
* **Key Concept:** The iterative cycle of Thought, Action, and Observation.
* **Core Points:**
  * **Thought:** LLM reasons about what information is missing to fulfill the user request.
  * **Action:** LLM selects a specific tool and defines its execution parameters.
  * **Observation:** The orchestrator runs the tool and inputs the result back to the LLM.
  * **Iteration Limit:** Infinite loops are mitigated by setting a hard limit on execution cycles (e.g., max 5 loops) to control token costs.

---

## Slide 4: Tools in Databricks: Unity Catalog Functions
* **Key Concept:** Leveraging registered functions as secure, governed agent tools.
* **Core Points:**
  * **What is a Tool?:** Any external action, API call, or query that the LLM can trigger.
  * **Unity Catalog Functions:** Registering SQL or Python functions directly in the catalog.
  * **Why UC Functions?:**
    * *Governance:* Security is inherited from Unity Catalog (RBAC). 
    * *Semantic Discovery:* LLM reads parameter types and description (`COMMENT`) to know when to use the tool.

---

## Slide 5: Registering SQL Tools
* **Key Concept:** Defining database queries as tools for the agent.
* **Core Points:**
  * Define explicit comments for both parameters and the function itself.
  * *Code Example:*
    ```sql
    CREATE OR REPLACE FUNCTION catalog.schema.get_customer_discount(customer_id INT COMMENT 'Unique ID')
    RETURNS DOUBLE
    COMMENT 'Retrieves the discount percentage for a active customer'
    RETURN SELECT discount FROM catalog.schema.discounts WHERE id = customer_id;
    ```
  * The description directly guides the LLM during function calling.

---

## Slide 6: Registering Python Tools
* **Key Concept:** Integrating complex logic and API calls as tools.
* **Core Points:**
  * Python tools are registered as User Defined Functions (UDFs) in Unity Catalog.
  * Leverage Python's `type hints` and docstrings.
  * *Code Example:*
    ```python
    def check_warehouse_inventory(product_id: int) -> str:
        """Checks current stock for a product in the warehouse."""
        # Custom DB/API logic here
        return f"Product {product_id}: 12 units available"
    ```
  * Python tools can access external services securely via Databricks secrets.

---

## Slide 7: Mosaic AI Agent Framework
* **Key Concept:** Unified architecture to build, test, and deploy enterprise-grade agents.
* **Core Points:**
  * Seamlessly connects LLM endpoints (Mosaic AI Model Serving) with Unity Catalog tools.
  * Native integration with popular orchestration frameworks like LangChain and LlamaIndex.
  * Empakages agent code, prompts, and dependencies into a single deployment-ready MLflow model.
* **Visual Asset to Drag-and-Drop:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\figura_1_arquitectura_agente.png`

---

## Slide 8: MLflow Tracing for AI Agents
* **Key Concept:** Inspecting the reasoning process of multi-step agents.
* **Core Points:**
  * **The Black Box Challenge:** Traditional debugging cannot trace dynamic agent loops easily.
  * **MLflow Tracing:** Automatically records the exact execution sequence of spans (nodes).
  * **Key Metadatas Captured:**
    * Inputs, outputs, and latencies for each tool call and LLM generation.
    * Cumulative token consumption to trace operational costs.

---

## Slide 9: Auto-logging with MLflow
* **Key Concept:** Enabling automatic tracing in notebooks.
* **Core Points:**
  * Integrate MLflow autologging with just two lines of code:
    ```python
    import mlflow
    mlflow.langchain.autolog(log_traces=True)
    ```
  * No manual logging code needed for LangChain or LlamaIndex chains.
  * Visually inspect traces directly within the Databricks Experiment UI.

---

## Slide 10: Registering and Deploying Agents
* **Key Concept:** Deploying agents safely using MLflow and Unity Catalog.
* **Core Points:**
  * **Tool Dependencies:** Declare tool dependencies explicitly using `mlflow.models.set_model_dependency`.
  * **Registered Models:** Register the agent object using `mlflow.pyfunc.log_model` inside a Unity Catalog schema.
  * **Version Control:** Manage environment promotions (Dev, Test, Prod) using aliases.

---

## Slide 11: Exam Study Tips (Module 3)
* **Key Concept:** High-probability topics for the GenAI Engineer certification.
* **Core Points:**
  * **UC Functions for Security:** Always choose UC functions for secure, role-based tool execution.
  * **Docstrings and Type Hints:** If tool calling fails, improve parameter comments and types.
  * **MLflow Tracing:** The primary tool to debug latencies and wrong tool routing.
  * **Loop Prevention:** Set an iteration limit to avoid cost overruns in production.

---

# SECTION 2: Diapositivas en Español

## Slide 1: Portada
* **Título:** Desarrollo de Agentes de IA e Integración de Herramientas
* **Subtítulo:** Dominando Mosaic AI Agent Framework, Unity Catalog Functions y MLflow Tracing
* **Autor:** Norman Sabillón — Ruta Certificación Databricks GenAI Engineer
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\ruta_genai_modulo3_cover_1600x840.png`

---

## Slide 2: RAG vs. Agentes de IA
* **Concepto Clave:** Transición de la búsqueda estática a bucles de decisión dinámicos.
* **Puntos Centrales:**
  * **RAG Estático (Solo Lectura):** Tubería lineal. Recupera contexto, inyecta prompt y responde. No altera su flujo.
  * **Agente de IA (Acción Directa):** El LLM actúa como cerebro central. Evalúa la intención, elige herramientas y analiza salidas.
  * **Decisión de Arquitectura:** Usa RAG para consultas simples; usa Agentes cuando necesites ejecutar acciones o consultar APIs.

---

## Slide 3: El Bucle de Reasoning-Action (ReAct Loop)
* **Concepto Clave:** Ciclo iterativo de Pensamiento, Acción y Observación.
* **Puntos Centrales:**
  * **Pensar (Thought):** El LLM evalúa qué información le falta para responder.
  * **Actuar (Action):** El LLM decide qué herramienta usar y extrae sus parámetros.
  * **Observar (Observation):** El orquestador ejecuta la herramienta y le devuelve el resultado al LLM.
  * **Control de Costos:** Se configura un límite máximo de iteraciones (ej. 5) para evitar bucles infinitos por fallas.

---

## Slide 4: Herramientas en Databricks: Unity Catalog Functions
* **Concepto Clave:** Uso de funciones del catálogo como herramientas seguras y gobernadas.
* **Puntos Centrales:**
  * **¿Qué es una Herramienta?:** Cualquier API, base de datos o script que el LLM pueda invocar.
  * **Funciones de Unity Catalog:** Registro directo de funciones SQL o Python.
  * **Ventajas de UC Functions:**
    * *Gobernanza:* Seguridad heredada por el catálogo (RBAC).
    * *Auto-documentación:* El LLM lee los comentarios (`COMMENT`) y tipos de datos para saber cómo invocarla.

---

## Slide 5: Registro de Herramientas SQL
* **Concepto Clave:** Definir consultas transaccionales como herramientas.
* **Puntos Centrales:**
  * Agregar comentarios claros tanto a la función como a cada parámetro de entrada.
  * *Ejemplo de Código:*
    ```sql
    CREATE OR REPLACE FUNCTION catalog.schema.get_customer_discount(customer_id INT COMMENT 'ID de Cliente')
    RETURNS DOUBLE
    COMMENT 'Retorna el porcentaje de descuento del cliente según su historial comercial'
    RETURN SELECT descuento FROM catalog.schema.descuentos WHERE id = customer_id;
    ```
  * Las descripciones le dicen al LLM exactamente cuándo y cómo ejecutar la llamada de función.

---

## Slide 6: Registro de Herramientas Python
* **Concepto Clave:** Integrar scripts y APIs externas de forma segura.
* **Puntos Centrales:**
  * Se registran como funciones definidas por el usuario (UDFs) en Unity Catalog.
  * Es obligatorio usar anotaciones de tipo (`type hints`) y docstrings estructurados.
  * *Ejemplo de Código:*
    ```python
    def check_warehouse_inventory(product_id: int) -> str:
        """Consulta el stock disponible de un producto en el almacén."""
        # Lógica personalizada aquí
        return f"Producto {product_id}: 12 unidades disponibles"
    ```
  * Las funciones de Python acceden a servicios de forma segura usando Databricks Secrets.

---

## Slide 7: Mosaic AI Agent Framework
* **Concepto Clave:** Plataforma unificada para construir, probar y desplegar agentes empresariales.
* **Puntos Centrales:**
  * Conecta de forma nativa endpoints de inferencia (Model Serving) con herramientas de Unity Catalog.
  * Totalmente compatible con frameworks de orquestación populares (LangChain y LlamaIndex).
  * Empaqueta el código, prompts y dependencias del agente en un único modelo de MLflow listo para producción.
* **Imagen a Arrastrar:**
  `D:\2026\Databricks\Roles\03_Generative_AI_Engineer\Blog\figuras\Modulo_3\figura_1_arquitectura_agente.png`

---

## Slide 8: MLflow Tracing para Agentes de IA
* **Concepto Clave:** Inspección y diagnóstico visual del razonamiento del agente.
* **Puntos Centrales:**
  * **El Reto:** Depurar bucles dinámicos de múltiples pasos es muy complejo.
  * **MLflow Tracing:** Registra la secuencia exacta de llamadas (Spans) de forma gráfica.
  * **Métricas Registradas:**
    * Entradas, salidas y latencia de cada herramienta e inferencia intermedia.
    * Consumo de tokens acumulado para auditar costos.

---

## Slide 9: Autologging con MLflow
* **Concepto Clave:** Habilitación rápida de la trazabilidad en desarrollo.
* **Puntos Centrales:**
  * Habilita la traza en tus notebooks con solo dos líneas:
    ```python
    import mlflow
    mlflow.langchain.autolog(log_traces=True)
    ```
  * Compatible de forma automática con cadenas de LangChain y LlamaIndex.
  * Visualiza las trazas interactivamente desde la UI de Experimentos en Databricks.

---

## Slide 10: Registro y Despliegue de Agentes
* **Concepto Clave:** Versionar y desplegar agentes usando Unity Catalog.
* **Puntos Centrales:**
  * **Dependencias:** Declara las funciones asociadas mediante `mlflow.models.set_model_dependency`.
  * **Modelo Registrado:** Registra la lógica usando `mlflow.pyfunc.log_model` en un esquema de Unity Catalog.
  * **Gobernanza:** Controla los cambios de ambiente (Desarrollo, Pruebas, Prod) mediante alias de modelos.

---

## Slide 11: Tips de Estudio para el Examen (Módulo 3)
* **Concepto Clave:** Temas clave a memorizar para la certificación oficial.
* **Puntos Centrales:**
  * **Funciones de UC:** Es la respuesta correcta para ejecutar herramientas con seguridad basada en roles (RBAC).
  * **Docstrings y Tipados:** Si la llamada de herramienta falla, la solución es enriquecer los comentarios y tipos en la firma.
  * **MLflow Tracing:** Herramienta clave para depurar latencias y malas llamadas en flujos interactivos.
  * **Límite de bucles:** Debes configurar siempre un límite máximo de iteraciones para proteger la facturación.
