---
title: "Módulo 2: Arquitectura RAG — Fragmentación, Limpieza de Datos e Indexación en Delta Lake"
series: "Ruta GenAI Engineer"
author: "Norman Sabillón"
date: "Junio 2026"
---

![Ruta GenAI Módulo 2 Portada](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/ruta_genai_modulo2_cover_1600x840.png)

Para construir aplicaciones de inteligencia artificial en una empresa, afinar prompts no es suficiente. Los modelos de lenguaje generales no saben nada sobre las bases de datos de nuestro negocio. Además, tienen límites de contexto muy estrictos. Intentar pasarles manuales completos o miles de registros en una sola consulta solo va a disparar los costos, ralentizar el sistema y causar errores de memoria.

Ahí es donde entra **RAG (Retrieval-Augmented Generation)**. La idea detrás de este patrón es muy simple: en lugar de obligar al LLM a memorizar toda la información, le permitimos consultar una base de datos para recuperar lo relevante antes de contestar. Es igual a hacer un examen a libro abierto con un asistente veloz que nos pasa las páginas necesarias en el segundo exacto.

Pero el truco de RAG está en la recuperación. Si el motor de búsqueda le pasa fragmentos llenos de ruido o textos sin sentido, el modelo va a inventar respuestas. Por eso, en esta guía para preparar el examen de **Databricks Generative AI Engineer Associate**, veremos cómo diseñar un pipeline de ingesta sólido utilizando Delta Lake y Unity Catalog, cuidando la fragmentación y el filtrado.

---

## 1. El flujo de limpieza de contenido

Meter información cruda a un motor de búsqueda vectorial es ir directo al fracaso. Los documentos internos suelen tener encabezados de página repetitivos, avisos legales larguísimos, marcado HTML residual y metadatos inútiles que confunden a los embeddings. 

El pipeline para limpiar y preparar los textos consta de cinco pasos:

![Pipeline de Limpieza de Contenido Dark](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Pipeline%20de%20Limpieza%20de%20Contenido%20Dark.png)

* **Extraer los archivos crudos (Raw):** Primero, leemos documentos (PDFs, HTML o texto) desde buckets en la nube. Para automatizar esto de forma incremental y eficiente, lo ideal es usar **Databricks Auto Loader**, que detecta nuevos archivos conforme van llegando a la ruta.
* **Limpiar el ruido:** Mediante funciones nativas de Spark y expresiones regulares, eliminamos código de marcado, disclaimers legales repetitivos (boilerplate) y números de página. Si no quitamos este contenido vacío, el buscador vectorial empezará a recuperar estos textos genéricos para cualquier consulta.
* **Fragmentación inteligente:** El texto limpio se corta en trozos (*chunks*). Ajustar el tamaño y el solapamiento (*overlap*) de estos bloques depende del límite del LLM que vayamos a usar.
* **Vectorizar (Embeddings):** Pasamos cada fragmento por un modelo de embeddings usando endpoints de **Databricks Model Serving** para generar los vectores.
* **Escribir en Delta Lake:** Guardamos los fragmentos de texto limpitos, sus embeddings y metadatos clave (como la URI del archivo origen) en una tabla Delta de nivel Gold regulada por **Unity Catalog**.

---

## 2. Estrategias de fragmentación (Chunking)

El *chunking* es el arte de dividir textos largos en fragmentos que el modelo pueda digerir. Esta decisión define directamente el balance entre velocidad de búsqueda y la retención del contexto original.

El examen de Databricks evalúa nuestra capacidad para elegir el método correcto según cómo estén organizados los datos:

![Estrategias de Fragmentación](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_1_estrategias_chunking.png)

### A. Fragmentación de Longitud Fija (Fixed-Length)
Se corta el texto a partir de un conteo rígido de caracteres o tokens (por ejemplo, bloques exactos de 200 tokens).
* **Cuándo usarla:** Para logs de sistemas, archivos CSV estructurados o código de programación.
* **Ventajas:** Procesamiento inmediato y desarrollo muy simple.
* **Desventajas:** Rompe las oraciones de forma arbitraria. Puede cortar palabras clave por la mitad (como pasar de `"desarrollador"` a `"des ➔ arrollador"`), arruinando el significado en los límites del bloque.

### B. Fragmentación a Nivel de Oración (Sentence-Level)
Usa herramientas de procesamiento de lenguaje natural (como spaCy o NLTK) para encontrar los puntos finales y cortar solo donde termina una frase.
* **Cuándo usarla:** Glosarios, bases de preguntas frecuentes (FAQs) o textos muy directos.
* **Ventajas:** La sintaxis se mantiene limpia y las oraciones no quedan truncadas.
* **Desventajas:** Al aislar oraciones individuales, a veces se pierde el hilo conductor del párrafo si hay referencias cruzadas ("él", "esto").

### C. Fragmentación Basada en Párrafos (Paragraph-Based)
Usa los saltos de línea dobles (`\n\n`) como el punto de división natural.
* **Cuándo usarla:** Contratos, informes financieros de texto largo o artículos estructurados.
* **Ventajas:** Mantiene el contexto original que el autor organizó al escribir.
* **Desventajas:** La extensión de los párrafos humanos varía demasiado. Nos arriesgamos a tener fragmentos gigantescos e inconsistentes.

### D. Fragmentación por Ventana Deslizante (Sliding Window)
Crea fragmentos de tamaño fijo pero repitiendo una porción de tokens del bloque anterior en el nuevo (solapamiento o *overlap*). Por ejemplo, un bloque de 300 tokens que arrastra 50 tokens del fragmento previo.
* **Cuándo usarla:** Manuales técnicos complejos, documentos legales con cláusulas extensas o libros.
* **Ventajas:** Excelente para no perder la continuidad de las ideas en los puntos de corte.
* **Desventajas:** Al duplicar información, incrementa el tamaño de la base de datos vectorial y, por ende, los costos.

### E. Fragmentación Semántica (Semantic Chunking)
El enfoque más sofisticado. Calcula la similitud vectorial entre oraciones consecutivas. En el momento en que la similitud cae por debajo de un umbral que definamos, el sistema asume un cambio de tema y genera la división.
* **Cuándo usarla:** Actas de reuniones, transcripciones de audio o textos continuos sin subtítulos.
* **Ventajas:** Los cortes son completamente adaptativos e inteligentes.
* **Desventajas:** Requiere muchísima potencia de cómputo, ya que hay que generar embeddings de prueba para cada oración antes de hacer los cortes definitivos.

### Matriz de decisiones de fragmentación

Para que te quede más claro cómo elegir en el mundo real, organigrama de opciones según su **Complejidad de Implementación** y su **Criterio de Corte**:

![Matriz de Fragmentación RAG Dark](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Matriz%20de%20Fragmentaci%C3%B3n%20RAG%20Dark.png)

---

## 3. Control de granularidad y solapamiento

Ajustar el tamaño de los fragmentos y su solapamiento es un juego de equilibrios en RAG:

### El tamaño del fragmento (Granularidad)
* **Chunks Pequeños (100 - 200 tokens):** Encuentran datos específicos muy rápido y con alta precisión. ¿El problema? Tienen poca cobertura de contexto y nos obligan a gestionar millones de vectores, lo que puede ralentizar la consulta.
* **Chunks Grandes (500 - 800 tokens):** Le dan al LLM información de fondo muy rica para que redacte su respuesta. La desventaja es que los temas clave se diluyen, bajando la precisión de la búsqueda vectorial pura.

### El solapamiento (Overlap)
* **Overlap Fijo:** Repite un porcentaje estático (típicamente entre 10% y 20% del bloque). Es la opción más popular porque funciona sin complicaciones.
* **Overlap Dinámico:** El algoritmo es inteligente; si el corte cae a la mitad de una oración, extiende el bloque automáticamente hasta encontrar un punto o un fin de párrafo.

---

## 4. Almacenamiento y gobernanza en Delta Lake

Cuando los fragmentos ya están listos, el estándar de Databricks consiste en organizarlos bajo la **Arquitectura Medallion** en **Delta Lake** y controlarlos con **Unity Catalog**:

![Pipeline de Ingesta Delta](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_2_pipeline_ingesta_delta.png)

### Por qué Delta Lake es la mejor opción para RAG:
* **predicate Pushdown:** Permite filtrar metadatos de forma ultra rápida antes de hacer la búsqueda por vectores (ej. consultar únicamente chunks donde `departamento = 'HR'`).
* **Actualizaciones Incrementales:** Si un manual se actualiza, modificas solo sus fragmentos sin tener que reprocesar o reescribir todo el corpus de la empresa.
* **Viaje en el Tiempo (Time Travel):** Guarda el histórico de cambios, lo que ayuda a auditar qué datos estaban cargados si el modelo alucina o comete un error en producción.

### Seguridad y permisos con Unity Catalog
Unity Catalog gestiona el control de accesos basado en roles (RBAC) y la trazabilidad del dato (lineage). Esto garantiza que el motor de búsqueda vectorial respete los permisos del archivo original: si un usuario de ventas no tiene permisos para leer el manual financiero de la empresa en Unity Catalog, el buscador nunca le va a recuperar fragmentos de ese manual.

---

## 5. El embudo de búsqueda: Vector Search y Reranking

La búsqueda vectorial busca coincidencias matemáticas calculando la distancia coseno de los embeddings. Es excelente para encontrar de todo rápido (alto **Recall**), pero a menudo arrastra demasiado ruido (baja **Precision**).

Para solucionar este dilema en sistemas de producción, aplicamos un embudo en dos fases usando un **Reranker**:

![Mejora de la Búsqueda Vectorial con Reranking Dark](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/Mejora%20de%20la%20B%C3%BAsqueda%20Vectorial%20con%20Reranking%20Dark.png)

1. **Primera etapa: Similitud Vectorial Rápida (Top-100):** Hacemos una consulta rápida por distancia coseno en la base de datos vectorial para quedarnos con 100 candidatos. Es veloz pero imprecisa.
2. **Segunda etapa: Re-ranking Semántico (Top-5):** Enviamos los 100 fragmentos candidatos a un modelo **Cross-Encoder** (el Reranker), que calcula la relación semántica exacta entre la pregunta del usuario y cada fragmento. De ahí, extrae los 5 mejores para introducirlos en el prompt.

Este flujo de embudo optimiza el espacio de contexto del LLM y disminuye los errores y costos, tal como ilustra este diagrama de métricas:

![Precision y Recall RAG Funnel](https://raw.githubusercontent.com/NORSAB/Generative-AI-Engineer/main/Blog/figuras/Modulo_2/figura_3_precision_recall_rag.png)

---

## 6. Pipeline práctico en PySpark

Este script simula el proceso completo en Databricks: toma un texto con marcado HTML y boilerplate, lo limpia usando expresiones regulares, genera fragmentos por ventana deslizante y los escribe en Delta Lake de forma segura:

```python
import re
from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp, lit

# 1. Limpieza de ruido y marcado residual
def clean_document_text(raw_text):
    # Eliminar etiquetas HTML/XML
    text = re.sub(r'<[^>]+>', '', raw_text)
    # Quitar marcas de confidencialidad y disclaimers repetitivos
    text = re.sub(r'Confidencial - Propiedad de la Empresa.*', '', text, flags=re.IGNORECASE)
    # Normalizar espacios múltiples en blanco
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# 2. Generador de fragmentos por ventana deslizante
def make_sliding_chunks(text, chunk_size=200, overlap=40):
    words = text.split(" ")
    chunks = []
    stride = chunk_size - overlap
    
    for i in range(0, len(words), stride):
        chunk_words = words[i:i + chunk_size]
        if chunk_words:
            chunks.append(" ".join(chunk_words))
    return chunks

# 3. Inicializar sesión de Spark
spark = SparkSession.builder.getOrCreate()

# Documento de prueba sucio
documento_sucio = """
<html><body>
<h1>Guía de Configuración Interna</h1>
<p>Para configurar la VPN del negocio, primero debe descargar la aplicación Cisco AnyConnect.</p>
<p>Confidencial - Propiedad de la Empresa. Prohibida su reproducción.</p>
</body></html>
"""

# Procesamiento de los datos
documento_limpio = clean_document_text(documento_sucio)
mis_chunks = make_sliding_chunks(documento_limpio, chunk_size=10, overlap=3)

# Crear DataFrame con metadatos estructurados para Unity Catalog (Nivel Gold)
data = [(i, "doc_employee_01", chunk) for i, chunk in enumerate(mis_chunks)]
columns = ["chunk_index", "document_id", "content"]

df = spark.createDataFrame(data, columns) \
    .withColumn("source_uri", lit("dbfs:/mnt/documentos/guia.pdf")) \
    .withColumn("updated_at", current_timestamp())

# Escritura en Delta Lake de manera transaccional
# Asegúrate de reemplazar 'catalog_name' y 'schema_name' por los tuyos en producción
df.write.format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .saveAsTable("catalog_name.schema_name.rag_gold_chunks")

print("¡Pipeline completado! Fragmentos guardados en Delta Lake de forma exitosa.")
```

Este flujo automatizado garantiza que cada fragmento guardado esté libre de ruido y estructurado con sus respectivos metadatos, estableciendo la base para búsquedas vectoriales rápidas y precisas en cualquier arquitectura RAG corporativa.
