initExtension("sendvid").then(() => {
  let regex = /var video_source = "(http[s]?:\/\/[^"]+)"/;
  let url = document.body.innerHTML.match(regex);

  if (url) {
    url = url[1];
    redirect({
      video: url,
      type: "video/mp4",
      original_link: window.location.href,
      proxy: {
        enabled: false,
      },
    });
  }
});
