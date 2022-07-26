import type {
  ImportTranslationsConfig,
  ResolvedTranslations,
} from "./importTranslations";

export function formatTranslations(
  translation: string[],
  keys: string[],
  config: Required<ImportTranslationsConfig>
): ResolvedTranslations {
  if (!translation[0]) {
    throw new Error("Invalid data");
  }

  // Remove the first keys from both arrays.
  const [language, ...strings] = translation;
  const [, ...translationKeys] = keys;

  const translationsObject = Object.fromEntries(
    keys.map((_, i) => [translationKeys[i], strings[i]])
  );

  translationsObject[config.languageKey] = language;

  // Delete empty translations so vue-i18n can handle fallback strings.
  Object.keys(translationsObject).forEach((item) => {
    const translation = translationsObject[item];

    if (!translation || !translation.length) {
      delete translationsObject[item];
    }
  });

  return { language, translationsObject };
}
