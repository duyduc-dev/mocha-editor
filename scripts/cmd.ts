import { CommandRunner } from "./bin/ICommand";
import ConvertColorsToScssCommand from "./commands/colors/ConvertColorsToScssCommand";

const commands = new CommandRunner();

commands.registerCommand([ConvertColorsToScssCommand]);

commands.run();
