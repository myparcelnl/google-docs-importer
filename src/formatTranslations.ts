import type { ResolvedTranslations } from "./importTranslations";
import chalk from "chalk";
import type { Context } from "./types";
import { VerbosityLevel } from "./types";

export function formatTranslations(
  translation: string[],
  keys: string[],
  context: Context,
): ResolvedTranslations {
  if (!translation[0]) {
    throw new Error("Invalid data");
  }

  // Remove the first keys from both arrays.
  const [language, ...strings] = translation;
  const [, ...translationKeys] = keys;

  if (context.verbosity >= VerbosityLevel.Info) {
    context.debug(
      chalk.green("Parsing language: %s"),
      chalk.greenBright(language),
    );
  }

  const prefix = context.config.prefix ?? "";

  const translationsObject = Object.fromEntries(
    keys.map((_, i) => {
      const key = prefix + translationKeys[i];

      return [key, strings[i] ?? ""];
    }),
  );

  if (context.config.languageKey) {
    translationsObject[context.config.languageKey] = language;
  }

  const translationsObjectKeys = Object.keys(translationsObject);

  // Delete empty translations.
  translationsObjectKeys.filter(Boolean).forEach((item, index) => {
    const translation = translationsObject[item];

    if (!translation || !translation.length) {
      delete translationsObject[item];
    }

    if (context.verbosity >= VerbosityLevel.Debug) {
      const prefix =
        index === translationsObjectKeys.length - 1 ? " └──" : " ├──";

      context.debug(
        prefix + " %s: %s",
        chalk.yellow(item),
        translationsObject[item],
      );
    }
  });

  if (context.verbosity >= VerbosityLevel.Info) {
    context.debug(
      chalk.green("Parsed language: %s with %s keys"),
      chalk.greenBright(language),
      chalk.cyan(translationsObjectKeys.length),
    );
  }

  return { language, translationsObject };
}
