const tituloInput = document.querySelector('.collaborate-titulo-input');
const nomeInput = document.querySelector('.collaborate-nome-input');
const descricaoInput = document.querySelector('.collaborate-textarea-input');
const enviarButton = document.querySelector('.collaborate-enviar-button');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const loadingBar = document.querySelector('.loading-bar');

enviarButton.addEventListener('click', () => {
    const novaIdeia = {
        title: tituloInput.value,
        name: nomeInput.value,
        description: descricaoInput.value
    };

    tituloInput.classList.remove('error');
    descricaoInput.classList.remove('error');
    errorMessage.classList.remove('show');

    let errorText = "";

    if (novaIdeia.title === "" && novaIdeia.description === "") {
        errorText = "Por favor, preencha o título e a descrição.";
        tituloInput.classList.add('error');
        descricaoInput.classList.add('error');
    } else if (novaIdeia.title === "") {
        errorText = "Por favor, preencha o título.";
        tituloInput.classList.add('error');
    } else if (novaIdeia.description === "") {
        errorText = "Por favor, preencha a descrição.";
        descricaoInput.classList.add('error');
    }

    if (errorText) {
        errorMessage.textContent = errorText;
        errorMessage.classList.add('show');
        successMessage.classList.remove('show');
        return;
    }


    loadingBar.classList.add('show');

    fetch('http://localhost:8080/api/v1/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaIdeia)
    })
    .then(response => {
        loadingBar.classList.remove('show');

        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text || "Ocorreu um erro ao enviar a ideia.");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Ideia enviada com sucesso:', data);

        successMessage.textContent = "Ideia enviada com sucesso!";
        successMessage.classList.add('show');
        errorMessage.classList.remove('show');

        tituloInput.value = '';
        nomeInput.value = '';
        descricaoInput.value = '';

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    })
    .catch(error => {
        console.error("Erro:", error);

        if (error.message === 'Failed to fetch') {
            errorMessage.textContent = "Falha ao conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.";
        } else {
            errorMessage.textContent = error.message || "Ocorreu um erro inesperado.";
        }

        errorMessage.classList.add('show');
        successMessage.classList.remove('show');
    });
});