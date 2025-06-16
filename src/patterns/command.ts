import { Command } from "interfaces/interfaces.js";
import { Task } from "models/task.js";
import { TaskManager } from "./observer.js";

export class AddTaskCommand implements Command {
    private taskManager = TaskManager.getInstance();

    constructor(private task: Task) {}

    execute() {
        this.taskManager.addTask(this.task);
    }

    undo() {
        this.taskManager.removeTask(this.task.id);
    }
}