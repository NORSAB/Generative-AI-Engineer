# Banco de Preguntas - Databricks Certified Generative AI Engineer Associate

Este archivo contiene las primeras 20 preguntas extraídas del examen de práctica oficial.

---

## Pregunta 1
What should be the primary consideration when selecting an LLM for a production system requiring frequent model updates?

- A) Base model accuracy
- B) Hardware requirements
- C) Fine-tuning efficiency and iteration speed
- D) Initial training dataset size

---

## Pregunta 2
A RAG application processes legal contracts whose structure includes sections with hierarchical headings. The model has a 4096-token context window. Which chunking strategy is most appropriate?

- A) Split documents into fixed-size chunks of 4000 tokens regardless of section boundaries
- B) Create chunks based on section headings with recursive splitting if sections exceed 3500 tokens
- C) Use sentence-based chunking with a fixed overlap of 100 tokens
- D) Split documents into paragraphs without considering section boundaries

---

## Pregunta 3
Which two techniques together most reliably extract specific fields from customer feedback into a structured format while ensuring consistent output? (Select Two)

- A) Few-shot examples with structured output formatting
- B) Output parsing with JSON schema validation
- C) Basic prompt templates without structure
- D) Recursive chain-of-thought prompting
- E) Free-form text extraction without validation

---

## Pregunta 4
What is the most appropriate input/output specification for an AI pipeline designed to generate regulatory compliance reports from company operational data?

- A) Input: Company operational metrics; Output: Compliance status
- B) Input: Daily operational logs; Output: Regulatory violations
- C) Input: Structured operational data with compliance requirements mapping; Output: Detailed compliance reports with evidence, risk scores, and remediation suggestions
- D) Input: Business process data; Output: Compliance recommendations

---

## Pregunta 5
An MLflow tracking server records the following metrics for three LLM configurations tested on a document classification task:
- Config-1: precision 0.88, recall 0.85, inference time 100 ms, GPU memory 10 GB
- Config-2: precision 0.92, recall 0.90, inference time 180 ms, GPU memory 16 GB
- Config-3: precision 0.95, recall 0.93, inference time 250 ms, GPU memory 24 GB

Given a requirement to process documents within 150 ms, which configuration should be selected?

- A) Config-3 for highest accuracy
- B) Config-2 as a compromise solution
- C) Config-1 as it meets the latency requirement
- D) Need more information about GPU availability

---

## Pregunta 6
A data scientist needs to implement a complex chain of LLM operations that includes dynamic tool selection based on user input and system state. Which LangChain component would be most appropriate for this requirement?

- A) LangChain Agents
- B) LangChain Memory
- C) LangChain Callbacks
- D) LangChain Retrievers

---

## Pregunta 7
A data scientist is reviewing prompt/response pairs for a code generation model. Which characteristic most strongly indicates proper task alignment?

- A) The response includes extensive documentation about the company's coding standards
- B) The response contains syntactically correct, executable code that meets the prompt requirements
- C) The response provides multiple alternative programming language suggestions
- D) The response includes historical context about the programming language

---

## Pregunta 8
Which performance indicators would best track compliance with data privacy requirements for an LLM application processing sensitive healthcare data? (Select Three)

- A) PII and PHI detection rate in outputs
- B) Data access logging and audit trail completeness
- C) Data encryption monitoring and verification
- D) Response generation speed
- E) Token utilization metrics

---

## Pregunta 9
Your application requires sequential processing of user queries through multiple specialized tools. Which architectural pattern best supports this requirement?

- A) Parallel Tool Execution with Aggregated Results
- B) Sequential Chain with Tool Routing
- C) Direct API Calls to Individual Tools
- D) Batch Processing with Tool Queue

---

## Pregunta 10
What is the recommended method for implementing cost-effective context retrieval in a production RAG application on Databricks?

- A) Retrieve all available context for maximum accuracy
- B) Implement dynamic context pruning based on relevance scores
- C) Use fixed-size context windows for all queries
- D) Disable context retrieval for repeated queries

---

## Pregunta 11
Your team is building a RAG pipeline that needs to extract tables from Excel spreadsheets while preserving numerical data types. Which Python package should be used?

- A) openpyxl
- B) xlrd
- C) pandas
- D) csv

---

## Pregunta 12
Based on model evaluation metrics, what chunking strategy should be employed when the source documents contain primarily tabular data with occasional markdown formatting?

- A) Natural language paragraph splitting
- B) Structure-aware chunking with table preservation
- C) Simple line-by-line splitting
- D) Fixed token count chunks

---

## Pregunta 13
Your team needs to build a multilingual document summarization system. Which model characteristic best aligns with this requirement?

- A) Token generation speed
- B) Model quantization support
- C) Cross-lingual understanding capabilities
- D) Model deployment flexibility

---

## Pregunta 14
Which factors are most important when selecting source documents for a product recommendation RAG application? (Select Three)

- A) Document relevance and semantic similarity to user queries
- B) Historical user interaction data and purchase patterns
- C) Product metadata and catalog information
- D) Document freshness and update frequency
- E) Document length and chunk size optimization

---

## Pregunta 15
A data scientist needs to implement guardrails for a production LLM application that processes customer service inquiries. Which combination of techniques would most effectively prevent potential prompt injection attacks? (Select Two)

- A) Implementing input validation and sanitization with pattern matching and business rules
- B) Using system prompts that explicitly define role boundaries and command restrictions
- C) Implementing prompt validation and testing using adversarial examples
- D) Converting all user inputs to lowercase before processing
- E) Implementing external monitoring and rate limiting for suspicious patterns

---

## Pregunta 16
Your team has just deployed a RAG application endpoint. What testing approach should you use first to validate the deployment?

- A) Run a batch inference job with historical queries
- B) Send a single test query with known expected output
- C) Execute parallel requests to test load handling
- D) Perform incremental testing with increasing complexity

---

## Pregunta 17
Which combination of techniques is most effective for balancing factual accuracy and creativity in LLM responses? (Select Three)

- A) Create a system prompt that defines clear boundaries between factual constraints and creative elements
- B) Implement temperature and top-p sampling controls with lower values for factual content and higher values for creative sections
- C) Use chain-of-thought prompting with structured validation steps for factual content
- D) Apply few-shot examples demonstrating the desired balance between factual and creative content
- E) Use rigid templates that strictly separate factual and creative content

---

## Pregunta 18
A data scientist needs to deploy a basic RAG application endpoint that uses vector search for document retrieval. What is the correct sequence of steps to accomplish this?

- A) Create vector search index, prepare MLmodel file, register model with dependencies, create serving endpoint, test endpoint
- B) Register model with dependencies, create vector search index, test endpoint, prepare MLmodel file, create serving endpoint
- C) Test endpoint, create vector search index, prepare MLmodel file, register model with dependencies, create serving endpoint
- D) Prepare MLmodel file, create serving endpoint, create vector search index, register model with dependencies, test endpoint

---

## Pregunta 19
A data engineer needs to write chunked text from a RAG application into Delta Lake tables in Unity Catalog. What is the most efficient and correct approach?

- A) Convert chunks to pandas DataFrame, create temporary view, write to Delta table using SQL
- B) Write chunks directly to Delta table using spark.write, update Unity Catalog metadata, rebuild table statistics
- C) Create a Spark DataFrame from the chunks and use DataFrame.write.format('delta').saveAsTable()
- D) Store chunks in memory list, bulk insert using PySpark RDD, convert to Delta format post-write

---

## Pregunta 20
Your team has deployed a RAG application and needs to track its performance over time. What MLflow logging strategy best enables analysis of response quality degradation?

- A) Log only successful queries and their response times
- B) Create separate runs for each model version without tracking query patterns
- C) Track query patterns, response coherence scores, and retrieved context relevance with timestamps
- D) Record only failed queries and error messages
