waitForElement("video#mainvideo").then(() => {
  let url = document.querySelector("video#mainvideo").src;
  redirect({
    video: url,
    type: "video/mp4",
    original_link: window.location.href,
    local_redirect: true,
    proxy: {
      enabled: false,
    },
  });
});
