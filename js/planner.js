let tasks = JSON.parse(localStorage.getItem('udini_tasks') || '[]');

function saveTasks() { localStorage.setItem('udini_tasks', JSON.stringify(tasks)); }

function generateId() { return '_' + Math.random().toString(36).substr(2, 9); }

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pending = total - done;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statDone').textContent = done;
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const empty = document.getElementById('emptyState');
  list.innerHTML = '';
  if (tasks.length === 0) { empty.style.display = 'block'; updateStats(); return; }
  empty.style.display = 'none';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' done' : '');
    li.dataset.id = task.id;
    const checkBtn = document.createElement('button');
    checkBtn.className = 'task-check';
    checkBtn.setAttribute('aria-label', 'Toggle complete');
    checkBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="2,7 6,11 12,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    checkBtn.addEventListener('click', () => toggleTask(task.id));

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    const courseSpan = document.createElement('span');
    courseSpan.className = 'task-course-tag';
    courseSpan.textContent = task.course;

    const delBtn = document.createElement('button');
    delBtn.className = 'task-del';
    delBtn.setAttribute('aria-label', 'Delete task');
    delBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkBtn);
    li.appendChild(textSpan);
    li.appendChild(courseSpan);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  updateStats();
}

function addTask() {
  const text = document.getElementById('taskInput').value.trim();
  const course = document.getElementById('courseInput').value;
  if (!text) { document.getElementById('taskInput').focus(); return; }
  tasks.unshift({ id: generateId(), text, course, completed: false, created: Date.now() });
  saveTasks();
  renderTasks();
  document.getElementById('taskInput').value = '';
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.completed = !t.completed; saveTasks(); renderTasks(); }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  document.getElementById('addTaskBtn')?.addEventListener('click', addTask);
  document.getElementById('taskInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });
});