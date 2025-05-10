import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { colors } from "../../../src/utilities/colors";
import { Command } from "../../bin/ICommand";

export default class ConvertColorsToScssCommand implements Command {
  name: string = "ConvertColorsToScss";

  private content: string;

  async execute() {
    this.createContentScss();
    this.createFile();
    console.log("SCSS variables generated in colors.scss");
  }

  private createFile() {
    const pathDir = path.resolve(__dirname, "../../_out/");
    mkdirSync(pathDir, { recursive: true });
    writeFileSync(pathDir + "/colors.scss", this.content);
  }

  private createContentScss() {
    let scss = "";
    let isValueString = false;
    for (const [colorName, colorsOrShades] of Object.entries(colors)) {
      if (typeof colorsOrShades === "string") {
        scss += `$${colorName}: ${colorsOrShades};\n`;
        isValueString = true;
        continue;
      } else {
        if (isValueString) {
          scss += "\n";
          isValueString = false;
        }
        for (const [shade, hex] of Object.entries(colorsOrShades)) {
          scss += `$${colorName}-${shade}: ${hex};\n`;
        }
      }
      scss += "\n";
    }
    this.content = scss;
  }
}
