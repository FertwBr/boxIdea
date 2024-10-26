const tituloInput = document.getElementById('tituloInput');
const nomeInput = document.getElementById('nameInput');
const experienceDateInput = document.getElementById('experienceDateInput');
const areaSelect = document.getElementById('area-select');
const enviarButton = document.querySelector('.collaborate-enviar-button');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const loadingBar = document.querySelector('.loading-bar');
const mainContainer = document.querySelector('.main-container');
const maxEditorWidth = mainContainer ? `${mainContainer.clientWidth}px` : '800px'; 

fetch('http://localhost:8080/api/v1/ideas/areas')
  .then(response => response.json())
  .then(areas => {
    areas.forEach(area => {
      const option = document.createElement('option');
      option.value = area.id;
      option.text = area.name;
      areaSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Erro ao buscar áreas:', error));

enviarButton.addEventListener('click', () => {
  const novaIdeia = {
    title: tituloInput.value,
    name: nomeInput.value,
    description: quill.root.innerHTML, 
    experienceDate: experienceDateInput.value,
    area: { id: parseInt(areaSelect.value)}
  };

  tituloInput.classList.remove('error');
  editor.classList.remove('error');
  areaSelect.classList.remove('error');
  errorMessage.classList.remove('show');

  let errorText = "";

  if (novaIdeia.title === "") {
    errorText = "Por favor, preencha o título.";
    tituloInput.classList.add('error');
  } else if (novaIdeia.editor === "") {
    errorText = "Por favor, preencha a descrição.";
    descricaoInput.classList.add('error');
  } else if (areaSelect.value === "") {
    errorText = "Por favor, selecione uma área.";
    areaSelect.classList.add('error');
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
    quill.root.innerHTML = '';
    experienceDateInput.value = '';
    areaSelect.value = '';

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

var quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Descreva sua experiência em detalhes',
  modules: {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
          'image': function() {
            var range = this.quill.getSelection();
            if (range) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();
  
              input.onchange = function() {
                if (input.files && input.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    this.quill.insertEmbed(range.index, 'image', e.target.result);
                  }.bind(this);
                  reader.readAsDataURL(input.files[0]);
                }
              }.bind(this);
          }
        }
      }
    }
  }
});
// TODO arrumar borda branca
// TODO arrumar limite maximo do quill

// Estilos para o editor
quill.root.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
quill.root.style.color = 'rgba(76, 107, 196, 0.7)';
quill.root.style.padding = '1rem';
quill.root.style.border = '2px solid rgba(76, 107, 196, 0.5)';
quill.root.style.minHeight = '30vh';
quill.root.style.maxWidth = maxEditorWidth;
quill.root.style.margin = '0 auto';

// Estilos para a barra de ferramentas
const toolbar = quill.getModule('toolbar').container;
toolbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
toolbar.style.border = '2px solid rgba(76, 107, 196, 0.5)';
toolbar.style.borderRadius = '10px';
toolbar.style.padding = '10px';
toolbar.style.maxWidth = maxEditorWidth;
toolbar.style.margin = '0 auto';

// Estilos para os dropdowns (selects)
const dropdowns = toolbar.querySelectorAll('select');
dropdowns.forEach(dropdown => {
  dropdown.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  dropdown.style.color = 'white';
  dropdown.style.border = 'none';
  dropdown.style.borderRadius = '5px';
  dropdown.style.padding = '5px 10px';

  dropdown.style.borderBottom = '2px solid rgba(76, 107, 196, 0.5)';
});

// Estilos para os botões da barra de ferramentas
const toolbarButtons = quill.getModule('toolbar').container.querySelectorAll('button, select');
toolbarButtons.forEach(button => {
  button.style.color = 'white';
  button.style.backgroundColor = 'transparent';
  button.style.border = 'none';
  button.style.borderRadius = '5px'; 
  button.style.padding = '5px 10px'; 

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'rgba(76, 107, 196, 0.5)';
  });
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'transparent';
  });
});

window.addEventListener('resize', () => {
  const updatedMaxWidth = mainContainer ? `${mainContainer.clientWidth}px` : '800px';
  quill.root.style.maxWidth = updatedMaxWidth;
  toolbar.style.maxWidth = updatedMaxWidth;
});
