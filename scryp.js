document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                ${task.text}
                <button class="edit" onclick="editTask(${index})">Editar</button>
                <button class="complete" onclick="completeTask(${index})">${task.completed ? 'Desfazer' : 'Completar'}</button>
                <button class="delete" onclick="deleteTask(${index})">Deletar</button>
            `;
            taskList.appendChild(li);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = {
            text: taskInput.value,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    });

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.completeTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.editTask = (index) => {
        const newText = prompt('Editar tarefa:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        }
    };

    renderTasks();
});