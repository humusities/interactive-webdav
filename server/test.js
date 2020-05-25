import serve from "./serve.js";

console.log(`Server listening on port
http://localhost:${
  serve({
    inject: "<script>window.webdav = 'lol'</script>",
    preHook: (req) => console.log(`${req.method} ${req.url}`),
  }).address().port
}`);
