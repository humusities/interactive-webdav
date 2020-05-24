import path from "path";
import { fileURLToPath } from "url";
import servor from "servor";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (options) =>
  servor({
    root: path.join(__dirname, ".."),
    fallback: "index.html",
    ...options,
  });
