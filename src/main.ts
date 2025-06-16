import { TaskFactory } from "./patterns/taskFactory.js"
import { AddTaskCommand } from "./patterns/command.js"
import { TaskManager } from "./patterns/observer.js"
import { CommandManager } from "./patterns/commandManager.js"
import { AllTasksStrategy } from "./patterns/strategy.js"
import { CompletedTasksStrategy } from "./patterns/strategy.js"
import { NotStartedTasksStrategy } from "./patterns/strategy.js"
import { ActiveTasksStrategy } from "./patterns/strategy.js"
import { FilterStrategy } from "./interfaces/interfaces.js" 

const input = document.getElementById("taskInput") as HTMLInputElement
const addBtn = document.getElementById("addBtn") as HTMLButtonElement
const list = document.getElementById("taskList") as HTMLUListElement
const statusSelect = document.getElementById('statusSelect') as HTMLSelectElement;
const filterSelect = document.getElementById("filterSelect") as HTMLSelectElement;
const undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
const redoBtn = document.getElementById("redoBtn") as HTMLButtonElement;
const select = document.getElementById("filterSelect") as HTMLSelectElement;

const taskManager = TaskManager.getInstance();

addBtn.onclick = () => {

  if (!input.value) return;

  const title = input.value;
  const status = statusSelect.value;

  const task = TaskFactory.createTask(input.value, status);
  const cmd = new AddTaskCommand(task);
  CommandManager.getInstance().executeCommand(cmd);
  input.value = "";
  render(taskManager.getTasks());
};

taskManager.subscribe(render);

filterSelect.onchange = () => {
  render(taskManager.getTasks());
};

let strategy: FilterStrategy = new AllTasksStrategy();
select.onchange = () => {
  switch (select.value) {
    case "active": strategy = new ActiveTasksStrategy(); break;
    case "completed": strategy = new CompletedTasksStrategy(); break;
    case "not_started": strategy = new NotStartedTasksStrategy(); break;
    default: strategy = new AllTasksStrategy(); break;
  }
  render(TaskManager.getInstance().getTasks());
};

undoBtn.onclick = () => {
  CommandManager.getInstance().undo();
};

redoBtn.onclick = () => {
  CommandManager.getInstance().redo();
};

function render(tasks: ReturnType<TaskManager["getTasks"]>) {
  const filter = filterSelect.value;

  const filteredTasks = strategy.filter(tasks);

  list.innerHTML = "";

  for (const task of filteredTasks) {
    const li = document.createElement("li");
    li.className = "mb-2";

    const text = document.createElement("span");
    text.textContent = task.status === "completed" ? `✔️ ${task.content}` : task.content;
    text.className = "mr-2";

    const select = document.createElement("select");
    select.className = "select is-info";
    const optionActive = new Option("Active", "active");
    const optionCompleted = new Option("Completed", "completed");
    const optionNotStarted = new Option("Not Started", "not_started");
    select.appendChild(optionNotStarted);
    select.appendChild(optionActive);
    select.appendChild(optionCompleted);
    select.value = task.status;

    select.onchange = () => {
      taskManager.updateStatus(task.id, select.value as string);
    };

    li.appendChild(text);
    li.appendChild(select);
    list.appendChild(li);
  }
}