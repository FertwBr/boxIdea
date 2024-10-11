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

    fetch('http://localhost:8080/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaIdeia)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar ideia.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ideia enviada com sucesso:', data);

        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';

        tituloInput.value = '';
        nomeInput.value = '';
        descricaoInput.value = '';

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error(error);

        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    });
});