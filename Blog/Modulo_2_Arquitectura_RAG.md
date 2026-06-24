---
title: "Módulo 2: Arquitectura RAG — Fragmentación, Limpieza de Datos e Indexación en Delta Lake"
series: "Ruta GenAI Engineer"
author: "Norman Sabillón"
date: "Junio 2026"
---

![Ruta GenAI Módulo 2 Portada](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/ruta_genai_modulo2_cover_1600x840.png)

Para crear aplicaciones de IA generativa robustas en el entorno corporativo, el Prompt Engineering no basta. Los modelos de lenguaje base no conocen los datos privados de nuestro negocio y tienen límites estrictos en su ventana de contexto. Si intentamos inyectar manuales enteros o miles de filas directamente en el prompt, el sistema se volverá lento, costoso y propenso a fallar.

La solución estándar de la industria es **RAG (Retrieval-Augmented Generation)**. La idea es sencilla: en lugar de obligar al modelo a memorizar todo, le damos acceso a una base de conocimientos para que consulte la información relevante antes de responder. Piensa en esto como un examen a libro abierto donde un asistente ultra rápido le entrega al alumno solo las páginas exactas que necesita para responder la pregunta.

Sin embargo, un sistema RAG es tan bueno como los datos que recupera. Si el motor de búsqueda entrega fragmentos irrelevantes o con ruido, el modelo generará respuestas incorrectas o alucinadas. En esta guía detallada para la certificación de **Databricks Generative AI Engineer Associate**, analizaremos cómo diseñar un pipeline de ingesta de datos de alta calidad utilizando Delta Lake, Unity Catalog y estrategias avanzadas de fragmentación y búsqueda.

---

## 1. Pipeline de Limpieza de Contenido (Ingestion Flow)

Ingresar datos sin depurar a un sistema de búsqueda vectorial garantiza el fracaso. Los documentos corporativos suelen contener ruido de formato, encabezados repetitivos, pies de página y código de marcado que confunden a los modelos de embeddings. 

El proceso de preparación de los datos sigue un flujo lineal de cinco etapas clave:

![Pipeline de Limpieza de Contenido](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Pipeline%20de%20Limpieza%20de%20Contenido.png)

1. **Extracción Raw:** Ingestamos archivos crudos como PDFs digitales, documentos de texto o páginas HTML directamente desde Cloud Storage hacia una tabla Delta a nivel Bronze. Para automatizar este paso de forma incremental, usamos **Databricks Auto Loader**, que detecta nuevos archivos tan pronto como llegan.
2. **Filtro de Ruido:** Aplicamos funciones de Spark y expresiones regulares (Regex) para eliminar etiquetas HTML, scripts, números de página y disclaimers legales repetitivos (boilerplate). Si no limpiamos esto, el buscador vectorial puede considerar estos textos comunes como relevantes para consultas legítimas de los usuarios.
3. **Chunking Inteligente:** Dividimos el texto limpio en fragmentos manejables. El tamaño y el solapamiento (*overlap*) de estos fragmentos se configuran de acuerdo con la ventana de contexto del LLM y la granularidad de la información.
4. **Generación de Embeddings:** Procesamos cada fragmento a través de un modelo vectorial (como BGE o Ada) utilizando endpoints de **Databricks Model Serving** para obtener sus vectores densos correspondientes.
5. **Carga en Delta Table:** Guardamos los fragmentos de texto, sus metadatos (URI de origen, identificador de fragmento) y sus vectores en una tabla Delta de nivel Gold regulada por **Unity Catalog**, lista para conectarse al motor de búsqueda.

---

## 2. Estrategias de Fragmentación (Chunking)

El *chunking* consiste en dividir un texto largo en fragmentos más pequeños. La elección de la estrategia de fragmentación determina el balance entre la precisión de la búsqueda semántica y la preservación del contexto de la información.

El examen de certificación evalúa cuándo y cómo aplicar cada estrategia según la estructura de los datos:

![Estrategias de Fragmentación](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_1_estrategias_chunking.png)

### A. Fragmentación de Longitud Fija (Fixed-Length)
Divide el texto basándose en un número estricto de caracteres o tokens (por ejemplo, bloques de 200 tokens). 
* **Caso de uso:** Logs de sistemas, código fuente o datos altamente homogéneos.
* **Ventajas:** Es el método más rápido y sencillo de implementar.
* **Desventajas:** Ignora la estructura del lenguaje humano. Corta palabras u oraciones por la mitad (como se ve en el ejemplo: `"des ➔ arrollador"`), destruyendo el sentido semántico en los límites del fragmento.

### B. Fragmentación a Nivel de Oración (Sentence-Level)
Utiliza librerías de procesamiento de lenguaje natural (NLP) para identificar signos de puntuación y dividir el texto respetando los límites lógicos de cada oración.
* **Caso de uso:** Preguntas frecuentes (FAQs), artículos cortos de noticias o glosarios donde cada línea representa una idea completa.
* **Ventajas:** Preserva la coherencia sintáctica gramatical.
* **Desventajas:** Si las oraciones consecutivas dependen fuertemente entre sí, se pierde la relación del contexto general al separarlas.

### C. Fragmentación Basada en Párrafos (Paragraph-Based)
Utiliza los saltos de línea dobles (`\n\n`) como límites naturales para dividir el contenido.
* **Caso de uso:** Reportes de negocio, artículos de blog o contratos legales estructurados.
* **Ventajas:** Mantiene unido el contexto temático redactado por el autor.
* **Desventajas:** La longitud de los párrafos suele ser muy inconsistente, produciendo fragmentos demasiado grandes o demasiado pequeños.

### D. Fragmentación por Ventana Deslizante (Sliding Window)
Divide el texto en bloques de tamaño fijo pero repite de forma deliberada un porcentaje de tokens del fragmento anterior en el nuevo (solapamiento o *overlap*). Por ejemplo, chunks de 300 tokens con 50 tokens de solapamiento.
* **Caso de uso:** Documentos técnicos complejos, manuales de ingeniería o libros de texto.
* **Ventajas:** Evita la pérdida de contexto en los cortes de los fragmentos al mantener términos clave repetidos en los bordes.
* **Desventajas:** Incrementa el volumen total de datos indexados y los costos de almacenamiento.

### E. Fragmentación Semántica (Semantic Chunking)
Es la estrategia más avanzada. Utiliza un modelo de embeddings para calcular la similitud semántica entre oraciones consecutivas. Cuando la similitud cae por debajo de cierto umbral, el algoritmo asume un cambio de tema y genera un corte.
* **Caso de uso:** Transcripciones de llamadas de soporte, actas de reuniones largas o flujos de texto sin formato visual.
* **Ventajas:** Las divisiones son adaptativas y corresponden al contenido real de la conversación.
* **Desventajas:** Requiere un alto costo de cómputo y latencia porque evalúa embeddings para cada oración antes de la ingesta.

### Matriz de Decisiones de Fragmentación

Para entender mejor estas estrategias desde el punto de vista del diseño de sistemas, podemos organizarlas según su **Complejidad de Implementación** y su **Criterio de Corte**:

![Matriz de Fragmentación RAG](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Matriz%20de%20Fragmentaci%C3%B3n%20RAG.png)

---

## 3. Control de Granularidad y Overlap

Ajustar el tamaño de los fragmentos (granularidad) y el solapamiento (overlap) es un balance crítico en la arquitectura RAG:

### Tamaño del Chunk (Granularidad)
* **Chunks Pequeños (100 - 200 tokens):** Excelente precisión semántica al indexar ideas muy específicas. Sin embargo, carecen de contexto de fondo y obligan a la base de datos a gestionar más vectores, elevando el costo de búsqueda.
* **Chunks Grandes (500 - 800 tokens):** Ofrecen un contexto muy rico para que el LLM redacte respuestas matizadas. Sin embargo, diluyen los temas específicos, haciendo que la búsqueda por vectores sea menos precisa.

### Overlap (Fijo vs. Dinámico)
* **Overlap Fijo:** Copia un número estático de tokens (ej. 10% del tamaño del bloque). Es la opción más común por su simplicidad.
* **Overlap Dinámico:** El algoritmo ajusta dinámicamente los bordes. Si el corte fijo cae a mitad de una frase, el sistema extiende el overlap automáticamente hasta alcanzar el punto final o salto de párrafo para evitar enviar información cortada.

---

## 4. Ingesta y Almacenamiento en Delta Lake (Unity Catalog)

Una vez estructurados los fragmentos, el estándar de Databricks es procesarlos dentro de la **Arquitectura Medallion** utilizando **Delta Lake** y gobernando todo con **Unity Catalog**:

![Pipeline de Ingesta Delta](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_2_pipeline_ingesta_delta.png)

### Por qué Delta Lake es la base de RAG en Databricks:
1. **predicate Pushdown:** Permite filtrar metadatos de forma ultra rápida antes de realizar la búsqueda vectorial (por ejemplo, buscar solo chunks que tengan el metadato `departamento = 'Recursos Humanos'`).
2. **Actualizaciones Incrementales:** Permite modificar o eliminar fragmentos de un documento específico sin reconstruir toda la base de datos vectorial de la empresa.
3. **Time Travel:** Mantiene versiones históricas de los datos, útil para auditar qué información estaba disponible cuando un modelo generó una respuesta incorrecta.

### Gobernanza con Unity Catalog
Unity Catalog gestiona el control de acceso basado en roles (RBAC) y registra el linaje de los datos (lineage). Esto garantiza que el pipeline RAG respete los permisos de los archivos originales: si un usuario de ventas no tiene permiso para leer el manual financiero en Unity Catalog, el buscador vectorial no recuperará fragmentos de ese manual para sus consultas.

---

## 5. Optimización de la Recuperación: Vector Search y Reranking

La búsqueda vectorial tradicional devuelve fragmentos basados en similitud matemática (por ejemplo, distancia coseno entre el vector de la consulta y el del documento). Sin embargo, la búsqueda puramente vectorial sufre de un cuello de botella de relevancia: tiene un alto **Recall** (encuentra rápido los documentos correctos) pero una baja **Precision** (trae también mucho ruido).

Para resolver esto de forma eficiente en producción, implementamos un flujo de dos etapas con un **Reranker**:

![Mejora de la Búsqueda Vectorial con Reranking](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Mejora%20de%20la%20B%C3%BAsqueda%20Vectorial%20con%20Reranking.png)

1. **Etapa 1: Búsqueda Vectorial Rápida (Top-100):** Realizamos una consulta ágil usando distancia coseno sobre la base de datos vectorial. Esto nos da un conjunto amplio de 100 candidatos. Es rápido pero puede contener fragmentos irrelevantes que solo comparten palabras clave.
2. **Etapa 2: Re-ranking Semántico (Top-5):** Enviamos los 100 candidatos a un modelo **Cross-Encoder** (Reranker) que evalúa la relación semántica exacta entre la pregunta del usuario y cada fragmento. Este paso reorganiza la lista y selecciona solo los 5 mejores fragmentos para el prompt final del LLM.

Este enfoque de embudo optimiza el espacio de la ventana de contexto del LLM y reduce las alucinaciones al eliminar el ruido del prompt, como se muestra en la siguiente infografía:

![Precision y Recall RAG Funnel](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_3_precision_recall_rag.png)

---

## 6. Implementación Práctica en Python y PySpark

A continuación, implementamos el pipeline completo de ingesta RAG en Databricks. El código limpia el texto de un manual crudo mediante expresiones regulares, aplica una fragmentación por ventana deslizante y escribe el resultado en una tabla Delta gobernada por Unity Catalog:

```python
import re
from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp, lit

# 1. Limpieza de ruido semántico y boilerplate
def clean_document_text(raw_text):
    # Remover etiquetas HTML/XML
    text = re.sub(r'<[^>]+>', '', raw_text)
    # Quitar marcas de confidencialidad y disclaimers repetitivos
    text = re.sub(r'Confidencial - Propiedad de la Empresa.*', '', text, flags=re.IGNORECASE)
    # Normalizar espacios en blanco
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# 2. Fragmentación por ventana deslizante (Sliding Window)
def make_sliding_chunks(text, chunk_size=200, overlap=40):
    words = text.split(" ")
    chunks = []
    stride = chunk_size - overlap
    
    for i in range(0, len(words), stride):
        chunk_words = words[i:i + chunk_size]
        if chunk_words:
            chunks.append(" ".join(chunk_words))
    return chunks

# 3. Inicialización del pipeline en Spark
spark = SparkSession.builder.getOrCreate()

# Documento de prueba con código de marcado y boilerplate
documento_sucio = """
<html><body>
<h1>Guía de Configuración Interna</h1>
<p>Para configurar la VPN del negocio, primero debe descargar la aplicación Cisco AnyConnect.</p>
<p>Confidencial - Propiedad de la Empresa. Prohibida su reproducción.</p>
</body></html>
"""

# Procesar y limpiar datos
documento_limpio = clean_document_text(documento_sucio)
mis_chunks = make_sliding_chunks(documento_limpio, chunk_size=10, overlap=3)

# Estructurar datos con metadatos para Unity Catalog (Nivel Gold)
data = [(i, "doc_employee_01", chunk) for i, chunk in enumerate(mis_chunks)]
columns = ["chunk_index", "document_id", "content"]

df = spark.createDataFrame(data, columns) \
    .withColumn("source_uri", lit("dbfs:/mnt/documentos/guia.pdf")) \
    .withColumn("updated_at", current_timestamp())

# Escritura segura en Delta Lake
# Reemplaza 'catalog_name' y 'schema_name' por tus configuraciones de Unity Catalog
df.write.format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .saveAsTable("catalog_name.schema_name.rag_gold_chunks")

print("¡Pipeline completado! Fragmentos limpios indexados en Delta Lake de forma exitosa.")
```

Este flujo automatizado garantiza que cada fragmento guardado esté libre de ruido y estructurado con sus respectivos metadatos, estableciendo la base para búsquedas vectoriales rápidas y precisas en cualquier arquitectura RAG corporativa.
