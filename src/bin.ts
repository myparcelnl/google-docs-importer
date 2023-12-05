#!/usr/bin/env node

import yargs from "yargs";
import type { ImportTranslationsConfig } from "./importTranslations";
import { importTranslations } from "./importTranslations";
import dotenv from "dotenv";
import { createDebugger, createConfig } from "./utils";
import type { Context } from "./types";

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
    .option("languageKey", {
      alias: "l",
      default: null,
      describe: "Language key to use in translation file.",
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
    .count("verbose")
    .alias("v", "verbose")
    .parse(process.argv.slice(2));

  dotenv.config({ path: res.envFile });

  const userConfig = {
    documentId: (res.documentId || process.env["GOOGLE_DOCUMENT_ID"]) ?? "",
    outputDir: res.output,
    sheetId: (res.sheetId || process.env["GOOGLE_SHEET_ID"]) ?? "",
  } satisfies ImportTranslationsConfig;

  const context = {
    config: createConfig(userConfig),
    debug: createDebugger({ enabled: res.verbose >= 0 || !Number(res.quiet) }),
    verbosity: res.verbose,
  } satisfies Context;

  await importTranslations(context);
})();
