import { transpose, writeJsonFile, asyncGet } from "./utils";
import { formatTranslations } from "./formatTranslations";
import { parse } from "csv-parse/sync";
import chalk from "chalk";
import type { Context } from "./types";

export interface InputImportTranslationsConfig
  extends ImportTranslationsConfig {
  documentId: string;
}

export interface ImportTranslationsConfig {
  documentId?: string | undefined;
  languageKey?: string;
  outputDir?: string;
  prefix?: string;
  sheetId?: number | string;
}

export type ResolvedImportTranslationsConfig =
  Required<ImportTranslationsConfig>;

export type ResolvedTranslations = {
  language: string;
  translationsObject: Record<string, string>;
};

/**
 * Imports translations for the app from a dedicated Google Sheet and converts them to JSON files.
 */
export async function importTranslations(context: Context): Promise<void> {
  const { debug, config } = context;

  const csvUrl = `https://docs.google.com/spreadsheets/d/${config.documentId}/gviz/tq?tqx=out:csv&gid=${config.sheetId}`;

  if (!config.documentId || !config.sheetId) {
    throw new Error("A valid documentId and sheetId must be passed.");
  }

  debug(
    `Fetching document ${chalk.yellow(
      config.documentId,
    )} with sheet id ${chalk.cyan(config.sheetId)}`,
  );

  const data = await asyncGet(csvUrl);
  const records = parse(data, { delimiter: ",", quote: '"' });

  const [keys, ...translations] = transpose(records);

  if (!records.length || !keys || !translations.length) {
    throw new Error("No translations were imported.");
  }

  await Promise.all(
    translations.map((translation) => {
      const { language, translationsObject } = formatTranslations(
        translation,
        keys,
        context,
      );

      return writeJsonFile(language, translationsObject, context);
    }),
  );

  debug(chalk.green(`Imported ${chalk.cyan(translations.length)} languages`));
}
