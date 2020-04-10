const iframe = document.createElement("iframe");
iframe.src = "https://inline-chat-1c4e4.web.app/"
iframe.width = "320";
iframe.height = "520";
iframe.style.position = "fixed";
iframe.style.right = "20px";
iframe.style.bottom = "100px";
iframe.style.visibility = "hidden";
iframe.style.opacity = "0";
iframe.style.transition = "all 0.5s ease-out";
iframe.style.border = "none";

iframe.style.boxShadow = `
  0px 3px 5px -1px rgba(0,0,0,0.2),
  0px 6px 10px 0px rgba(0,0,0,0.14),
  0px 1px 18px 0px rgba(0,0,0,0.12)
`;

const button = document.createElement("button");
button.innerHTML = "?";
button.style.position = "fixed";
button.style.bottom = "20px"
button.style.right = "20px";
button.style.borderRadius = "72px";
button.style.border = "none";
button.style.backgroundColor = "#3f51b5";
button.style.color = "#eee";
button.style.boxShadow = `
  0px 3px 5px -1px rgba(0,0,0,0.2),
  0px 6px 10px 0px rgba(0,0,0,0.14),
  0px 1px 18px 0px rgba(0,0,0,0.12)
`;
button.style.outline = "none";
button.style.height = "62px";
button.style.width = "62px";
button.style.fontSize = "24px";
button.style.display = "flex";
button.style.alignItems = "center";
button.style.justifyContent = "center";

function display() {
  iframe.style.visibility = "visible";
  iframe.style.opacity = "1";
  button.innerText = "×";
}
function hide() {
  iframe.style.visibility = "hidden";
  iframe.style.opacity = "0";
  button.innerText = "?";
}
button.addEventListener("click", () =>
  iframe.style.visibility === "visible" ? hide() : display());

document.body.append(iframe);
document.body.append(button);
