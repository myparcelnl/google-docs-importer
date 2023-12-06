#!/usr/bin/env node

import yargs from "yargs";
import { importSheet } from "./importSheet";
import dotenv from "dotenv";
import { createDebugger, createConfig } from "./utils";
import type { Context, ImportSheetConfig } from "./types";

(async () => {
  const res = await yargs(process.argv.slice(2))
    .option("output", {
      alias: "o",
      default: "translations",
      describe: "Output directory.",
      type: "string",
    })
    .option("documentId", {
      alias: "d",
      describe: "Google Docs document ID.",
      type: "string",
    })
    .option("sheetId", {
      alias: "s",
      default: "0",
      describe: "Google Docs sheet ID.",
      type: "string",
    })
    .option("columnKey", {
      alias: "c",
      default: "lang",
      describe: "Key to use to identify the source column.",
      type: "string",
    })
    .option("prefix", {
      alias: "p",
      default: "",
      describe: "Prefix to use for keys.",
      type: "string",
    })
    .option("envFile", {
      alias: "e",
      default: ".env",
      describe: "Env file to use to get document and sheet ID from.",
      type: "string",
    })
    .option("quiet", {
      alias: "q",
      describe: "Quiet output",
      type: "boolean",
      normalize: true,
    })
    .option("languageKey", {
      alias: "l",
      default: null,
      describe: "Deprecated, use columnKey instead.",
      type: "string",
    })
    .count("verbose")
    .alias("v", "verbose")
    .parse(process.argv.slice(2));

  dotenv.config({ path: res.envFile });

  const userConfig = {
    documentId: (res.documentId || process.env["GOOGLE_DOCUMENT_ID"]) ?? "",
    outputDir: res.output,
    sheetId: (res.sheetId || process.env["GOOGLE_SHEET_ID"]) ?? "",
    prefix: (res.prefix || process.env["KEY_PREFIX"]) ?? "",
    columnKey: res.columnKey ?? res.languageKey,
  } satisfies ImportSheetConfig;

  const context = {
    config: createConfig(userConfig),
    debug: createDebugger({ enabled: res.verbose >= 0 || !Number(res.quiet) }),
    verbosity: res.verbose,
  } satisfies Context;

  await importSheet(context);
})();
