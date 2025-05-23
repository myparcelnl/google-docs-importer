import { transpose, writeJsonFile, asyncGet } from "./utils";
import { formatRecords } from "./formatRecords";
import { parse } from "csv-parse/sync";
import chalk from "chalk";
import type { Context } from "./types";

/**
 * Imports a Google Sheet and writes it to one JSON file per column.
 * Supports optional 'namespace' column as first column for grouping keys.
 */
export async function importSheet(context: Context): Promise<void> {
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

  const columns = transpose(records),
    [firstColumn, secondColumn] = columns;

  if (!records.length || !firstColumn || !secondColumn || !columns.length) {
    throw new Error("No rows were imported.");
  }

  // Handle 'namespace' column
  const hasNamespaces = "namespace" === firstColumn[0]?.toLowerCase(),
    namespaces = hasNamespaces ? firstColumn : null,
    keys = hasNamespaces ? secondColumn : firstColumn;
  let [, ...languageColumns] = columns;
  if (hasNamespaces) {
    [, , ...languageColumns] = columns;
  }

  //debug(namespaces, keys, columns);

  await Promise.all(
    languageColumns.map((record) => {
      const { key: filename, records } = formatRecords(
        record,
        keys,
        namespaces,
        context,
      );

      return writeJsonFile(
        (config.filenamePrefix ?? "") + filename,
        records,
        context,
      );
    }),
  );

  debug(chalk.green(`Imported ${chalk.cyan(columns.length)} columns`));
}
