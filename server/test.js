import serve from "./serve.js";

console.log(`Server listening on port
http://localhost:${
  serve({ inject: "<script>window.webdav = 'lol'</script>" }).address().port
}`);
