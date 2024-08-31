document.getElementById('learning-path-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const topic = document.getElementById('topic').value;
    const currentKnowledge = document.getElementById('current-knowledge').value || 'None';
    const learningGoals = document.getElementById('learning-goals').value;

    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('learning-path-output').innerHTML = '';
    document.getElementById('learn-more-btn').classList.add('hidden'); 

    const response = await fetch('/generate-path', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, currentKnowledge, learningGoals }),
    });

    const data = await response.json();
    const learningPathOutput = document.getElementById('learning-path-output');

    document.getElementById('loading-spinner').classList.add('hidden');

    if (data.learningPath) {
        learningPathOutput.innerHTML = `<pre>${data.learningPath}</pre>`;
        document.getElementById('learn-more-btn').classList.remove('hidden'); 
    } else {
        learningPathOutput.innerHTML = `<p class="text-red-500">Failed to generate learning path. Please try again.</p>`;
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('learning-path-form').reset();
    document.getElementById('learning-path-output').innerHTML = '';
    document.getElementById('loading-spinner').classList.add('hidden');
    document.getElementById('learn-more-btn').classList.add('hidden'); 
});

document.getElementById('learn-more-btn').addEventListener('click', () => {
    alert('Pay More To Learn More!');
});
