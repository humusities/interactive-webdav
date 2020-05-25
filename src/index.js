import path from "./utils/path.js";
import browse from "./utils/browse.js";
import { Folders, Files, Parent, Preview, PreviewHTML } from "./components.js";

const webdavURL = window.webdav;

const getCurrentFolder = () =>
  location.pathname.replace("/index.html", "/");

const render = ({ current, prev, folders, files }) => {
  document.getElementById("parent").innerHTML = Parent(prev);
  document.getElementById("files").innerHTML = Files(webdavURL, files);
  document.getElementById("folders").innerHTML = Folders(folders);

  const haveHtml = files.find(file => file.displayname === "index.html");
  document.getElementById("preview").innerHTML = haveHtml
    ? PreviewHTML(path.join(webdavURL, current, "index.html"))
    : Preview(webdavURL, files);
};

const pushState = state => {
  if (pushState) {
    history.pushState({}, "", path.join(location.origin, state.current));
  }
  window.onpopstate = () => {
    browse(webdavURL, getCurrentFolder()).then(render);
  };
  return state;
};

const browseRender = (...args) =>
  browse(webdavURL, ...args)
    .then(pushState)
    .then(render);

browseRender(getCurrentFolder());
window.browseRender = browseRender;