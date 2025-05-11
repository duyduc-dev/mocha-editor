import { MochaCommand, MochaCommandConfig } from "../bin/ICommand";

export default class UnderlineStringCommand extends MochaCommand {
  configure(config: MochaCommandConfig) {
    config.argument("<string>", "String to underline");
  }

  execute(str: string): void {
    let result = str
      .trim()
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll("-", "_")
      .replaceAll(".", "_")
      .replaceAll(",", "_")
      .replaceAll("'", "_")
      .replaceAll('"', "_")
      .replaceAll("__", "_");

    if (result.endsWith("_")) result = result.slice(0, -1);

    console.log(`RESULT: `, result);
  }
}
