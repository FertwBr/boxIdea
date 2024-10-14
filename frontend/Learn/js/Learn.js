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
        ideaCard.innerHTML = `
            <h2>${idea.title}</h2>
            <p><strong>por:</strong> ${idea.name}</p>
            <p>${idea.description}</p>
        `;
        ideasSection.appendChild(ideaCard);
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