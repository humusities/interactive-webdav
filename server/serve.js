import http from "http";
import url from "url";
import fs from "fs";
import path from "path";

export default ({
  root: rawt = ".",
  port = 0,
  inject = "",
  statics = true,
} = {}) =>
  http
    .createServer((req, res) => {
      console.log(`${req.method} ${req.url}`);

      const root = rawt.startsWith("/") ? rawt : path.join(process.cwd(), rawt);
      const pathname = url.parse(req.url).pathname.substr(1);
      const uri = path.join(root, pathname.replace(/^(\.)+/, "."));
      const map = {
        ".ico": "image/x-icon",
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript",
        ".json": "application/json",
        ".css": "text/css",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".wav": "audio/wav",
        ".mp3": "audio/mpeg",
        ".svg": "image/svg+xml",
        ".pdf": "application/pdf",
        ".doc": "application/msword",
      };

      fs.exists(uri, (exist) => {
        if (!exist) {
          res.statusCode = 404;
          res.end(`File ${uri} not found!`);
          return;
        }

        const fallback = "index.html";
        const file = fs.statSync(uri).isDirectory()
          ? statics
            ? path.join(uri, fallback)
            : path.join(root, fallback)
          : uri;
        fs.readFile(file, "binary", (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
          } else {
            const ext = path.parse(file).ext;
            res.setHeader("access-control-allow-origin", "*");
            res.setHeader("Content-type", map[ext] || "text/plain");
            res.end(inject ? data + inject : data);
          }
        });
      });
    })
    .listen(parseInt(port));
