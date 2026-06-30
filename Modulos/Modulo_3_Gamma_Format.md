# Módulo 3: Desarrollo de Agentes de IA y Orquestación
Construcción de agentes inteligentes, integración de herramientas (Tools) vía Unity Catalog y trazabilidad del flujo con MLflow.

Ruta de Estudio — Databricks Certified Generative AI Engineer Associate
Autor: Norman Sabillón (2026)

---

# ¿Qué es un Agente de IA en Databricks?

Los agentes representan la evolución de los sistemas estáticos a sistemas dinámicos con capacidad de acción.

*   **Lógica RAG Simple (Cadena Estática):** Sigue un pipeline lineal predefinido. Entrada del usuario ➔ Recuperación vectorial ➔ Prompt ➔ Respuesta de un LLM. No puede tomar decisiones de flujo.
*   **Agentes de IA (Flujo Dinámico):** El modelo de lenguaje actúa como el motor de decisión o "cerebro". Evalúa el prompt del usuario, decide si requiere información extra, selecciona una o varias herramientas, analiza el resultado y repite el proceso hasta cumplir el objetivo.
*   **Mecánica de Bucle (Reasoning-Action Loop):** 
    1.  *Pensamiento:* Evaluar qué le falta para responder.
    2.  *Acción:* Elegir una herramienta y ejecutarla.
    3.  *Observación:* Estudiar la respuesta de la herramienta para decidir si terminar o ejecutar otra acción.

---

# Unity Catalog Functions como Herramientas (Tools)

La gobernanza de datos y la ejecución de acciones unificadas en un solo lugar.

*   **¿Qué es una Tool?** Cualquier API, base de datos o script que el LLM pueda invocar para obtener contexto del mundo real.
*   **Funciones de Unity Catalog (UC Functions):** Databricks permite registrar funciones SQL o funciones de Python directamente en el catálogo corporativo.
*   **Ventajas de usar UC Functions como herramientas:**
    *   *Gobernanza:* Acceso seguro gobernado por el mismo esquema de seguridad de datos (RBAC). Si el usuario no tiene permisos para correr la función, el agente tampoco podrá usarla.
    *   *Portabilidad:* Una función registrada en Unity Catalog puede ser llamada por cualquier agente en cualquier notebook, sin duplicar código.
    *   *Auto-Documentación:* El LLM lee la descripción de la función y sus parámetros en Unity Catalog para entender exactamente cuándo y cómo invocarla.

---

# Mosaic AI Agent Framework (Agent Bricks)

El framework nativo de Databricks para crear, depurar y desplegar agentes en producción.

*   **Fundamento:** Mosaic AI Agent Framework (anteriormente conocido en desarrollo como Agent Bricks) simplifica el ciclo de vida de los agentes conectándolos con la infraestructura de Databricks.
*   **Componentes Clave:**
    *   *Modelos:* Conexión inmediata a endpoints de inferencia de Mosaic AI Model Serving.
    *   *Herramientas:* Integración nativa con funciones de Unity Catalog.
    *   *Orquestación:* Compatibilidad con flujos construidos en LangChain, LlamaIndex o código Python nativo.
*   **Despliegue Simple:** Permite empaquetar todo el agente (código, lógica, llamadas a herramientas y prompts) como un único artefacto compatible con MLflow.

---

# Creación de Herramientas con Funciones SQL y Python

Ejemplos de definición que el examen de Databricks evalúa para habilitar herramientas.

*   **Registro de una función SQL en Unity Catalog:**
    ```sql
    CREATE OR REPLACE FUNCTION catalog.schema.buscar_descuento_cliente(cliente_id INT)
    RETURNS DOUBLE
    COMMENT 'Retorna el porcentaje de descuento del cliente para un agente de ventas'
    RETURN SELECT descuento FROM catalog.schema.tabla_descuentos WHERE id = cliente_id;
    ```
*   **Registro de una función de Python en Unity Catalog:**
    *   Se escribe directamente en notebooks de Databricks usando sintaxis estándar de Python.
    *   Es crítico proveer descripciones claras (`COMMENT`) y tipado de variables (`type hints`). El LLM lee estos metadatos para saber qué tipo de dato pasarle a la herramienta.

---

# Integración del Agente con LangChain y Mosaic AI

Construir la lógica del agente y enlazarlo con las funciones creadas.

*   **Llamadas a Herramientas (Tool Calling):** Se le entregan las firmas de las funciones de Unity Catalog al LLM. El modelo responde indicando qué función quiere ejecutar y con qué parámetros, en lugar de retornar texto plano.
*   **El código básico de integración:**
    *   Se utiliza el SDK de Databricks o LangChain para leer las definiciones desde Unity Catalog.
    *   El motor del agente ejecuta la función localmente (o en el clúster) y le devuelve el resultado en texto al modelo para que continúe su bucle de razonamiento.
*   **Control del Límite de Ciclos:** Es obligatorio definir un número máximo de iteraciones (ej. 5) para evitar que el agente entre en bucles infinitos si las herramientas fallan o el modelo se confunde, lo que dispararía los costos de tokens.

---

# MLflow Tracing: Monitoreo en Tiempo de Ejecución

Ver el interior de la caja negra de la toma de decisiones del agente.

*   **El problema del debugging en agentes:** En un flujo de múltiples pasos, es muy difícil saber si el bot falló porque recuperó mal el dato, porque llamó a la herramienta equivocada o porque el LLM interpretó mal la respuesta.
*   **MLflow Tracing (Trazabilidad):** Registra automáticamente la secuencia exacta de llamadas del agente en una interfaz gráfica.
*   **Qué captura una traza de MLflow:**
    *   Las entradas y salidas de cada nodo del agente.
    *   El tiempo de latencia exacto de cada llamada.
    *   Las peticiones a las APIs del LLM y las consultas a las herramientas de Unity Catalog.
    *   Los tokens consumidos en cada interacción.
*   **Activación:** Se habilita fácilmente importando `mlflow` y corriendo `mlflow.langchain.autolog()` o usando decoradores de trazas en Python nativo.

---

# Versionamiento y Registro de Agentes en Unity Catalog

La ruta segura para llevar tus agentes desde el notebook de desarrollo hasta producción.

*   **Registro del Agente con MLflow:**
    *   Usamos `mlflow.models.set_model_dependency` para indicar qué herramientas de Unity Catalog requiere el agente.
    *   Registramos el agente usando la función `mlflow.pyfunc.log_model` o el helper específico del framework del agente.
*   **El rol de Unity Catalog:**
    *   El modelo del agente se guarda y versiona en Unity Catalog como un modelo registrado (`Registered Model`).
    *   Permite controlar las transiciones de estado del ciclo de vida del agente (desarrollo, pruebas, producción) mediante alias.
    *   Garantiza la reproducibilidad al congelar las dependencias de librerías y la versión exacta de las herramientas.

---

# Tips Clave para el Examen GenAI Engineer (Módulo 3)

*   **Unity Catalog Functions:** Si el examen pregunta cómo darle capacidades de ejecución de acciones seguras y gobernadas a un agente, la respuesta es registrar la herramienta como una función de Unity Catalog.
*   **MLflow Tracing:** Es la herramienta de Databricks diseñada específicamente para depurar y visualizar flujos de ejecución complejos de múltiples pasos (como cadenas LangChain o agentes interactivos).
*   **Descripciones de Parámetros:** Si un agente falla al intentar llamar a una herramienta porque confunde los tipos de variables o no sabe qué parámetros enviar, la solución es mejorar las descripciones (`COMMENT`) y los tipos de datos en la definición de la función en Unity Catalog.
*   **Límite de iteraciones:** Para mitigar cobros inesperados y ciclos infinitos en agentes con herramientas, es indispensable configurar un límite máximo de pasos de ejecución.

#DATABRICKS #AGENTES #MOSAICAI #MLFLOW #TRACING #UNITYCATALOG #TOOLS #LANGCHAIN #DESPLIEGUE
