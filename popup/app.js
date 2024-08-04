const nav = typeof browser !== "undefined" ? browser : chrome;
const checkboxes = document.getElementById("checkboxes");
const save = document.getElementById("submit");
const serverEl = document.getElementById("server");
const message = document.getElementById("status");
let timeoutMessage;

function showMessage(msg, type) {
  clearTimeout(timeoutMessage);
  message.classList.remove("error");
  message.classList.remove("success");

  message.innerHTML = msg;
  message.classList.add(type);
  timeoutMessage = setTimeout(() => {
    message.innerHTML = "";
    message.classList.remove(type);
  }, 2000);
}

const sources = [
  {
    name: "my.mail.ru",
    id: "mailru",
  },
  {
    name: "sendvid.com",
    id: "sendvid",
  },
  {
    name: "sibnet.ru",
    id: "sibnet",
  },
  {
    name: "streamtape.com",
    id: "streamtape",
  },
  {
    name: "voe.sx",
    id: "voe",
  },
];

nav.storage.sync.get().then((result) => {
  let disabled = result.disabled || [];
  sources.forEach((source) => {
    checkboxes.innerHTML += `<label><input type="checkbox" id="${source.id}" name="${source.id}" ${disabled.includes(source.id) ? "" : "checked"}> ${source.name}</label>`;
  });

  let server = result.server || "https://antika-watch.oriondev.fr/";

  serverEl.value = server;
});

save.addEventListener("click", () => {
  let disabled = [];
  sources.forEach((source) => {
    if (!document.getElementById(source.id).checked) {
      disabled.push(source.id);
    }
  });
  let server = serverEl.value;
  let regex =
    /^https?:\/\/((localhost|(\d{1,3}\.){3}\d{1,3})|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))(:\d{1,5})?(\/.*)?$/;
  if (!regex.test(server)) {
    showMessage("Invalid server URL", "error");
    return;
  }

  if (!server.endsWith("/")) server += "/";

  nav.storage.sync
    .set({ disabled, server })
    .then(() => {
      showMessage("Options saved", "success");
    })
    .catch(() => {
      showMessage("Error occured when saving options", "error");
    });
});
