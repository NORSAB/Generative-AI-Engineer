I recently realized that quick carousels and short posts are not enough to explain the technical details needed for enterprise LLM applications. That is why I have resumed writing on my technical blog. Building production-grade RAG systems on Databricks requires a software engineering mindset, focusing on incremental ingestion, chunking strategies, and retrieval precision.

This week, for the Databricks Generative AI Engineer certification, I analyzed the core concepts of Module 2:
- Structured Ingestion: Leveraging Auto Loader and the Medallion Architecture (Bronze to Gold) for RAG.
- Chunking & Embeddings: Managed vs. Self-Managed Embeddings and tuning size vs. overlap.
- Two-Stage Retrieval: Using Vector Search for Recall and Cross-Encoder Rerankers for Precision.

You can read the deep-dives here:
Module 0 (From BI to ML): https://normansabillon.hashnode.dev/qu-pasa-realmente-cuando-le-hablas-a-un-llm
Module 1 (Advanced Prompt Engineering): https://normansabillon.hashnode.dev/m-dulo-1-prompt-engineering-avanzado-dise-ando-entradas-para-llms-en-producci-n
Module 2 (RAG Ingestion & Architecture): https://normansabillon.hashnode.dev/m-dulo-2-arquitectura-rag-fragmentaci-n-limpieza-de-datos-e-indexaci-n-en-delta-lake

I am also sharing the study carousel below, covering the same topics in both English and Spanish.

---

Decidí reabrir el blog porque para llevar modelos a producción no sirve improvisar. Si queremos integrar inteligencia artificial en serio en la arquitectura de datos, necesitamos hablar de infraestructura, control de costos y seguridad en el RAG. Estas guías detallan lo que los manuales rápidos omiten.

Espero que el contenido del blog y el carrusel adjunto les sirvan para estudiar o para discutir estos temas técnicos en sus equipos de ingeniería. ¿Cómo manejan la fragmentación en sus desarrollos? ¿Usan tokens fijos, ventana deslizante o ya migraron a chunking semántico?

#Databricks #GenerativeAI #RAG #MachineLearning #DataEngineering #CloudComputing #EmbajadoresQualtop #Qualtop #EmbajadoresSyesoftware #Syesoftware
