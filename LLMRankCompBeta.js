<script>
console.log("Script loaded");
  // Sample LLM data (as of February 25, 2025, based on trends)
  const llms = [
    {
      name: "Grok 3 (xAI)",
      rank: 1,
      strengths: "Superior reasoning, real-time data integration, coding (HTML5 expertise)",
      weaknesses: "Limited customization, depth of research trails Gemini",
      purpose: "Deep reasoning and technical tasks",
      parameters: "Undisclosed (~314B estimated)",
      mmlu: "Unknown (~85 estimated)",
      humanEval: "92%",
      arcAgi: "Unknown",
      contextWindow: "128K",
      speed: "58 t/s",
      price: "N/A (X Premium+ subscription)",
      multimodal: "Yes (text, image planned)"
    },
    {
      name: "OpenAI o3-mini",
      rank: 2,
      strengths: "Fast reasoning, coding efficiency, function calling",
      weaknesses: "Smaller scope than o3 full, occasional abstraction issues",
      purpose: "Optimized for coding and quick reasoning",
      parameters: "Undisclosed",
      mmlu: "Unknown (~83 estimated)",
      humanEval: "90%",
      arcAgi: "75.7% (low) / 87.5% (high)",
      contextWindow: "200K",
      speed: "214 t/s",
      price: "$1.1 / M input",
      multimodal: "Yes (text, voice)"
    },
    {
      name: "Claude 3.5 Sonnet (Anthropic)",
      rank: 3,
      strengths: "Human-like writing, coding, large context window",
      weaknesses: "No reasoning model yet, slower than o3-mini",
      purpose: "Content creation and detailed analysis",
      parameters: "Undisclosed",
      mmlu: "81.5",
      humanEval: "92%",
      arcAgi: "59.4% (prior version)",
      contextWindow: "200K",
      speed: "25 t/s",
      price: "$15 / M input",
      multimodal: "Yes (text, image)"
    },
    {
      name: "Gemini 2.0 Pro (Google)",
      rank: 4,
      strengths: "Multimodal processing, large context, ecosystem integration",
      weaknesses: "Reasoning trails o3, experimental bugs",
      purpose: "Multimodal tasks and big data analysis",
      parameters: "Undisclosed",
      mmlu: "80.5",
      humanEval: "82%",
      arcAgi: "Unknown",
      contextWindow: "2M",
      speed: "Unknown (~50 t/s estimated)",
      price: "$0.7 / M output",
      multimodal: "Yes (text, image, audio)"
    },
    {
      name: "DeepSeek R1",
      rank: 5,
      strengths: "Cost-efficient, open-source, strong algorithmic reasoning",
      weaknesses: "Limited framework support, weaker multimodal",
      purpose: "Reasoning and cost-effective deployment",
      parameters: "671B (37B active)",
      mmlu: "79.5 (V3)",
      humanEval: "98%",
      arcAgi: "15-20%",
      contextWindow: "128K",
      speed: "58 t/s",
      price: "$2.19 / M output",
      multimodal: "No"
    }
  ];

  // Populate Rankings
  const rankingsList = document.getElementById('rankingsList');
  llms.forEach(llm => {
    const li = document.createElement('li');
    li.textContent = `${llm.rank}. ${llm.name}`;
    rankingsList.appendChild(li);
  });

  // Populate Single LLM Select
  const singleSelect = document.getElementById('singleLlmSelect');
  llms.forEach(llm => {
    const option = document.createElement('option');
    option.value = llm.name;
    option.textContent = llm.name;
    singleSelect.appendChild(option);
  });

  // Populate Multi-Select
  const multiSelect = document.getElementById('llmSelect');
  llms.forEach(llm => {
    const option = document.createElement('option');
    option.value = llm.name;
    option.textContent = llm.name;
    multiSelect.appendChild(option);
  });

  // Show Details for Single LLM
  function showDetails() {
    const selectedLlm = singleSelect.value;
    const llm = llms.find(l => l.name === selectedLlm);
    const detailsDiv = document.getElementById('detailsContent');
    detailsDiv.innerHTML = '';
    if (llm) {
      detailsDiv.innerHTML = `
        <h3 style="color: #00ffff">${llm.name}</h3>
        <p><strong style="color: #ff00ff">Strengths:</strong> ${llm.strengths}</p>
        <p><strong style="color: #ff00ff">Weaknesses:</strong> ${llm.weaknesses}</p>
        <p><strong style="color: #ff00ff">Primary Purpose:</strong> ${llm.purpose}</p>
      `;
    }
  }

  // Compare Selected LLMs
  function compareLLMs() {
    const selectedLlms = Array.from(multiSelect.selectedOptions).map(opt => opt.value);
    const comparisonDiv = document.getElementById('comparisonTable');
    comparisonDiv.innerHTML = '';
    
    if (selectedLlms.length < 1) {
      comparisonDiv.textContent = 'Please select at least one LLM to compare.';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Header Row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Feature</th>' + selectedLlms.map(name => `<th>${name}</th>`).join('');
    thead.appendChild(headerRow);

    // Features to Compare
    const features = [
      { key: 'parameters', label: 'Parameters' },
      { key: 'mmlu', label: 'MMLU (General Knowledge)' },
      { key: 'humanEval', label: 'HumanEval (Coding)' },
      { key: 'arcAgi', label: 'ARC-AGI (Reasoning)' },
      { key: 'contextWindow', label: 'Context Window' },
      { key: 'speed', label: 'Speed (Tokens/s)' },
      { key: 'price', label: 'Price ($/M Tokens)' },
      { key: 'multimodal', label: 'Multimodal Capabilities' }
    ];

    // Data Rows
    features.forEach(feature => {
      const row = document.createElement('tr');
      row.innerHTML = `<td style="color: #00ffff">${feature.label}</td>`;
      selectedLlms.forEach(name => {
        const llm = llms.find(l => l.name === name);
        row.innerHTML += `<td>${llm[feature.key] || 'N/A'}</td>`;
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    comparisonDiv.appendChild(table);
  }
</script>