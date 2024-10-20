const searchInput = document.querySelector('.search-input');
const ideasSection = document.getElementById('ideas-section');
const loadingBar = document.createElement('div');
const errorMessage = document.createElement('div');
const searchIcon = document.getElementById('search-icon');
const filterContainer = document.getElementById('filter-container');
let ideas = [];

loadingBar.classList.add('loading-bar');
ideasSection.appendChild(loadingBar);

errorMessage.classList.add('error-message');
ideasSection.appendChild(errorMessage);

const filters = ["Criatividade", "Inovação", "Produtividade", "Tecnologia", "Marketing", "Design"];

createFilterElements();

const fetchIdeas = (query, filter) => {
    loadingBar.classList.add('show');
    errorMessage.classList.remove('show');

    let url = `http://localhost:8080/api/v1/ideas?query=${query}`;
    if (filter) {
        url = `http://localhost:8080/api/v1/ideas/filter?filter=${filter}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch ideas');
            }
            return response.json();
        })
        .then(data => {
            ideas = data;
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

        const formattedDate = formatDate(idea.postingDateTime);
        const experienceDateFormatted = idea.experienceDate ? formatExperienceDate(idea.experienceDate) : '';

        const experienceDateHTML = idea.experienceDate ? `<p class="experience-date"><span class="material-symbols-outlined">calendar_month</span> ${experienceDateFormatted}</p>` : '';



        ideaCard.innerHTML = `
            <div class="idea-header">
                <h2>${idea.title}</h2>
            </div>
            <div class="idea-info">
                <span class="author-name">${idea.name}</span>
                <span class="separator">•</span>
                <span class="posting-date">${formattedDate}</span>
                <span class="separator">•</span>
                <span class="area-name">${idea.area.name}</span>
                ${idea.experienceDate ? `<span class="separator">•</span><span class="experience-date">${experienceDateFormatted}</span>` : ''}
            </div>
            <p class="description">${idea.description}</p>
            <div class="vote-buttons">
                <button class="upvote-button" data-idea-id="${idea.id}">
                    <img src="/frontend/images/Main/icons/up-arrow-icon.svg" alt="Upvote">
                </button>
                <span class="votes-count">${idea.upvotes - idea.downvotes}</span>
                <button class="downvote-button" data-idea-id="${idea.id}">
                    <img src="/frontend/images/Main/icons/down-arrow-icon.svg" alt="Downvote">
                </button>
            </div>
        `;
        
        ideasSection.appendChild(ideaCard);

        const upvoteButton = ideaCard.querySelector('.upvote-button');
        const downvoteButton = ideaCard.querySelector('.downvote-button');

        upvoteButton.addEventListener('click', () => handleVote(idea.id, true));
        downvoteButton.addEventListener('click', () => handleVote(idea.id, false));
    });
};

function createFilterElements() {
    filters.forEach(filterName => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = filterName;
        label.classList.add('filter-label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(filterName));
        filterContainer.appendChild(label);

        checkbox.addEventListener('change', () => {
            filterIdeas();
            updateFilterStyles(checkbox);
        });

        label.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            filterIdeas();
            updateFilterStyles(checkbox);
        });

        label.addEventListener('mouseenter', () => {
            if (!checkbox.checked) {
                label.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                label.style.transform = "scale(1.05)";
                label.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.3)";
            }
        });

        label.addEventListener('mouseleave', () => {
            if (!checkbox.checked) {
                label.style.backgroundColor = "";
                label.style.transform = "";
                label.style.boxShadow = "";
            }
        });
    });
}

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
};

function updateFilterStyles(checkbox) {
    const label = checkbox.parentNode;

    if (checkbox.checked) {
        label.style.backgroundColor = "rgba(76, 107, 196, 0.8)";
        label.style.color = "white";
        label.style.fontWeight = "bold";
        label.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.5)";
        label.classList.add('selected');
    } else {
        label.style.backgroundColor = "";
        label.style.color = "";
        label.style.fontWeight = "";
        label.style.boxShadow = "";
        label.classList.remove('selected');
    }
}

function filterIdeas() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-container input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    if (selectedFilters.length === 0) {
        performSearch();
        return;
    }

    const filterPromises = selectedFilters.map(filter =>
        fetch(`http://localhost:8080/api/v1/ideas/filter?filter=${filter}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar ideias pelo filtro ${filter}`);
                }
                return response.json();
            })
    );

    Promise.all(filterPromises)
        .then(results => {
            let filteredIdeas = [];
            results.forEach(result => {
                filteredIdeas = filteredIdeas.concat(result);
            });

            const uniqueIdeas = filteredIdeas.filter((idea, index, self) =>
                index === self.findIndex((i) => (
                    i.id === idea.id
                ))
            );

            displayIdeas(uniqueIdeas);
        })
        .catch(error => {
            console.error("Erro na busca por filtro:", error);
            showError(error.message);
        });
}

async function handleVote(ideaId, isUpvote) {
    try {
        const endpoint = isUpvote ? 'upvote' : 'downvote';
        const response = await fetch(`http://localhost:8080/api/v1/ideas/${ideaId}/${endpoint}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error("Erro ao votar na ideia.");
        }

        const updatedIdea = await response.json();

        const ideaCard = document.querySelector(`.idea-card [data-idea-id="${ideaId}"]`).closest('.idea-card');
        const votesCountSpan = ideaCard.querySelector('.votes-count');
        votesCountSpan.textContent = updatedIdea.upvotes - updatedIdea.downvotes;

        const voteButtons = document.querySelector(`.idea-card [data-idea-id="${ideaId}"]`).closest('.vote-buttons');
        const upvoteButton = voteButtons.querySelector('.upvote-button');
        const downvoteButton = voteButtons.querySelector('.downvote-button');

        if (isUpvote) {
            upvoteButton.classList.add('upvoted');
            downvoteButton.classList.remove('downvoted');
            votesCountSpan.classList.add('upvoted');
        } else {
            downvoteButton.classList.add('downvoted');
            upvoteButton.classList.remove('upvoted');
            votesCountSpan.classList.add('downvoted');
        }
        setTimeout(() => {
            votesCountSpan.classList.remove('upvoted', 'downvoted');
        }, 510);
    } catch (error) {
        console.error('Erro ao processar o voto:', error);
        showError("Erro ao votar. Por favor, tente novamente.");
    }
}

const performSearch = () => {
    const query = searchInput.value.trim();
    fetchIdeas(query);
};

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

searchIcon.addEventListener('click', performSearch);

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
        return `há ${years} anos`;
    } else if (days > 0) {
        return `há ${days}d`;
    } else if (hours > 0) {
        return `há ${hours}h`;
    } else {
        return `há ${minutes} min`;
    }
}

function formatExperienceDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);


    return `Experiência de ${date.toLocaleDateString('pt-BR', options)}`;

}