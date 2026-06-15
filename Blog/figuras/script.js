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
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // ==========================================
  // FIGURA 4: EVOLUCIÓN DE ARQUITECTURAS RAG
  // ==========================================
  const compColumns = document.querySelectorAll('.comp-column');

  if (compColumns.length > 0) {
    function activateCategory(type) {
      compColumns.forEach(col => {
        col.classList.remove('active');
        if (col.getAttribute('data-type') === type) {
          col.classList.add('active');
        }
      });
    }

    activateCategory('classic');

    compColumns.forEach(col => {
      const type = col.getAttribute('data-type');
      col.addEventListener('mouseenter', () => activateCategory(type));
      col.addEventListener('click', () => activateCategory(type));
    });
  }

});
