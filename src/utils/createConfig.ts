import type {
  InputImportTranslationsConfig,
  ResolvedImportTranslationsConfig,
} from "../importTranslations";

export function createConfig(
  userConfig: InputImportTranslationsConfig,
): ResolvedImportTranslationsConfig {
  return {
    languageKey: "lang",
    sheetId: 0,
    outputDir: "translations",
    ...userConfig,
  };
}
