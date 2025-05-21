import ConvertColorsToScssCommand from './commands/ConvertColorsToScssCommand';
import UnderlineStringCommand from './commands/UnderlineStringCommand';
import { commandRegistry } from './bin/ICommand';
import NewComponentCommand from './commands/NewComponentCommand';

commandRegistry([
  ConvertColorsToScssCommand,
  UnderlineStringCommand,
  NewComponentCommand,
]);
