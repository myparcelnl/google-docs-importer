import { get } from "https";

export const asyncGet = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      let data = "";
      res.setEncoding("utf-8");

      res.on("data", (stream) => {
        data += stream;
      });

      res.on("error", (error) => {
        reject(error);
      });

      res.on("end", () => {
        resolve(data);
      });
    });
  });
};
