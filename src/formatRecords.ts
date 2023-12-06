import chalk from "chalk";
import type { Context, ResolvedRecords } from "./types";
import { VerbosityLevel } from "./types";

export function formatRecords(
  record: string[],
  keys: string[],
  context: Context,
): ResolvedRecords {
  if (!record[0]) {
    throw new Error("Invalid data");
  }

  // Remove the first keys from both arrays.
  const [columnKey, ...strings] = record;
  const [, ...rowKeys] = keys;

  if (context.verbosity >= VerbosityLevel.Info) {
    context.debug(
      chalk.green("Parsing column: %s"),
      chalk.greenBright(columnKey),
    );
  }

  const prefix = context.config.prefix ?? "";

  const recordObject = Object.fromEntries(
    keys.map((_, i) => {
      const key = prefix + rowKeys[i];

      return [key, strings[i] ?? ""];
    }),
  );

  if (context.config.columnKey) {
    recordObject[context.config.columnKey] = columnKey;
  }

  const recordObjectKeys = Object.keys(recordObject);

  // Delete empty translations.
  recordObjectKeys.filter(Boolean).forEach((item, index) => {
    const translation = recordObject[item];

    if (!translation || !translation.length) {
      delete recordObject[item];
    }

    if (context.verbosity >= VerbosityLevel.Debug) {
      const prefix = index === recordObjectKeys.length - 1 ? " └──" : " ├──";

      context.debug(prefix + " %s: %s", chalk.yellow(item), recordObject[item]);
    }
  });

  if (context.verbosity >= VerbosityLevel.Info) {
    context.debug(
      chalk.green("Parsed column: %s with %s keys"),
      chalk.greenBright(columnKey),
      chalk.cyan(recordObjectKeys.length),
    );
  }

  return { key: columnKey, records: recordObject };
}
