import ConvertColorsToScssCommand from "./commands/ConvertColorsToScssCommand";
import UnderlineStringCommand from "./commands/UnderlineStringCommand";
import { commandRegistry } from "./bin/ICommand";

commandRegistry([ConvertColorsToScssCommand, UnderlineStringCommand]);
