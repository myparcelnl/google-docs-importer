import chalk from "chalk";
import type { Context, ResolvedRecords } from "./types";
import { VerbosityLevel } from "./types";

export function formatRecords(
  record: string[],
  keys: string[],
  namespaces: string[] | null,
  context: Context,
): ResolvedRecords {
  if (!record[0]) {
    throw new Error("Invalid data");
  }

  // Remove the first keys from the arrays.
  const [columnKey, ...strings] = record;
  const [, ...rowKeys] = keys;
  const [, ...rowNamespaces] = namespaces || [null, null];

  if (context.verbosity >= VerbosityLevel.Info) {
    context.debug(
      chalk.green("Parsing column: %s"),
      chalk.greenBright(columnKey),
    );
  }

  const prefix = context.config.prefix ?? "";

  const records: Record<string, string | Record<string, string>> = {};
  rowKeys.forEach((key, i) => {
    if (!strings[i] || "key" === key) {
      return;
    }
    if (namespaces) {
      // group keys by namespace
      const ns = rowNamespaces[i] || "default";
      if (!records[ns] || typeof records[ns] !== "object") {
        records[ns] = {};
      }
      (records[ns] as Record<string, string>)[prefix + key] = strings[i] || "";
      return;
    }
    records[prefix + key] = strings[i] || "";
  });

  if (context.config.columnKey) {
    records[context.config.columnKey] = columnKey;
  }
  return { key: columnKey, records };
}
