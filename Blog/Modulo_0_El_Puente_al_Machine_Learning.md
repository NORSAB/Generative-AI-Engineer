# Del BI al Machine Learning: ¿Qué pasa realmente cuando le hablas a un LLM?

Hace unos meses decidí dar un paso importante. Tras certificarme como Analista de Datos en Databricks, me di cuenta de que el verdadero reto no está en crear dashboards bonitos, sino en entender qué pasa detrás cuando intentamos que las máquinas piensen (o al menos lo parezca). Así nace esta serie: **El Puente al Machine Learning**, un espacio donde quiero explicarte los conceptos sin rodeos matemáticos incomprensibles, pero sin caer en la trampa de usar librerías como LangChain como si fueran magia negra.

Hoy empezamos con el **Módulo 0**: lo que necesitas saber antes de escribir tu primera línea de código de IA Generativa y orquestar soluciones reales en la nube.

---

## ¿Qué es un Large Language Model (LLM)?

Antes de tirar código, necesitas entender qué es un LLM y por qué ha cambiado las reglas del juego. 

Un **Large Language Model (LLM)** es una red neuronal gigante entrenada con enormes volúmenes de texto para adivinar la siguiente palabra en una secuencia. Suena muy básico, pero al escalar este principio a miles de millones de palabras, el modelo adquiere capacidades asombrosas: resume textos, traduce idiomas, programa código, analiza sentimientos y razona sobre problemas complejos.

El motor de todo esto es la arquitectura **Transformer**, descrita en el histórico paper *"Attention Is All You Need"* (2017). A diferencia de las antiguas redes recurrentes (RNN) que leían las oraciones palabra por palabra (lo que causaba que olvidaran el inicio del párrafo al llegar al final), el Transformer procesa toda la frase a la vez. Lo logra con el mecanismo de **Auto-Atención (Self-Attention)**, que calcula qué palabras de una oración se relacionan más con otras para definir el contexto.

<iframe src="https://norsab.github.io/Generative-AI-Engineer/Blog/figuras/figura2.html" width="100%" height="480" style="border:none; border-radius:12px; background: #0B0F19; overflow:hidden;" title="Mecanismo de Auto-Atención (Self-Attention)"></iframe>

---

## El Ecosistema Actual de Modelos

No todos los LLMs son iguales. Para la certificación de Databricks, debes distinguir claramente entre las siguientes categorías:

* **Foundation Models (Modelos Base)**: Son los gigantes pre-entrenados con miles de millones de palabras públicas procedentes de internet, libros y código. Son generalistas capaces de realizar múltiples tareas. Ejemplos de esto son GPT-4, Claude, Gemini, LLaMA 3 y **DBRX** (el modelo abierto de Databricks).
* **Fine-Tuned Models (Modelos Ajustados)**: Parten de un modelo base y reciben entrenamiento extra con un conjunto de datos muy específico. Por ejemplo, un modelo especializado en transcribir recetas médicas o generar código SQL. Mejora el rendimiento en una tarea, pero pierde habilidad en la conversación general.
* **Modelos Abiertos vs. Propietarios**: Los abiertos (LLaMA 3, Mixtral, DBRX) te dan el control del código y los pesos, permitiéndote desplegarlos en tu propia infraestructura de nube. Los propietarios (GPT-4, Claude) se consumen como servicio pagado (API) y no tienes acceso a sus componentes internos.

### DBRX: La joya de Databricks
Para el examen, quédate con este nombre: **DBRX**. Es el modelo abierto desarrollado por Databricks en 2024. Su arquitectura es del tipo **Mixture of Experts (MoE)**. En lugar de activar todos sus parámetros en cada palabra que genera, solo activa un subconjunto de "expertos" especializados. Esto le permite competir en calidad con modelos como GPT-3.5 a una fracción del costo computacional de cómputo en la nube.

---

## Tokens, Ventana de Contexto y Embeddings

Tres conceptos indispensables para entender el flujo técnico del examen.

* **Tokens**: Un LLM no lee palabras completas, las corta en trozos llamados tokens. Un token puede ser una palabra entera ("Databricks"), una parte de ella ("Data" y "bricks") o un espacio. En promedio, **1 token equivale a unas 0.75 palabras** en inglés. La facturación de las APIs se calcula en base a tokens consumidos.
* **Ventana de Contexto (Context Window)**: Es el límite de memoria del modelo en una sola llamada de entrada y salida. DBRX tiene una ventana de 32K tokens, mientras que otros modelos alcanzan 128K o más. Superar este límite significa que el modelo olvidará la información más vieja.
* **Embeddings**: Son representaciones matemáticas del significado de las palabras. Cada palabra o frase se convierte en una lista de números (un vector) en un espacio de muchas dimensiones. Lo valioso de esto es que palabras con significados similares (ejemplo: "médico" y "doctor") quedan ubicadas muy cerca unas de otras en este mapa matemático, facilitando las búsquedas semánticas.

<iframe src="https://norsab.github.io/Generative-AI-Engineer/Blog/figuras/figura1.html" width="100%" height="480" style="border:none; border-radius:12px; background: #0B0F19; overflow:hidden;" title="De Texto a Vectores: Tokenización y Embeddings"></iframe>

---

## Casos de Uso Empresariales de GenAI

En el mundo corporativo, la IA generativa va mucho más allá de un chat simple. Los ingenieros implementamos soluciones integradas:

1. **Asistentes de Conocimiento Interno**: Permiten a los empleados realizar consultas sobre manuales, políticas y wikis de la empresa en lenguaje natural, recuperando la respuesta correcta al instante.
2. **Generación de Código y SQL**: Traducen preguntas de negocio a consultas de bases de datos. Un ejemplo de esto en Databricks es **AI/BI Genie**, que permite a los usuarios hacer analítica de datos sin saber programar SQL.
3. **Extracción y Clasificación de Documentos**: Automatizan la lectura de miles de facturas o contratos para extraer campos clave (montos, fechas) o categorizarlos.
4. **Agentes Autónomos**: Programas que no solo conversan, sino que ejecutan acciones como enviar un correo, agendar una reunión o actualizar un registro llamando a APIs externas.

---

## Limitaciones que Debes Conocer

No entender los límites de la IA genera aplicaciones inestables en producción. Debes dominar estos fallos típicos:

* **Alucinaciones**: El modelo genera datos erróneos pero redactados con total seguridad. Ocurre porque el modelo es probabilístico: predice la palabra más coherente sintácticamente, no la verdad factual.
* **Sesgo (Bias)**: Refleja los prejuicios o disparidades presentes en los textos de internet con los que fue entrenado.
* **Límites de Contexto**: Aunque metas documentos gigantescos en el prompt, los modelos sufren del efecto **Lost in the Middle** (se pierden en el medio). Recuerdan bien el inicio y el final de las instrucciones, pero ignoran la parte central.
* **Falta de Razonamiento Real**: Los modelos predicen basándose en estadísticas, no comprenden ni razonan a nivel humano. Falla en matemáticas estrictas o datos fuera de su fecha de entrenamiento.

---

## Mosaic AI: El Ecosistema GenAI de Databricks

Databricks engloba todo su desarrollo de IA generativa bajo la marca **Mosaic AI**. Estos son los servicios que integran la plataforma y que debes dominar para la certificación:

* **Foundation Model APIs**: Permite consultar modelos abiertos (como DBRX, LLaMA) o propietarios externos (GPT-4, Claude) usando una sola API unificada. Esto facilita cambiar de modelo cambiando un parámetro en tu código.
* **Model Serving**: Aloja tus modelos en producción mediante endpoints automáticos (serverless) con auto-escalado y control de costos.
* **Vector Search**: Base de datos vectorial integrada directamente en Unity Catalog que se sincroniza automáticamente con tus tablas de Delta Lake.
* **Mosaic AI Agent Framework**: Kit de desarrollo para programar, evaluar y desplegar agentes compuestos que usan herramientas y bases de datos.
* **MLflow para GenAI**: Extensión del popular orquestador MLflow para registrar prompts, comparar respuestas, habilitar auditorías y evaluar modelos con la metodología LLM-as-a-Judge.

---

## Pipeline Típico de una Aplicación GenAI

Para estructurar una aplicación que no alucine y que conozca los datos internos de tu empresa, usamos la arquitectura **RAG (Retrieval-Augmented Generation)**. A continuación, puedes ver cómo se orquesta este flujo paso a paso:

<iframe src="https://norsab.github.io/Generative-AI-Engineer/Blog/figuras/figura3.html" width="100%" height="480" style="border:none; border-radius:12px; background: #0B0F19; overflow:hidden;" title="Arquitectura RAG (Retrieval-Augmented Generation)"></iframe>

---

## Databricks vs. El Resto: Posicionamiento en el Mercado

¿Por qué usar Databricks en lugar de conectar OpenAI directamente? El examen evalúa decisiones de diseño basadas en estas ventajas:

* **Integración del Dato (Data-Centric AI)**: En otras plataformas debes contratar una base de datos vectorial externa, un orquestador y un servicio de hosting. En Databricks, tus datos gobernados en Delta Lake se conectan a tu base de datos vectorial (Vector Search) y a tus APIs de modelos en el mismo workspace.
* **Gobernanza Unificada con Unity Catalog**: Puedes auditar quién consulta una tabla, qué modelo consume esa tabla y qué empleado llama al endpoint del modelo, todo bajo un único sistema de seguridad empresarial.
* **Estándares Abiertos**: Databricks promueve el uso de tecnologías de código abierto (Delta Lake, MLflow, Spark), evitando el secuestro de proveedor (vendor lock-in).

---

## Estructura del Examen y Ruta de Estudio

El examen **Databricks Certified Generative AI Engineer Associate** evalúa tu criterio técnico para implementar estas soluciones de forma profesional:

* **Duración**: 90 minutos para responder **45 preguntas** de opción múltiple.
* **Aprobación**: Se requiere un mínimo del **70%** (aproximadamente 32 aciertos).
* **Distribución de pesos de los dominios**:
  1. **Application Development (30%)**: Implementación de RAG, uso de LangChain/cadenas y agentes. (El dominio más pesado).
  2. **Assembling & Deploying (22%)**: Configuración de endpoints en Model Serving e integración con MLflow.
  3. **Design Applications (14%)**: Técnicas avanzadas de prompting y diseño de flujos de trabajo.
  4. **Data Preparation (14%)**: Estrategias de chunking, extracción y embeddings.
  5. **Evaluation & Monitoring (12%)**: MLflow Evaluate, monitoreo en tiempo real e Inference Tables.
  6. **Governance (8%)**: Control de accesos en Unity Catalog y seguridad de datos sensibles (PII).

La estrategia de estudio óptima consiste en dominar primero el desarrollo de aplicaciones y despliegue (que representan el 52% del examen), para luego consolidar los módulos de preparación de datos, gobernanza y monitoreo.

¿Qué concepto de este repaso te ha parecido el más retador? ¡Cuéntame en los comentarios y sigamos construyendo este puente al Machine Learning!
