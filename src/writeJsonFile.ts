import path from "path";
import fs from "fs";
import type { ImportTranslationsConfig } from "./importTranslations";

export const writeJsonFile = async (
  config: Required<ImportTranslationsConfig>,
  language: string,
  contents: Record<string, string>
): Promise<void> => {
  const filePath = path.resolve(config.outputDir, `${language}.json`);
  const jsonData = JSON.stringify(contents, null, 2);
  const folder = filePath.replace(path.basename(filePath), "");

  await fs.promises.mkdir(folder, { recursive: true });
  await fs.promises.writeFile(filePath, `${jsonData}\n`, { encoding: "utf-8" });
};
