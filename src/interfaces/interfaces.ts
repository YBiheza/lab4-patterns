import { Task } from "models/task.js";

export interface Command {
  execute(): void;
  undo(): void;
}

export interface Command {
  execute(): void;
  undo(): void;
}

export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
}