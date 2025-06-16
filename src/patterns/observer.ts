import { Task } from "models/task.js";

type Listener = (tasks: Task[]) => void;

export class TaskManager {
    private static instance: TaskManager;
    private tasks: Task[] = [];
    private listeners: Listener[] = [];

    private constructor() {}

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }

        return TaskManager.instance
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.notify();
    }

    toggleTask(id:number) {
        const task = this.tasks.find( t => t.id === id);
        if (task) {
            switch (task.status) {
            case "not_started":
                task.status = "active";
                break;
            case "active":
                task.status = "completed";
                break;
            case "completed":
                task.status = "not_started";
                break;
            }
        this.notify();
        }
    }

    updateStatus(id: number, newStatus: string) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.status = newStatus;
            this.notify();
        }
    }

    removeTask(id: number){
        const task = this.tasks.find( t => t.id === id);
        if (task) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.notify();
        }
    }

    getTasks(): Task[] {
        return [...this.tasks]; //возвращаем именно копию
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
    }

    private notify() {
        for (const obj of this.listeners) {
            obj(this.getTasks());//вызываем метод, который вернет копию массива //для каждого метода подписанного на уведомления
        }
    }
}