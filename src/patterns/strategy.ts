import { FilterStrategy } from "interfaces/interfaces.js"
import { Task } from "models/task.js";

export class AllTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks;
  }
}

export class ActiveTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks.filter(t => t.status === "active");
  }
}

export class CompletedTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks.filter(t => t.status === "completed");
  }
}

export class NotStartedTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]) {
    return tasks.filter(t => t.status === "not_started");
  }
}