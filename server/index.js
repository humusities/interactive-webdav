import path from "path";
import { fileURLToPath } from "url";
import serve from "./serve.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (options) =>
  serve({
    root: path.join(__dirname, ".."),
    ...options,
  });
