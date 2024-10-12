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
    listItem.textContent = taskText;

    // Cria o botão de remover
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'removeTaskButton'; // Adiciona uma classe para o botão
    removeButton.style.marginLeft = '10px'; // Para adicionar um espaço entre o texto da tarefa e o botão

    // Adiciona um evento de clique ao botão de remover
    removeButton.addEventListener('click', function() {
        removeTask(listItem); // Passa o listItem para a função removeTask
    });

    // Adiciona o botão de remover ao item da lista
    listItem.appendChild(removeButton);
    
    // Adiciona o item da lista à lista de tarefas
    taskList.appendChild(listItem);
    taskInput.value = ''; // Limpa o campo de entrada
}

function removeTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
}
