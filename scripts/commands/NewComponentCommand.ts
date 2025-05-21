import { MochaCommand, MochaCommandConfig } from '../bin/ICommand';
import { writeFileSync, mkdirSync } from 'fs';
import { camelCase } from 'lodash';
import path from 'path';

export default class NewComponentCommand extends MochaCommand {
  private componentName = 'NewComponent';
  private pathName = '.';

  configure(config: MochaCommandConfig) {
    config
      .argument('[ComponentName]', 'Component name', 'NewComponent')
      .argument('[Path]', 'Path', '.');
  }

  execute(componentName: string, pathName: string): void {
    this.componentName = componentName;
    this.pathName = pathName;
    this.generateFiles();
  }

  private generateFiles() {
    const componentDir = this.resolveComponentDir();
    this.writeFile('index.tsx', this.createComponentContent(), componentDir);
    this.writeFile(
      `${camelCase(this.componentName)}.module.scss`,
      this.createStyleContent(),
      componentDir,
    );
  }

  private resolveComponentDir(): string {
    return path.resolve(
      __dirname,
      '../../src/renderer',
      this.pathName,
      this.componentName,
    );
  }

  private writeFile(fileName: string, content: string, dir: string) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, fileName), content);
  }

  private createComponentContent(): string {
    const compName = this.componentName;
    const styleName = camelCase(compName);
    return [
      `import { FC } from 'react';`,
      `import styles from './${styleName}.module.scss';`,
      ``,
      `interface I${compName}Props {}`,
      ``,
      `const ${compName}: FC<I${compName}Props> = (props) => {`,
      `  const {} = props;`,
      ``,
      `  return <div className={styles.container}></div>;`,
      `};`,
      ``,
      `export default ${compName};`,
      ``,
    ].join('\n');
  }

  private createStyleContent(): string {
    return [`@use '@renderer/styles/common';`, ``, `.container {`, `}`].join(
      '\n',
    );
  }
}
