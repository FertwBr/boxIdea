const tituloInput = document.querySelector('.collaborate-titulo-input');
const nomeInput = document.querySelector('.collaborate-nome-input');
const descricaoInput = document.querySelector('.collaborate-textarea-input');
const enviarButton = document.querySelector('.collaborate-enviar-button');

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
        alert('Ideia enviada com sucesso!');
        tituloInput.value = '';
        nomeInput.value = ''; 
        descricaoInput.value = '';
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao enviar ideia. Por favor, tente novamente.');
    });
});