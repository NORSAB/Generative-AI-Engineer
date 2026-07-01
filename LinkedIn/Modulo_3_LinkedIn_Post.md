After focusing on RAG ingestion last week, this week I dived into the next frontier of enterprise GenAI: AI Agents and tools integration. In production systems, static retrievers are no longer enough. We need agents that can make decisions, call APIs, and execute secure tasks based on user intent. Building autonomous agents requires strong orchestration, robust tools governance, and complete execution tracing.

This week, for the Databricks Generative AI Engineer certification, I analyzed the core concepts of Module 3:
- Unity Catalog Functions: Using Python and SQL functions as secure, role-based tools for agents. The LLM reads COMMENT metadata to perform semantic tool calling.
- Mosaic AI Agent Framework: The native platform to deploy and package agents built with LangChain, LlamaIndex, or custom Python code.
- MLflow Tracing: Visualizing execution paths, tracking spans, debugging latencies, and auditing token costs.

You can read the deep-dives here:
Module 0 (From BI to ML): https://normansabillon.hashnode.dev/qu-pasa-realmente-cuando-le-hablas-a-un-llm
Module 1 (Advanced Prompt Engineering): https://normansabillon.hashnode.dev/m-dulo-1-prompt-engineering-avanzado-dise-ando-entradas-para-llms-en-producci-n
Module 2 (RAG Ingestion & Architecture): https://normansabillon.hashnode.dev/m-dulo-2-arquitectura-rag-fragmentaci-n-limpieza-de-datos-e-indexaci-n-en-delta-lake
Module 3 (AI Agents & Tools Integration): https://normansabillon.hashnode.dev/modulo-3-desarrollo-agentes-ia-mosaic-ai-mlflow

I am also sharing the study carousel below, covering the same topics in both English and Spanish.

---

Luego de revisar la ingesta RAG la semana pasada, esta semana nos adentramos en el desarrollo de agentes de IA y la integracion de herramientas en Databricks. Los chatbots estaticos que solo leen documentos se quedan cortos para tareas transaccionales; el valor real en la empresa surge cuando los modelos pueden tomar decisiones logicas, interactuar con APIs y consultar bases de datos de forma segura.

Espero que el contenido del blog y el carrusel de estudio les sirva de guia para la certificacion o para implementar estos flujos en sus equipos. Como manejan la depuracion de agentes dinamicos en sus desarrollos? Usan herramientas graficas como MLflow Tracing o se apoyan en logs personalizados?

#Databricks #GenerativeAI #AIAgents #MLflow #UnityCatalog #LLMOps #MachineLearning #CloudComputing #EmbajadoresQualtop #Qualtop #EmbajadoresSyesoftware #Syesoftware
