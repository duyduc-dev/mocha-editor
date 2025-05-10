import { Command as BaseCommand } from "commander";

export interface ICommand<T = any> {
  execute(): void;
  undo?(): void;
  configure?(command: BaseCommand): void;
  name: string;
  description?: string;
  args?: T;
}

export abstract class Command<T = any> implements ICommand<T> {
  abstract execute(): void;
  abstract undo?(): void;
  abstract configure?(command: BaseCommand): void;
  abstract name: string;
  abstract args?: T;
}

const commandsMap = new Map<string, Command>();

export class CommandRunner {
  private program = new BaseCommand();

  constructor() {
    this.program.name("cli").description("CLI tool using command pattern");
  }

  registerAll() {
    for (const command of commandsMap.values()) {
      const subCommand = this.program.command(command.name);
      command.configure?.(subCommand);
      subCommand.action(() => {
        command.execute();
      });
    }
  }

  registerCommand(commands: (new () => Command)[]) {
    commands.forEach((CommandItem) => {
      const command = new CommandItem();
      commandsMap.set(command.name, command);
    });
  }

  run(argv = process.argv) {
    this.registerAll();
    this.program.parse(argv);
  }
}
