const searchInput = document.querySelector('.search-input');
const ideasSection = document.getElementById('ideas-section');
const loadingBar = document.createElement('div');
const errorMessage = document.createElement('div');
const searchIcon = document.getElementById('search-icon');

loadingBar.classList.add('loading-bar');
ideasSection.appendChild(loadingBar);

errorMessage.classList.add('error-message');
ideasSection.appendChild(errorMessage);

const fetchIdeas = (query) => {
    loadingBar.classList.add('show');
    errorMessage.classList.remove('show'); 
    fetch(`http://localhost:8080/ideas?query=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch ideas');
            }
            return response.json();
        })
        .then(data => {
            displayIdeas(data);
        })
        .catch(error => {
            console.error('Error fetching ideas:', error);
            showError('Não foi possível buscar as ideias :(');
        })
        .finally(() => {
            loadingBar.classList.remove('show');
        });
};

const displayIdeas = (ideas) => {
    ideasSection.innerHTML = '';
    errorMessage.classList.remove('show'); 

    if (ideas.length === 0) {
        showError('Nenhum resultado encontrado.');
        return;
    }
    
    ideas.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.classList.add('idea-card');
        ideaCard.innerHTML = `
            <h2>${idea.title}</h2>
            <p><strong>Name:</strong> ${idea.name}</p>
            <p>${idea.description}</p>
        `;
        ideasSection.appendChild(ideaCard);
    });
};

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
};

const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchIdeas(query);
    } else {
        fetchIdeas('');
    }
};

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

searchIcon.addEventListener('click', () => {
    performSearch();
});