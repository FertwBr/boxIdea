const tituloInput = document.querySelector('.collaborate-titulo-input');
const nomeInput = document.querySelector('.collaborate-nome-input');
const descricaoInput = document.querySelector('.collaborate-textarea-input');
const enviarButton = document.querySelector('.collaborate-enviar-button');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');

enviarButton.addEventListener('click', () => {
    const novaIdeia = {
        title: tituloInput.value,
        name: nomeInput.value,
        description: descricaoInput.value
    };

    tituloInput.classList.remove('error');
    descricaoInput.classList.remove('error');


    if (novaIdeia.title === "" || novaIdeia.description === "") {
        errorMessage.textContent = "Por favor, preencha o título e a descrição."; // Mensagem mais específica
        errorMessage.classList.add('show');
        successMessage.classList.remove('show');

        if (novaIdeia.title === "") {
            tituloInput.classList.add('error');
        }
        if (novaIdeia.description === "") {
            descricaoInput.classList.add('error');
        }

        return;
    }


    fetch('http://localhost:8080/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaIdeia)
    })
    .then(response => {
        if (!response.ok) {

            if (response.status === 400) {
                errorMessage.textContent = "Por favor, preencha o título e a descrição.";
            } else {
                errorMessage.textContent = "Erro ao enviar ideia. Por favor, tente novamente.";
            }

            errorMessage.classList.add('show');
            successMessage.classList.remove('show');
             throw new Error('Erro ao enviar ideia.');



        }
        return response.json();
    })
    .then(data => {
        console.log('Ideia enviada com sucesso:', data);

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
        console.error(error);


    });
});