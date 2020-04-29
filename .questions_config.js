//*******************************************************
//*******************************************************
// CONFIG FILE FOR THE EDITOR
//*******************************************************
//*******************************************************
const fs = require("fs");
const jsFilesDir = "./view/js";
const cssFilesDir = "./view/css";
const htmlFilePath = "./index.html";
let isError = false;
/*
 * BIND ALL THE CANDIDATE'S JS FILES TO WINDOW
 */
const jsFiles = fs.readdirSync(jsFilesDir);
jsFiles.forEach(file => {
  if (file.endsWith(".js")) {
    const fileContent = fs.readFileSync(`${jsFilesDir}/${file}`).toString();
    try {
      window.eval(fileContent);
    } catch (e) {
      //DISPLAY ERROR ON THE SCREEN
      isError = true;
      document.body.innerHTML = `<p style = "font-size:30px; color:red;">
        ${e.toString().split(":")[0]}</p>
        <p><span style = "font-size: 18px;">${jsFilesDir}/${file}</span>: ${
        e.message
      }</p>`;
    }
  }
});
function updateImages() {
  // UPDATE IMAGES IN DOM
  const images = document.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    if (img.src.indexOf("data:image") != -1) {
      break;
    }
    try {
      img.setAttribute("data-src", img.src.split(window.location.href)[1]);
      img.src = fs
        .readFileSync(img.src.split(window.location.href)[1])
        .toString();
    } catch (e) {
      //DISPLAY ERROR ON THE SCREEN
      isError = true;
      document.body.innerHTML = `<p style = "font-size:30px; color:red;">
        ${e.toString().split(":")[0]}</p>
        <p><span style = "font-size: 18px;">${e.message}</p>`;
    }
  }
}
if (window.updateImageListener === undefined) {
  window.updateImageListener = true;
  document.querySelector("body").addEventListener("DOMAttrModified", e => {
    if (e.attrName == "src") {
      updateImages();
    }
  });
}
window.getDOM = function() {
  return document;
};
if (!isError) {
  let htmlFileContent = fs.readFileSync(htmlFilePath).toString();
  document.body.innerHTML = htmlFileContent;
  // UPDATE IMAGES ON REFRESH
  updateImages();
  /*
   * INSERT ALL THE CANDIDATE'S CSS TO DOCUMENT
   */
  const cssFiles = fs.readdirSync(cssFilesDir);
  cssFiles.forEach(file => {
    if (file.endsWith(".css")) {
      const fileContent = fs.readFileSync(`${cssFilesDir}/${file}`).toString();
      let style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(fileContent));
      document.body.appendChild(style);
    }
  });
}