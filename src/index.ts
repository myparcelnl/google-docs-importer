#!/usr/bin/env node

import yargs from "yargs";
import { importTranslations } from "./importTranslations";
import dotenv from "dotenv";

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
      default: "lang",
      describe: "Language key to use in translation file.",
      type: "string",
    })
    .option("envFile", {
      alias: "e",
      default: ".env",
      describe: "Env file to use to get document and sheet ID from.",
      type: "string",
    })
    .parse(process.argv.slice(2));

  dotenv.config({ path: res.envFile });

  importTranslations({
    documentId: (res.documentId || process.env["GOOGLE_DOCUMENT_ID"]) ?? "",
    outputDir: res.output,
    sheetId: (res.sheetId || process.env["GOOGLE_SHEET_ID"]) ?? "",
  });
})();
