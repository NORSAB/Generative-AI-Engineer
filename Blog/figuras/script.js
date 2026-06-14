document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // FIGURA 1: TOKENIZACIÓN Y EMBEDDINGS
  // ==========================================
  const tokens = document.querySelectorAll('.token');
  const nodes = document.querySelectorAll('.node');
  const vectorDisplay = document.getElementById('vector-selected');

  // Coordenadas semánticas ficticias de ejemplo
  const coordinates = {
    'El': '[0.12, -0.45, 0.03, ...]',
    'puente': '[0.84, 0.23, -0.15, ...]',
    'al': '[-0.05, 0.12, 0.08, ...]',
    'machine': '[0.91, 0.88, 0.76, ...]',
    'learning': '[0.95, 0.92, 0.81, ...]'
  };

  function highlightTokenAndNode(word) {
    // Reset classes
    tokens.forEach(t => t.classList.remove('active'));
    nodes.forEach(n => n.classList.remove('active'));

    // Highlight selected token
    const token = Array.from(tokens).find(t => t.textContent.trim() === word);
    if (token) token.classList.add('active');

    // Highlight selected node
    const node = Array.from(nodes).find(n => n.getAttribute('data-word') === word);
    if (node) node.classList.add('active');

    // Update coordinate text
    if (coordinates[word]) {
      vectorDisplay.textContent = `"${word}" ➔ ${coordinates[word]}`;
    } else {
      vectorDisplay.textContent = 'Selecciona un token';
    }
  }

  tokens.forEach(token => {
    token.addEventListener('mouseenter', () => {
      const word = token.textContent.trim();
      highlightTokenAndNode(word);
    });
  });

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const word = node.getAttribute('data-word');
      highlightTokenAndNode(word);
    });
  });


  // ==========================================
  // FIGURA 2: AUTO-ATENCIÓN (SELF-ATTENTION)
  // ==========================================
  const btnFinanzas = document.getElementById('btn-contexto-finanzas');
  const btnMueble = document.getElementById('btn-contexto-mueble');
  const sentenceFinanzas = document.getElementById('sentence-finanzas');
  const sentenceMueble = document.getElementById('sentence-mueble');

  btnFinanzas.addEventListener('click', () => {
    btnFinanzas.classList.add('active');
    btnMueble.classList.remove('active');
    sentenceFinanzas.classList.remove('hidden');
    sentenceMueble.classList.add('hidden');
  });

  btnMueble.addEventListener('click', () => {
    btnMueble.classList.add('active');
    btnFinanzas.classList.remove('active');
    sentenceMueble.classList.remove('hidden');
    sentenceFinanzas.classList.add('hidden');
  });


  // ==========================================
  // FIGURA 3: PIPELINE RAG
  // ==========================================
  const steps = document.querySelectorAll('.rag-step');
  const explanationBox = document.getElementById('rag-explanation');

  const stepExplanations = {
    1: '<strong>Paso 1: Pregunta del Usuario</strong><br>El usuario escribe su duda en lenguaje natural (ej. "¿Cuáles son los límites de viáticos de la empresa?"). Esta pregunta se convierte al vuelo en un embedding vectorial.',
    2: '<strong>Paso 2: Vector Search (Búsqueda Semántica)</strong><br>El embedding de la pregunta se contrasta contra el índice de Vector Search. Databricks localiza en milisegundos los "chunks" o fragmentos de texto más cercanos semánticamente en Delta Lake.',
    3: '<strong>Paso 3: Prompt Enriquecido (Aumentado)</strong><br>Los fragmentos recuperados se inyectan como "contexto" dentro del prompt original. Esto ancla la respuesta del modelo a datos reales de la organización.',
    4: '<strong>Paso 4: Inferencia del LLM (Generación)</strong><br>El LLM recibe el prompt enriquecido y redacta la respuesta final basándose únicamente en la información proporcionada. Cero alucinaciones.'
  };

  steps.forEach(step => {
    const handleStepEvent = () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      const stepNum = step.getAttribute('data-step');
      explanationBox.innerHTML = stepExplanations[stepNum];
    };

    step.addEventListener('mouseenter', handleStepEvent);
    step.addEventListener('click', handleStepEvent);
  });

});
