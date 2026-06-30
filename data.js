// Generative AI Engineer — Databricks Certified Generative AI Engineer Associate
const planData = [
  {
    phase: "FASE 1: FUNDAMENTOS Y PROMPTING", weeks: "Semanas 1-2",
    modules: [
      { id: 0, title: "Roadmap e Introducción a LLMs", focus: "Visión general de la ruta de estudio y conceptos fundamentales de Transformers y Embeddings.", duration: "Completado", slides: "12 slides", priority: 1,
        content: { bullets: ["Mecánica interna de los Transformers (Self-Attention)","Tokens, Vocabulario y generación autorregresiva","Modelos base, Fine-Tuning e In-Context Learning","Concepto de Embeddings y espacio vectorial semántico","Desafíos principales: Alucinaciones y ventana de contexto"], examQuestion: "¿Qué papel juega el mecanismo de Self-Attention en la arquitectura Transformer?", hook: "Entender cómo piensa un LLM es el paso cero para dominar la IA generativa. Aquí inicia mi ruta de estudio." } },
      { id: 1, title: "Ingeniería de Prompts Avanzada", focus: "Técnicas avanzadas para moldear el comportamiento y las respuestas de los LLMs.", duration: "Completado", slides: "10 slides", priority: 2,
        content: { bullets: ["Inferencia Zero-Shot vs Few-Shot en producción","Cadena de Pensamiento (Chain of Thought - CoT) y razonamiento lógico","Prompting Estructurado para salidas de datos consistentes (JSON/XML)","Técnicas de delimitación de contexto y mitigación de inyecciones de prompts","Uso de AI Playground de Databricks para prototipado rápido"], examQuestion: "¿Cuándo es preferible utilizar Few-Shot en lugar de RAG en una aplicación empresarial?", hook: "El prompting avanzado no es 'adivinar palabras'. Es estructurar contexto para forzar la lógica del modelo." } }
    ]
  },
  {
    phase: "FASE 2: RECUPERACIÓN (RAG)", weeks: "Semanas 3-4",
    modules: [
      { id: 2, title: "Arquitectura RAG y Preparación de Datos", focus: "Ingesta, fragmentación, limpieza e indexación de datos de negocio.", duration: "Completado", slides: "12 slides", priority: 3,
        content: { bullets: ["Flujo extremo a extremo de RAG (Indexación, Recuperación, Generación)","Estrategias de Chunking (Fixed-Length, Sliding Window, Semantic)","Limpieza de datos (eliminación de boilerplate, parsing consciente del layout)","Estructura de tablas y actualizaciones en Delta Lake con Unity Catalog","Búsqueda Vectorial (Distancia Coseno vs Dot Product) y Reranking"], examQuestion: "¿Qué estrategia de chunking es más adecuada para evitar cortes abruptos en manuales técnicos?", hook: "Un RAG es tan bueno como los datos que recupera. La fragmentación y la indexación inteligente marcan la diferencia." } }
    ]
  },
  {
    phase: "FASE 3: AGENTES Y ORQUESTACIÓN", weeks: "Semanas 5-6",
    modules: [
      { id: 3, title: "Desarrollo de Agentes de IA y Orquestación", focus: "Construcción de agentes, integración de herramientas (Tools) y MLflow Tracing.", duration: "En progreso", slides: "12 slides", priority: 3,
        content: { bullets: ["Concepto de agentes de IA y loops de razonamiento-acción","Registro y gobernanza de herramientas (Tools) mediante Unity Catalog Functions","Uso de Mosaic AI Agent Framework y LangChain para construcción de agentes","MLflow Tracing para depuración de llamadas al modelo y herramientas","Flujo de registro y versionado reproducible de agentes en Unity Catalog"], examQuestion: "¿Como se integran funciones personalizadas de Python como herramientas en un agente de Mosaic AI?", hook: "Los chatbots informativos son cosa del pasado. Los agentes de IA que ejecutan acciones y consultan APIs son el presente." } },
      { id: 4, title: "Orquestación y Gestión de Estado", focus: "Gestión de memoria de agentes y flujos complejos.", duration: "3-4 horas", slides: "8 slides", priority: 2,
        content: { bullets: ["Memoria de conversación en agentes (Short-term vs Long-term)","Implementación de flujos multi-agente","Orquestación con Databricks Workflows y Jobs","Manejo de estados y fallback en fallas del modelo","Control de concurrencia y latencia en flujos lógicos"], examQuestion: "¿Qué componente de Databricks permite programar la ejecución incremental del pipeline del agente?", hook: "Gestionar la memoria en un agente de IA en producción es un reto. Te cuento cómo lo soluciona Databricks." } }
    ]
  },
  {
    phase: "FASE 4: EVALUACIÓN Y GOBERNANZA", weeks: "Semanas 7-8",
    modules: [
      { id: 5, title: "Evaluación de Aplicaciones GenAI", focus: "Métricas cuantitativas y cualitativas de generación y recuperación.", duration: "4-5 horas", slides: "10 slides", priority: 3,
        content: { bullets: ["Métricas de evaluación del recuperador (Precision, Recall, MRR)","Evaluación de generación usando LLM-as-a-Judge","Uso de MLflow Evaluate para pruebas automatizadas","Diseño de conjuntos de prueba de alta calidad (Golden Datasets)","Mosaic AI Agent Evaluation para diagnóstico extremo a extremo"], examQuestion: "¿Qué métrica evalúa si el LLM-as-a-Judge detecta información inventada fuera del contexto provisto?", hook: "¿Cómo sabes si tu aplicación de IA realmente mejoró tras un cambio? Deja de adivinar y empieza a evaluar." } },
      { id: 6, title: "Seguridad y Guardrails de Contenido", focus: "Protección de aplicaciones de IA contra abusos y fugas de datos.", duration: "3-4 horas", slides: "8 slides", priority: 3,
        content: { bullets: ["Mosaic AI Guardrails: Detección de inyecciones y toxicidad","Filtros de entrada y salida en endpoints de inferencia","Prevención de fuga de información confidencial (PII y secretos)","Gobernanza de modelos con Unity Catalog (permisos y linaje)","Auditoría de logs de consultas de agentes"], examQuestion: "¿Dónde se configuran las políticas de filtrado para bloquear prompts maliciosos en Mosaic AI?", hook: "Poner un LLM de cara al cliente sin guardrails es un riesgo inaceptable. Así es como Databricks protege tus apps de IA." } }
    ]
  },
  {
    phase: "FASE 5: DESPLIEGUE Y OPERACIONES (LLMOps)", weeks: "Semanas 9-10",
    modules: [
      { id: 7, title: "Model Serving y Provisioned Throughput", focus: "Despliegue escalable de LLMs y APIs de modelos base en Databricks.", duration: "4-5 horas", slides: "10 slides", priority: 3,
        content: { bullets: ["Endpoints de Mosaic AI Model Serving","Modelos externos e integración de APIs de terceros (OpenAI, Anthropic)","Provisioned Throughput (Rendimiento aprovisionado) para baja latencia garantizada","Escalado automático a cero y optimización de recursos","Modelos Open Source (Llama, DBRX) servidos localmente en clústeres GPU"], examQuestion: "¿Qué ventaja ofrece el Provisioned Throughput en endpoints de Mosaic AI Model Serving?", hook: "Llevar un modelo a producción no es solo cargarlo. Necesitas latencia ultra-baja y escalado inteligente." } },
      { id: 8, title: "Monitoreo de Aplicaciones GenAI en Producción", focus: "Métricas operativas y de calidad en tiempo real.", duration: "3-4 horas", slides: "8 slides", priority: 2,
        content: { bullets: ["Monitoreo de latencia, rendimiento y tasa de error de inferencia","Monitoreo de la calidad de respuestas en producción (Drift semántico)","Captura de tablas de inferencia (Inference Tables) en Unity Catalog","Integración con alertas automáticas ante fallas y degradación de métricas","Análisis de feedback explícito e implícito del usuario"], examQuestion: "¿Cómo se capturan de forma automática las solicitudes y respuestas de inferencia en Databricks?", hook: "La IA no se despliega y se olvida. Si no monitoreas tus modelos, empezarán a degradarse sin que te des cuenta." } },
      { id: 9, title: "Optimización de Costos y Fine-Tuning", focus: "Estrategias de ajuste fino y optimización financiera.", duration: "4-5 horas", slides: "10 slides", priority: 2,
        content: { bullets: ["Fine-tuning de modelos pequeños vs LLMs gigantes","Uso de LoRA y QLoRA para optimización de memoria en entrenamiento","Databricks Foundation Model Fine-Tuning (FMT)","Comparativa de costos de inferencia: RAG vs Fine-tuning","Gestión de cuotas y presupuestos en Mosaic AI"], examQuestion: "¿Qué técnica reduce drásticamente los requerimientos de hardware para hacer fine-tuning de un LLM?", hook: "¿Fine-tuning o RAG? Una de las decisiones arquitectónicas más importantes (y costosas) de la IA." } },
      { id: 10, title: "Lakehouse Monitoring para IA", focus: "Uso de tableros de calidad y linaje extremo a extremo.", duration: "3-4 horas", slides: "8 slides", priority: 2,
        content: { bullets: ["Configuración de Databricks Lakehouse Monitoring para datos de IA","Data Lineage extremo a extremo: desde el PDF hasta la respuesta del bot","Tableros preconstruidos de calidad de datos y estabilidad","Cumplimiento regulatorio e informes de auditoría del sistema GenAI"], examQuestion: "¿Qué herramienta unifica el linaje de datos desde el origen de archivos hasta el modelo servido?", hook: "Linaje de datos completo: saber exactamente qué párrafo de qué documento causó la respuesta de tu agente." } },
      { id: 11, title: "Simulacro de Examen GenAI y Estrategia Final", focus: "Simulacros interactivos y preparación final para la certificación.", duration: "5-6 horas", slides: "12 slides", priority: 3,
        content: { bullets: ["Estructura del examen de Generative AI Engineer Associate","Distribución de pesos y desglose de secciones clave","Tácticas para descartar opciones incorrectas y gestión del tiempo","Checklist técnico final de conceptos obligatorios para memorizar"], examQuestion: "¿Cuál es el porcentaje mínimo de aciertos para aprobar la certificación de GenAI Engineer?", hook: "Todo listo para el examen de Databricks. Estos son los temas clave y mis últimos tips para aprobar." } }
    ]
  }
];

// Seed: módulos 0-2 ya completados
let stored = JSON.parse(localStorage.getItem('db_genai_completed'));
if (stored === null) {
  localStorage.setItem('db_genai_completed', JSON.stringify([0,1,2]));
}

initTracker(planData, 'db_genai_completed', '#8b5cf6');
