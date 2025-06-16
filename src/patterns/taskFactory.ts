import { Task } from "../models/task.js"

export class TaskFactory {
    private static idCounter = 0;

    static createTask(content: string, status: string): Task {
        return new Task(this.idCounter++, content, status)
    }
}