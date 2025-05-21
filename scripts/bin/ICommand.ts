import { Command as BaseCommand } from 'commander';

export type MochaCommandConfig = BaseCommand;

export abstract class MochaCommand {
  static commandName: string;
  configure?(config: MochaCommandConfig): void;
  abstract execute(...args: any[]): void;
}

export type MochaCommandClass = new () => MochaCommand;

const commandsMap = new Map<string, MochaCommandClass>();

export class CommandRunner {
  private program = new BaseCommand();

  constructor() {
    this.program.name('cli').description('CLI tool using command pattern');
  }

  registerAll() {
    for (const [name, CommandItem] of commandsMap.entries()) {
      const commander = this.program.command(name);
      const commandItem = new CommandItem();
      commandItem.configure?.(commander);
      commander.action((...args: any[]) => {
        commandItem.execute(...args);
      });
    }
  }

  registerCommand(commands: (new () => MochaCommand)[]) {
    commands.forEach((CommandItem) => {
      commandsMap.set(CommandItem.name, CommandItem);
    });
  }

  run(argv = process.argv) {
    this.registerAll();
    this.program.parse(argv);
  }
}

export const commandRegistry = (args: MochaCommandClass[]) => {
  const commands = new CommandRunner();
  commands.registerCommand([...args]);
  commands.run();
};
