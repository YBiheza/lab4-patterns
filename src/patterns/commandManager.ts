import { AddTaskCommand } from "./command";

export class CommandManager {
    private static instance: CommandManager;
    private undoStack: AddTaskCommand[] = [];
    private redoStack: AddTaskCommand[] = [];

    private constructor() {}

    static getInstance(): CommandManager {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }

    executeCommand(command: AddTaskCommand) {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = []; // сбрасываем redo при новом действии
    } 

    undo() {
        const command = this.undoStack.pop();
        if (command) {
        command.undo();
        this.redoStack.push(command);
        }
    }

    redo() {
        const command = this.redoStack.pop();
        if (command) {
        command.execute();
        this.undoStack.push(command);
        }
    }
}