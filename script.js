document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

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

    // Botão de remover (com ícone de X)
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '&times;';
    removeButton.className = 'removeTaskButton';

    // Adiciona um evento de clique ao botão de remover
    removeButton.addEventListener('click', function() {
        removeTask(listItem);
    });

    // Botão de editar (com ícone de lápis)
    const editButton = document.createElement('button');
    editButton.innerHTML = '&#9998;';
    editButton.className = 'editTaskButton';

    // Adiciona o evento de editar
    editButton.addEventListener('click', function() {
        editTask(listItem, taskTextElement);
    });

    // Adiciona os botões ao contêiner de ícones
    iconContainer.appendChild(removeButton);
    iconContainer.appendChild(editButton);

    // Adiciona o contêiner de ícones e o texto ao item da lista
    listItem.appendChild(taskTextElement); 
    listItem.appendChild(iconContainer); 


    // Adiciona o item da lista à lista de tarefas
    taskList.appendChild(listItem);
    taskInput.value = ''; // Limpa o campo de entrada
}

function removeTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
}

function editTask(listItem, taskTextElement) {
    const newTaskText = prompt('Edite a tarefa:', taskTextElement.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskTextElement.textContent = newTaskText;
    }
}
