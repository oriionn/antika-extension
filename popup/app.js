const nav = browser ? browser : chrome;
const checkboxes = document.getElementById("checkboxes");
const save = document.getElementById("submit");
const serverEl = document.getElementById("server");
const message = document.getElementById("status");
let timeoutMessage;

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

  let server = result.server || "https://antika-watch.oriondev.fr";
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

  nav.storage.sync
    .set({ disabled, server })
    .then(() => {
      clearTimeout(timeoutMessage);
      message.classList.remove("error");
      message.classList.remove("success");

      message.innerHTML = "Options saved!";
      message.classList.add("success");
      timeoutMessage = setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("success");
      }, 2000);
    })
    .catch(() => {
      clearTimeout(timeoutMessage);
      message.classList.remove("error");
      message.classList.remove("success");

      message.innerHTML = "Error occured when saving options";
      message.classList.add("error");
      timeoutMessage = setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("error");
      }, 2000);
    });
});
