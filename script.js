document.getElementById('addTaskButton').addEventListener('click', addTask);

// Adiciona um listener de evento para a tecla pressionada no campo de entrada
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é Enter
        addTask(); // Chama a função addTask
    }
});

// Adiciona um listener de evento para a tecla pressionada no campo de entrada
document.getElementById('descriptionInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é Enter
        addTask(); // Chama a função addTask
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const taskText = taskInput.value;
    const descriptionText = descriptionInput.value;

    if (taskText === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    // Cria um contêiner para o texto da tarefa e os botões
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-buttons'; // Classe CSS para o grupo de botões

    // Cria um elemento para o texto da tarefa
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.setAttribute('data-description', descriptionText); // Armazena a descrição no atributo data

    // Adiciona evento para exibir a descrição no modal ao clicar no nome da tarefa
    taskTextElement.addEventListener('click', function() {
        showDescriptionModal(taskTextElement.getAttribute('data-description')); // Função que exibe o modal
    });

    // Botão de remover (com ícone de X)
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '&times;';
    removeButton.className = 'removeTaskButton';

    // Adiciona um evento de clique ao botão de remover
    removeButton.addEventListener('click', function() {
        // Adiciona a confirmação antes de remover
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            removeTask(listItem);
        }
    });

    // Botão de editar (com ícone de lápis)
    const editButton = document.createElement('button');
    editButton.innerHTML = '&#9998;';
    editButton.className = 'editTaskButton';

    // Adiciona o evento de editar
    editButton.addEventListener('click', function() {
        editTask(taskTextElement); // Passa o elemento que contém o texto e a descrição
    });

    // Botão de completar (com ícone de check)
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '&#10003;'; // Ícone de check
    completeButton.className = 'completeTaskButton';

    // Evento de clique para marcar a tarefa como concluída
    completeButton.addEventListener('click', function() {
        listItem.classList.toggle('completed'); // Adiciona ou remove a classe 'completed'
        saveTasks(); // Salva as tarefas após a alteração
    });

    // Adiciona os botões ao contêiner de ícones
    iconContainer.appendChild(removeButton);
    iconContainer.appendChild(editButton);
    iconContainer.appendChild(completeButton); // Adiciona o botão de completar

    // Adiciona o contêiner de ícones e o texto ao item da lista
    listItem.appendChild(taskTextElement);
    listItem.appendChild(iconContainer);

    // Adiciona o item da lista à lista de tarefas
    taskList.appendChild(listItem);
    taskInput.value = ''; // Limpa o campo de entrada
    descriptionInput.value = ''; // Limpa o campo de descrição

    saveTasks(); // Salva as tarefas no Local Storage
}


function removeTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
    saveTasks(); // Atualiza o Local Storage após remoção
}

function editTask(taskTextElement) {
    const currentTaskText = taskTextElement.textContent;
    const currentDescriptionText = taskTextElement.getAttribute('data-description'); // Recupera a descrição

    const newTaskText = prompt('Edite a tarefa:', currentTaskText);
    const newDescriptionText = prompt('Edite a descrição:', currentDescriptionText); // Adiciona edição da descrição

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskTextElement.textContent = newTaskText;
    }

    if (newDescriptionText !== null && newDescriptionText.trim() !== '') {
        taskTextElement.setAttribute('data-description', newDescriptionText); // Atualiza a descrição
    }

    saveTasks(); // Salva as tarefas após edição
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;
    for (let task of taskList) {
        const taskText = task.firstChild.textContent; // Texto da tarefa
        const isCompleted = task.classList.contains('completed'); // Verifica se está concluída
        const descriptionText = task.firstChild.getAttribute('data-description'); // Descrição da tarefa
        tasks.push({ text: taskText, completed: isCompleted, description: descriptionText }); // Salva texto, estado e descrição
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Salva o array no Local Storage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Recupera tarefas do Local Storage
    const taskList = document.getElementById('taskList');

    for (let task of tasks) {
        const listItem = document.createElement('li');
        
        // Cria um contêiner para o texto da tarefa e os botões
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-buttons';

        // Cria um elemento para o texto da tarefa
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = task.text;
        taskTextElement.setAttribute('data-description', task.description); // Armazena a descrição no atributo data

        // Adiciona a classe 'completed' se a tarefa estiver concluída
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Adiciona evento para exibir a descrição no modal ao clicar no nome da tarefa
        taskTextElement.addEventListener('click', function() {
            showDescriptionModal(taskTextElement.getAttribute('data-description')); // Exibe a descrição no modal
        });

        // Botão de remover (com ícone de X)
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&times;';
        removeButton.className = 'removeTaskButton';

        // Adiciona um evento de clique ao botão de remover
        removeButton.addEventListener('click', function() {
            // Adiciona a confirmação antes de remover
            if (confirm('Tem certeza que deseja remover esta tarefa?')) {
                removeTask(listItem);
             }
        });

        // Botão de editar (com ícone de lápis)
        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;';
        editButton.className = 'editTaskButton';
        editButton.addEventListener('click', function() {
            editTask(taskTextElement); // Edita tanto o texto quanto a descrição
        });

        // Botão de completar (com ícone de check)
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '&#10003;'; // Ícone de check
        completeButton.className = 'completeTaskButton';

        // Evento de clique para marcar a tarefa como concluída
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed'); // Adiciona ou remove a classe 'completed'
            saveTasks(); // Salva as tarefas após a alteração
        });

        // Adiciona os botões ao contêiner de ícones
        iconContainer.appendChild(removeButton);
        iconContainer.appendChild(editButton);
        iconContainer.appendChild(completeButton); // Adiciona o botão de completar

        // Adiciona o contêiner de ícones e o texto ao item da lista
        listItem.appendChild(taskTextElement);
        listItem.appendChild(iconContainer);

        // Adiciona o item da lista à lista de tarefas
        taskList.appendChild(listItem);
    }
}

document.addEventListener('DOMContentLoaded', loadTasks); // Carrega as tarefas ao iniciar

function showDescriptionModal(descriptionText) {
    const modal = document.getElementById('descriptionModal');
    const modalDescription = document.getElementById('modalDescriptionText');
    modalDescription.textContent = descriptionText; // Insere a descrição no modal
    modal.style.display = 'block'; // Exibe o modal

    // Evento para fechar o modal
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none'; // Fecha o modal
    });

    // Adiciona um evento de clique no modal para fechar ao clicar fora da caixa
    modal.addEventListener('click', function(event) {
        if (event.target === modal) { // Verifica se o clique foi fora do conteúdo do modal
            modal.style.display = 'none'; // Fecha o modal
        }
    });
}
