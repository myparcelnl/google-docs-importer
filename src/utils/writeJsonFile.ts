import path from "path";
import fs from "fs";
import type { Context } from "../types";
import { VerbosityLevel } from "../types";
import chalk from "chalk";

export const writeJsonFile = async (
  language: string,
  contents: Record<string, string>,
  { config, debug, verbosity }: Context,
): Promise<void> => {
  const filePath = path.resolve(config.outputDir, `${language}.json`);
  const jsonData = JSON.stringify(contents, null, 2);
  const folder = filePath.replace(path.basename(filePath), "");

  await fs.promises.mkdir(folder, { recursive: true });
  await fs.promises.writeFile(filePath, `${jsonData}\n`, { encoding: "utf-8" });

  if (verbosity >= VerbosityLevel.Info) {
    debug(
      chalk.green(
        `Wrote file for language ${chalk.cyan(language)} to ${chalk.yellow(
          path.relative(process.cwd(), filePath),
        )}`,
      ),
    );
  }
};
