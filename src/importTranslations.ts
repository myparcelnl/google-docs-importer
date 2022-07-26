import { transpose } from "./transpose";
import { createConfig } from "./createConfig";
import { writeJsonFile } from "./writeJsonFile";
import { formatTranslations } from "./formatTranslations";

import { parse } from "csv-parse/sync";
import { asyncGet } from "./asyncGet";

export interface ImportTranslationsConfig {
  documentId: string;
  languageKey?: string;
  outputDir?: string;
  sheetId?: number | string;
}

export type ResolvedTranslations = {
  language: string;
  translationsObject: Record<string, string>;
};

/**
 * Imports translations for the app from a dedicated Google Sheet and converts them to JSON files.
 */
export async function importTranslations(
  userConfig: ImportTranslationsConfig
): Promise<void[]> {
  const config = createConfig(userConfig);
  const csvUrl = `https://docs.google.com/spreadsheets/d/${config.documentId}/gviz/tq?tqx=out:csv&gid=${config.sheetId}`;

  if (!config.documentId || !config.sheetId) {
    throw new Error("A valid documentId and sheetId must be passed.");
  }

  const data = await asyncGet(csvUrl);
  const records = parse(data, { delimiter: ",", quote: '"' });

  const [keys, ...translations] = transpose(records);

  if (!records.length || !keys || !translations.length) {
    throw new Error("No translations were imported.");
  }

  return Promise.all(
    translations.map((translation) => {
      const { language, translationsObject } = formatTranslations(
        translation,
        keys,
        config
      );

      return writeJsonFile(config, language, translationsObject);
    })
  );
}
