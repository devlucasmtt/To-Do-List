document.getElementById('addTaskButton').addEventListener('click', addTask);

// Adiciona um listener de evento para a tecla pressionada no campo de entrada
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é Enter
        addTask(); // Chama a função addTask
    }
});

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

    saveTasks(); // Salva as tarefas no Local Storage

}

function removeTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
    saveTasks(); // Atualiza o Local Storage após remoção
}

function editTask(listItem, taskTextElement) {
    const newTaskText = prompt('Edite a tarefa:', taskTextElement.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskTextElement.textContent = newTaskText;
    }
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;
    for (let task of taskList) {
        tasks.push(task.firstChild.textContent); // Adiciona o texto da tarefa ao array
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Salva o array no Local Storage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Recupera tarefas do Local Storage
    const taskList = document.getElementById('taskList');

    for (let taskText of tasks) {
        const listItem = document.createElement('li');
        
        // Cria um contêiner para o texto da tarefa e os botões
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-buttons';

        // Cria um elemento para o texto da tarefa
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;

        // Botão de remover (com ícone de X)
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&times;';
        removeButton.className = 'removeTaskButton';
        removeButton.addEventListener('click', function() {
            removeTask(listItem);
        });

        // Botão de editar (com ícone de lápis)
        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;';
        editButton.className = 'editTaskButton';
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
    }
}
document.addEventListener('DOMContentLoaded', loadTasks); // Carrega as tarefas ao iniciar
