import { transpose, writeJsonFile, asyncGet } from "./utils";
import { formatRecords } from "./formatRecords";
import { parse } from "csv-parse/sync";
import chalk from "chalk";
import type { Context } from "./types";

/**
 * Imports a Google Sheet and writes it to one JSON file per column.
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

  const [keys, ...columns] = transpose(records);

  if (!records.length || !keys || !columns.length) {
    throw new Error("No rows were imported.");
  }

  await Promise.all(
    columns.map((record) => {
      console.log(record);
      const { key, records } = formatRecords(record, keys, context);

      return writeJsonFile(key, records, context);
    }),
  );

  debug(chalk.green(`Imported ${chalk.cyan(columns.length)} columns`));
}
