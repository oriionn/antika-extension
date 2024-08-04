initExtension("voe").then(() => {
  let regex = /^https:\/\/voe\.sx\/e\/.+/;
  if (regex.test(window.location.href)) {
    regex = /https:\/\/[a-zA-Z0-9.-]+\/e\/[a-zA-Z0-9]+/;
    let url = document.querySelector("script").innerHTML.match(regex);

    if (url) {
      url = url[0];
      nav.storage.sync.set({ [url]: "voe.sx" });
    }
  } else {
    nav.storage.sync.get().then((result) => {
      if (result[window.location.href] === "voe.sx") {
        regex = /'hls':\s*'([^']*)'/;
        let url = document.body.innerHTML.match(regex);
        if (url) {
          url = b64DecodeUnicode(url[1]);
          nav.storage.sync.remove(window.location.href);
          redirect({
            video: url,
            type: "application/x-mpegURL",
            original_link: window.location.href,
            proxy: {
              enabled: false,
            },
          });
        }
      }
    });
  }
});
