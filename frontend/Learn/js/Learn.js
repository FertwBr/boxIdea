const searchInput = document.querySelector('.search-input');
const ideasSection = document.getElementById('ideas-section');

const fetchIdeas = (query) => {
    fetch(`http://localhost:8080/ideas?query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayIdeas(data);
            moveSearchBarToTop();
        })
        .catch(error => console.error('Erro ao buscar ideias:', error));
};

const displayIdeas = (ideas) => {
    ideasSection.innerHTML = '';
    ideas.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.classList.add('idea-card');
        ideaCard.innerHTML = `
            <h2>${idea.title}</h2>
            <p><strong>Nome:</strong> ${idea.name}</p>
            <p>${idea.description}</p>
        `;
        ideasSection.appendChild(ideaCard);
    });
};

const moveSearchBarToTop = () => {
    document.querySelector('.main-container').style.marginTop = '10px';
    ideasSection.style.display = 'block';
};

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
        fetchIdeas(query);
    }
});
